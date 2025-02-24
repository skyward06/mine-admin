import { gql } from 'src/__generated__/gql';

export const GENERATE_2FA = gql(/* GraphQL */ `
  query generateQuery {
    generate2FA
  }
`);

export const VERIFY_2FA_ENABLE = gql(/* GraphQL */ `
  mutation Verify2FAAndEnable($data: Verify2FAInput!) {
    verify2FAAndEnable(data: $data) {
      accessToken
    }
  }
`);

export const VERIFY_2FA_TOKEN = gql(/* GraphQL */ `
  mutation Verify2FAToken($data: TokenInput!) {
    verify2FAToken(data: $data) {
      accessToken
      status
    }
  }
`);

export const DISABLE_2FA = gql(/* GraphQL */ `
  mutation Disable2FA {
    disable2FA {
      accessToken
    }
  }
`);
