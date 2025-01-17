import { gql } from 'src/__generated__';

export const ADMIN_RESET_PASSWORD_REQUEST = gql(/* GraphQL */ `
  mutation AdminResetPasswordByToken($data: ResetPasswordTokenInput!) {
    adminResetPasswordByToken(data: $data) {
      message
      result
    }
  }
`);

export const ADMIN_RESET_PASSWORD_TOKEN = gql(/* GraphQL */ `
  mutation AdminResetPasswordRequest($data: EmailInput!) {
    adminResetPasswordRequest(data: $data) {
      message
      result
    }
  }
`);
