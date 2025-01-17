import { gql } from 'src/__generated__';

export const ADMIN_RESET_TOKEN_VERIFY = gql(/* GraphQL */ `
  mutation AdminResetTokenVerify($data: TokenInput!) {
    adminResetTokenVerify(data: $data) {
      email
      token
    }
  }
`);
