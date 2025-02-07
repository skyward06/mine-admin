import { gql } from 'src/__generated__';

export const ADMIN_RESET_PASSWORD_REQUEST = gql(/* GraphQL */ `
  mutation adminResetPasswordRequest($data: EmailInput!) {
    adminResetPasswordRequest(data: $data) {
      message
      result
      frontAction {
        ...FrontActionFields
      }
    }
  }
`);

export const ADMIN_RESET_PASSWORD_TOKEN = gql(/* GraphQL */ `
  mutation adminResetPasswordByToken($data: ResetPasswordTokenInput!) {
    adminResetPasswordByToken(data: $data) {
      message
      result
      frontAction {
        ...FrontActionFields
      }
    }
  }
`);
