import { useMutation } from '@apollo/client';

import { UPDATE_ADMIN_PASSWORD } from './query';

export function useUpdateAdminPassword() {
  const [updatePassword] = useMutation(UPDATE_ADMIN_PASSWORD, {});

  return { updatePassword };
}
