import { gql } from 'src/__generated__/gql';

export const FETCH_COLLECT_ADDRESS = gql(/* GraphQL */ `
  query CollectAddresses($sort: String, $page: String, $filter: JSONObject) {
    collectAddresses(sort: $sort, page: $page, filter: $filter) {
      collectAddresses {
        id
        chain
        address
        weekStartDate
      }
      total
    }
  }
`);

export const SET_COLLECT_ADDRESS = gql(/* GraphQL */ `
  mutation SetCollectAddress($data: CollectAddressInput!) {
    setCollectAddress(data: $data) {
      result
      message
    }
  }
`);
