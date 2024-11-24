import { gql } from 'src/__generated__';

export const FETCH_PREPAID_QUERY = gql(/* GraphQL */ `
  query PrepaidCommissions($sort: String, $page: String, $filter: JSONObject) {
    prepaidCommissions(sort: $sort, page: $page, filter: $filter) {
      prepaidCommissions {
        createdAt
        updatedAt
        deletedAt
        id
        commissionId
        txId
        txType
        orderedAt
        commission {
          commission
          weekStartDate
          pkgL
          pkgR
          member {
            createdAt
            updatedAt
            deletedAt
            id
            username
            fullName
            sponsorId
            email
            ID
            mobile
            assetId
            primaryAddress
            secondaryAddress
            city
            state
            zipCode
            placementParentId
            placementPosition
            point
            emailVerified
            status
            totalIntroducers
            syncWithSendy
            preferredContact
            preferredContactDetail
            commission {
              begL
              begR
              newL
              newR
            }
          }
        }
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

export const FETCH_COMMISSION_BY_MEMBER = gql(/* GraphQL */ `
  query CommissionByMemberIDAndWeek($data: WeeklyCommissionGetInput!) {
    commissionByMemberIDAndWeek(data: $data) {
      id
      commission
      pkgL
      pkgR
    }
  }
`);

export const CREATE_PREPAID = gql(/* GraphQL */ `
  mutation CreatePrepaidCommission($data: CreatePrepaidCommissionInput!) {
    createPrepaidCommission(data: $data) {
      id
    }
  }
`);

export const UPDATE_PREPAID = gql(/* GraphQL */ `
  mutation UpdatePrepaidCommission($data: UpdatePrepaidCommissionInput!) {
    updatePrepaidCommission(data: $data) {
      id
    }
  }
`);

export const REMOVE_PREPAID = gql(/* GraphQL */ `
  mutation RemovePrepaidCommission($data: IDInput!) {
    removePrepaidCommission(data: $data) {
      message
      result
    }
  }
`);
