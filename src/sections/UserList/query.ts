import { gql } from 'src/__generated__';

export const UPDATE_PASSWORD_BY_ADMIN = gql(/* GraphQL */ `
  mutation updatePasswordAdminById($data: UpdateAdminPasswordByIdInput!) {
    updatePasswordAdminById(data: $data) {
      id
      frontAction {
        ...FrontActionFields
      }
    }
  }
`);
