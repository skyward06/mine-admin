import { gql } from 'src/__generated__';

export const FETCH_COMMISSION_QUERY = gql(/* GraphQL */ `
  query WeeklyCommissions($page: String, $sort: String, $filter: JSONObject) {
    weeklyCommissions(page: $page, sort: $sort, filter: $filter) {
      weeklyCommissions {
        id
        ID
        memberId
        weekStartDate
        begL
        begR
        newL
        newR
        maxL
        maxR
        endL
        endR
        pkgL
        pkgR
        commission
        status
        shortNote
        proof {
          createdAt
          updatedAt
          deletedAt
          id
          refId
          type
          amount
          note
          orderedAt
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
          city
          email
          point
          state
          mobile
          status
          assetId
          zipCode
          username
          fullName
          sponsorId
          emailVerified
          primaryAddress
          secondaryAddress
          totalIntroducers
          placementParentId
          placementPosition
          commissionDefault
        }
        createdAt
        updatedAt
        deletedAt
      }
      total
    }
  }
`);

export const FETCH_COMMISSION_STATS_QUERY = gql(/* GraphQL */ `
  query FetchCommissionStats(
    $allFilter: JSONObject
    $pendingFilter: JSONObject
    $declinedFilter: JSONObject
    $approvedFilter: JSONObject
  ) {
    all: weeklyCommissions(filter: $allFilter) {
      total
    }
    pending: weeklyCommissions(filter: $pendingFilter) {
      total
    }
    declined: weeklyCommissions(filter: $declinedFilter) {
      total
    }
    approved: weeklyCommissions(filter: $approvedFilter) {
      total
    }
  }
`);

export const FETCH_COMMISSION_BY_WEEK = gql(/* GraphQL */ `
  query CommissionsByWeek($sort: String, $page: String, $weekStartDate: DateTimeISO) {
    commissionsByWeek(sort: $sort, page: $page, weekStartDate: $weekStartDate) {
      commissions {
        weekStartDate
        totalSale
        totalRevenue
        totalMember
        totalAmount
      }
      total
    }
  }
`);

export const UPDATE_COMMISSION = gql(/* GraphQL */ `
  mutation updateCommission($data: WeeklyCommissionUpdateInput!) {
    updateCommission(data: $data) {
      ID
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const UPDATE_COMMISSION_STATUS = gql(/* GraphQL */ `
  mutation updateCommissionsStatus($data: WeeklyCommissionsStatusUpdateInput!) {
    updateCommissionsStatus(data: $data) {
      message
      result
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const CALCULATE_COMMISSION = gql(/* GraphQL */ `
  mutation CalculateCommissions {
    calculateCommissions {
      message
      result
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const CALCULATE_PREVIEW_COMMISSION = gql(/* GraphQL */ `
  mutation CalculatePreviewCommissions {
    calculatePreviewCommissions {
      message
      result
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const UPDATE_COMMISSION_NOTE = gql(/* GraphQL */ `
  mutation updateCommissionShortNote($data: WeeklyCommissionNoteInput!) {
    updateCommissionShortNote(data: $data) {
      ID
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);
