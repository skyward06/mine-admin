import { gql } from 'src/__generated__/gql';

export const FETCH_ORDERS_QUERY = gql(/* GraphQL */ `
  query Orders($sort: String, $page: String, $filter: JSONObject) {
    orders(sort: $sort, page: $page, filter: $filter) {
      orders {
        id
        ID
        paidAt
        status
        fullName
        memberId
        createdAt
        expiredAt
        usdBalance
        completedAt
        requestType
        paidBalance
        paymentToken
        paymentChain
        paymentAddress
        requiredBalance
      }
      total
    }
  }
`);

export const FETCH_ORDER_QUERY = gql(/* GraphQL */ `
  query OrderById($data: IDInput!) {
    orderById(data: $data) {
      id
      ID
      paidAt
      status
      createdAt
      expiredAt
      usdBalance
      completedAt
      paidBalance
      paymentToken
      paymentChain
      paymentAddress
      transactions {
        to
        from
        hash
        balance
        tokenType
      }
      member {
        id
        assetId
        username
        fullName
      }
    }
  }
`);

export const FETCH_ADDRESSES_QUERY = gql(/* GraphQL */ `
  query Addresses($sort: String, $page: String, $filter: JSONObject) {
    addresses(sort: $sort, page: $page, filter: $filter) {
      addresses {
        address
        chain
        balance
        isUsed
      }
      total
    }
  }
`);

export const FETCH_ADDRESS_BY_ADDRESS = gql(/* GraphQL */ `
  query AddressByAddress($data: AddressInput!) {
    addressByAddress(data: $data) {
      chain
      isUsed
      address
      balance
      balances {
        chain
        token
        address
        balance
      }
    }
  }
`);

export const FETCH_TRANSACTION_QUERY = gql(/* GraphQL */ `
  query Transactions($sort: String, $page: String, $filter: JSONObject) {
    transactions(sort: $sort, page: $page, filter: $filter) {
      transactions {
        to
        hash
        from
        chain
        balance
        tokenType
        createdAt
      }
      total
    }
  }
`);

export const FETCH_TRANSACTION_BY_HASH = gql(/* GraphQL */ `
  query TransactionByHash($data: TransactionInput!) {
    transactionByHash(data: $data) {
      to
      from
      hash
      chain
      balance
      createdAt
      tokenType
      order {
        id
        ID
        paidAt
        status
        createdAt
        expiredAt
        usdBalance
        completedAt
        paidBalance
        paymentToken
        paymentChain
        paymentAddress
        transactions {
          to
          from
          hash
          balance
          tokenType
        }
        member {
          id
          assetId
          username
          fullName
        }
      }
    }
  }
`);

export const CANCEL_ORDER = gql(/* GraphQL */ `
  mutation CancelOrder($data: IDInput!) {
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
