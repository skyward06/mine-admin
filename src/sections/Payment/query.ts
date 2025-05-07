import { gql } from 'src/__generated__/gql';

export const FETCH_ORDERS_QUERY = gql(/* GraphQL */ `
  query Orders($sort: String, $page: String, $filter: JSONObject) {
    orders(sort: $sort, page: $page, filter: $filter) {
      orders {
        id
        status
        createdAt
        signUpOrder
        member {
          id
          username
          fullName
        }
        package {
          productName
        }
        waitAddress {
          type
          address
          totalBalance
          receivedBalance
        }
      }
      total
    }
  }
`);

export const FETCH_ORDER_QUERY = gql(/* GraphQL */ `
  query OrderById($data: IDNInput!) {
    orderById(data: $data) {
      id
      status
      createdAt
      member {
        ID
        assetId
        username
        fullName
      }
      package {
        token
        point
        amount
        productName
      }
      waitAddress {
        type
        address
        receivedAt
        initBalance
        totalBalance
        initUnitPrice
        receivedBalance
      }
    }
  }
`);

export const FETCH_ADDRESSES_QUERY = gql(/* GraphQL */ `
  query Addresses($sort: String, $page: String, $filter: JSONObject) {
    addresses(sort: $sort, page: $page, filter: $filter) {
      addresses {
        type
        address
        balance
      }
      total
    }
  }
`);

export const FETCH_TRANSACTION_QUERY = gql(/* GraphQL */ `
  query Transactions($sort: String, $page: String, $filter: JSONObject) {
    transactions(sort: $sort, page: $page, filter: $filter) {
      transactions {
        to
        from
        hash
        type
        balance
        createdAt
        waitAddress {
          status
          address
          receivedAt
          initBalance
          totalBalance
          initUnitPrice
          receivedBalance
        }
      }
      total
    }
  }
`);

export const CANCEL_ORDER = gql(/* GraphQL */ `
  mutation CancelOrder($data: IDNInput!) {
    cancelOrder(data: $data) {
      frontActions {
        ...FrontActionFields
      }
      message
      result
    }
  }
`);

export const REFERSH_BALANCE = gql(/* GraphQL */ `
  mutation RefreshBalance($data: AddressInput!) {
    refreshBalance(data: $data) {
      frontActions {
        ...FrontActionFields
      }
      message
      result
    }
  }
`);
