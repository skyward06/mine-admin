import { gql } from 'src/__generated__/gql';

export const UPDATE_ADMIN_PASSWORD = gql(/* GraphQL */ `
  mutation updatePasswordAdmin($data: UpdateAdminPasswordInput!) {
    updatePasswordAdmin(data: $data) {
      message
      result
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);
