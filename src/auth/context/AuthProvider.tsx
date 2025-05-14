import type { Admin } from 'src/__generated__/graphql';

import { useLazyQuery } from '@apollo/client';
import { useRef, useMemo, useState, useEffect, useCallback } from 'react';

import { gql } from 'src/__generated__/gql';

import { toast } from 'src/components/SnackBar';

import { AuthContext } from './AuthContext';
import { setSession, getSession, getTimeToLive } from './utils';

import type { AuthContextValue } from '../types';
// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

// ----------------------------------------------------------------------
const FETCH_ME_QUERY = gql(/* GraphQL */ `
  query FetchMe {
    adminMe {
      id
      email
      avatar
      roleId
      status
      role {
        id
        name
        sale
        role
        admin
        commission
        description
      }
      username
      fullName
      OTPEnabled
    }
  }
`);

// ----------------------------------------------------------------------
const initialToken = getSession();

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<Admin | null>();
  const [error, setError] = useState<Error | null>(null);

  const [token, setToken] = useState<string | undefined | null>(initialToken);
  const timeToLive = useMemo(() => getTimeToLive(token), [token]);
  const timerId = useRef<NodeJS.Timeout | undefined>();

  const [fetchMe, { loading }] = useLazyQuery(FETCH_ME_QUERY, {
    onCompleted: (data) => {
      setUser(data.adminMe);
      setError(null);
    },
    onError: (err) => {
      setError(err);
      setUser(null);
    },
  });

  const expireToken = useCallback(() => {
    setToken(null);
    setSession(null);
    setError(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = useCallback((newToken: string) => {
    setSession(newToken);
    setToken(newToken);
    toast.success('Successfully logged in');
  }, []);

  const signOut = useCallback(() => {
    setSession(null);
    setToken(null);
    toast.success('Successfully logged out');
  }, []);

  useEffect(() => {
    if (token) {
      if (timeToLive <= 0) {
        expireToken();
      }
      fetchMe();
    }
  }, [token, timeToLive, expireToken, fetchMe]);

  useEffect(() => {
    if (error) {
      expireToken();
      return;
    }

    if (!timerId.current) {
      timerId.current = setTimeout(() => {
        expireToken();
      }, timeToLive);
    }

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(timerId.current);
    };
  }, [timeToLive, error, expireToken]);

  const memoizedValue: AuthContextValue = useMemo(
    () => ({ user, token, isAuthenticated: !!token, loading, signIn, signOut }),
    [user, token, loading, signIn, signOut]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
