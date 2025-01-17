import { gql } from 'src/__generated__';

export const UPDATE_PASSWORD_BY_ADMIN = gql(/* GraphQL */ `
  mutation UpdatePasswordAdminById($data: UpdateAdminPasswordByIdInput!) {
    updatePasswordAdminById(data: $data) {
      id
    }
  }
`);
