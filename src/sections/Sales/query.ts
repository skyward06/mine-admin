import { gql } from 'src/__generated__/gql';

export const FETCH_SALES_QUERY = gql(/* GraphQL */ `
  query FetchSales($sort: String, $page: String, $filter: JSONObject) {
    sales(sort: $sort, page: $page, filter: $filter) {
      sales {
        id
        ID
        memberId
        packageId
        createdAt
        updatedAt
        proof {
          createdAt
          updatedAt
          deletedAt
          id
          refId
          type
          amount
          note
          files {
            createdAt
            updatedAt
            deletedAt
            id
            url
            originalName
            mimeType
            size
          }
          reflinks {
            linkType
            link
          }
        }
        member {
          id
          ID
          email
          point
          mobile
          status
          assetId
          begL
          begR
          newL
          newR
          username
          fullName
          syncWithSendy
          emailVerified
          primaryAddress
          secondaryAddress
          totalIntroducers
          preferredContact
          preferredContactDetail
          createdAt
        }
        package {
          id
          date
          token
          point
          amount
          status
          productName
          enrollVisibility
        }
        statisticsSales {
          id
          saleId
          issuedAt
          statisticsId
        }
        status
        orderedAt
        paymentMethod
        proof {
          createdAt
          updatedAt
          deletedAt
          id
          refId
          type
          amount
          note
          files {
            createdAt
            updatedAt
            deletedAt
            id
            url
            originalName
            mimeType
            size
          }
          reflinks {
            linkType
            link
          }
        }
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
      status
      memberId
      orderedAt
      packageId
      paymentMethod
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
