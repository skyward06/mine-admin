import { useMutation } from '@apollo/client';

import { UPDATE_PASSWORD_BY_ADMIN } from './query';

export function useUpdatePasswordByAdmin() {
  const [updatePasswordByAdmin, { loading, data, error }] = useMutation(UPDATE_PASSWORD_BY_ADMIN);

  return { loading, data, error, updatePasswordByAdmin };
}
