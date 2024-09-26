import { gql } from 'src/__generated__/gql';

export const FETCH_SALES_QUERY = gql(/* GraphQL */ `
  query FetchSales($sort: String, $page: String, $filter: JSONObject) {
    sales(sort: $sort, page: $page, filter: $filter) {
      sales {
        id
        invoiceNo
        memberId
        packageId
        member {
          id
          username
          fullName
          email
          point
          mobile
          assetId
          primaryAddress
          secondaryAddress
          status
          emailVerified
        }
        package {
          id
          productName
          amount
          date
          token
          status
          point
          isFreeShare
          isFreeShare
          freePeriodFrom
          freePeriodTo
        }
        statisticsSales {
          id
          saleId
          statisticsId
          issuedAt
        }
        paymentMethod
        orderedAt
        status
      }
      total
    }
  }
`);

export const FETCH_SALES_STATS_QUERY = gql(/* GraphQL */ `
  query FetchSaleStats($allFilter: JSONObject, $inactiveFilter: JSONObject) {
    all: sales(filter: $allFilter) {
      total
    }
    inactive: sales(filter: $inactiveFilter) {
      total
    }
  }
`);

export const CREATE_SALE = gql(/* GraphQL */ `
  mutation CreateSale($data: CreateSaleInput!) {
    createSale(data: $data) {
      invoiceNo
      orderedAt
      memberId
      paymentMethod
      packageId
      status
    }
  }
`);

export const UPDATE_SALE = gql(/* GraphQL */ `
  mutation UpdateSale($data: UpdateSaleInput!) {
    updateSale(data: $data) {
      id
      status
    }
  }
`);

export const REMOVE_SALE = gql(/* GraphQL */ `
  mutation RemoveSale($data: IDInput!) {
    removeSale(data: $data) {
      result
    }
  }
`);
