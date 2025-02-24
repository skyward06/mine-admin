import { gql } from 'src/__generated__/gql';

export const FETCH_SALES_QUERY = gql(/* GraphQL */ `
  query FetchSales($sort: String, $page: String, $filter: JSONObject) {
    sales(sort: $sort, page: $page, filter: $filter) {
      sales {
        id
        ID
        memberId
        packageId
        isMetal
        sponsorCnt
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
          orderedAt
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
          balance
          username
          fullName
          groupName
          createdAt
          allowState
          teamReport
          OTPEnabled
          teamStrategy
          syncWithSendy
          emailVerified
          primaryAddress
          secondaryAddress
          totalIntroducers
          preferredContact
          placementPosition
          commissionDefault
          cmnCalculatedWeeks
          preferredContactDetail
          commission {
            begL
            begR
            newL
            newR
          }
        }
        toMember {
          id
          ID
          email
          point
          mobile
          status
          assetId
          balance
          username
          fullName
          groupName
          createdAt
          allowState
          teamReport
          OTPEnabled
          teamStrategy
          syncWithSendy
          emailVerified
          primaryAddress
          secondaryAddress
          totalIntroducers
          preferredContact
          placementPosition
          commissionDefault
          cmnCalculatedWeeks
          preferredContactDetail
          commission {
            begL
            begR
            newL
            newR
          }
        }
        package {
          id
          date
          token
          point
          amount
          status
          freeShare
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
          orderedAt
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
  mutation createSale($data: CreateSaleInput!) {
    createSale(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const UPDATE_SALE = gql(/* GraphQL */ `
  mutation updateSale($data: UpdateSaleInput!) {
    updateSale(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const REMOVE_SALE = gql(/* GraphQL */ `
  mutation removeSale($data: IDInput!) {
    removeSale(data: $data) {
      result
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);
