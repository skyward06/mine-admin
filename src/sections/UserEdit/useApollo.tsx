import { useMutation, useLazyQuery } from '@apollo/client';

import { DISABLE_2FA, GENERATE_2FA, VERIFY_2FA_TOKEN, VERIFY_2FA_ENABLE } from './query';

export function useGenerate2FA() {
  const [generate2FA, { loading, data, error }] = useLazyQuery(GENERATE_2FA);

  return { loading, qrString: data?.generate2FA, error, generate2FA };
}

export function useVerify2FAAndEnable() {
  const [verify2FAAndEnable, { loading, data, error }] = useMutation(VERIFY_2FA_ENABLE, {
    awaitRefetchQueries: true,
    refetchQueries: ['FetchMe'],
  });

  return { loading, accessToken: data?.verify2FAAndEnable.accessToken, error, verify2FAAndEnable };
}

export function useVerify2FAAndToken() {
  const [verify2FAAndToken, { loading, data, error }] = useMutation(VERIFY_2FA_TOKEN);

  return { loading, data, error, verify2FAAndToken };
}

export function useDisable2FA() {
  const [disable2FA, { loading, data, error }] = useMutation(DISABLE_2FA, {
    awaitRefetchQueries: true,
    refetchQueries: ['FetchMe'],
  });

  return { loading, data, error, disable2FA };
}
