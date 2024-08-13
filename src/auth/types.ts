import type { Admin } from 'src/__generated__/graphql';

export type AuthContextValue = {
  user?: Admin | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (token: string) => void;
  signOut: () => void;
};
