import { gql } from 'src/__generated__';

export const FETCH_COMMISSION_QUERY = gql(/* GraphQL */ `
  query WeeklyCommissions($page: String, $sort: String, $filter: JSONObject) {
    weeklyCommissions(page: $page, sort: $sort, filter: $filter) {
      weeklyCommissions {
        id
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
        note
        paymentConfirm {
          id
          url
          originalName
          mimeType
          size
          createdAt
          updatedAt
        }
        member {
          createdAt
          updatedAt
          deletedAt
          id
          username
          fullName
          sponsorId
          email
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
    $paidFilter: JSONObject
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
    paid: weeklyCommissions(filter: $paidFilter) {
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
        totalMember
        totalAmount
      }
      total
    }
  }
`);

export const UPDATE_COMMISSION_STATUS = gql(/* GraphQL */ `
  mutation UpdateCommissionStatus($data: WeeklyCommissionUpdateInput!) {
    updateCommissionStatus(data: $data) {
      id
    }
  }
`);

export const CALCULATE_COMMISSION_PREVIEW = gql(/* GraphQL */ `
  mutation CalculatePreview {
    calculatePreview {
      message
      result
    }
  }
`);
