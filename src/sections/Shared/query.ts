import { gql } from 'src/__generated__/gql';

export const FETCH_SHARE_ACCOUNTS = gql(/* GraphQL */ `
  query ShareAccounts($sort: String, $page: String, $filter: JSONObject) {
    shareAccounts(sort: $sort, page: $page, filter: $filter) {
      shareAccounts {
        id
        note
        createdAt
        cashPotential
        isTexitRanger
        members {
          id
          username
          fullName
        }
      }
      total
    }
  }
`);

export const FETCH_SHARE_ACCOUNT_BY_ID = gql(/* GraphQL */ `
  query ShareAccountById($data: IDInput!) {
    shareAccountById(data: $data) {
      id
      note
      createdAt
      cashPotential
      isTexitRanger
      members {
        id
        username
        fullName
      }
    }
  }
`);

export const CREATE_SHARE_ACCOUNT = gql(/* GraphQL */ `
  mutation CreateShareAccount($data: CreateShareAccountInput!) {
    createShareAccount(data: $data) {
      id
    }
  }
`);

export const UPDATE_SHARE_ACCOUNT = gql(/* GraphQL */ `
  mutation UpdateShareAccount($data: UpdateShareAccountInput!) {
    updateShareAccount(data: $data) {
      id
    }
  }
`);
