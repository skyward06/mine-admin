import { gql } from 'src/__generated__';

export const FETCH_COMMISSION_QUERY = gql(/* GraphQL */ `
  query WeeklyCommissions($page: String, $sort: String, $filter: JSONObject) {
    weeklyCommissions(page: $page, sort: $sort, filter: $filter) {
      weeklyCommissions {
        id
        memberId
        weekStartDate
        leftPoint
        rightPoint
        calculatedLeftPoint
        calculatedRightPoint
        commission
        status
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
        weeklyCommissionStatus {
          createdAt
          updatedAt
          deletedAt
          id
          weeklyCommissionId
          beforeLeftPoint
          beforeRightPoint
          afterLeftPoint
          afterRightPoint
          memberId
          weekStartDate
        }
        createdAt
        updatedAt
        deletedAt
      }
      total
    }
  }
`);

export const FETCH_COMMISSION_STATUS_QUERY = gql(/* GraphQL */ `
  query WeeklyCommissionStatuses($sort: String, $page: String, $filter: JSONObject) {
    weeklyCommissionStatuses(sort: $sort, page: $page, filter: $filter) {
      weeklyCommissionStatuses {
        createdAt
        updatedAt
        deletedAt
        id
        weeklyCommissionId
        beforeLeftPoint
        beforeRightPoint
        afterLeftPoint
        afterRightPoint
        memberId
        weekStartDate
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
        weeklyCommission {
          createdAt
          updatedAt
          deletedAt
          id
          memberId
          weekStartDate
          leftPoint
          rightPoint
          calculatedLeftPoint
          calculatedRightPoint
          commission
          status
        }
      }
      total
    }
  }
`);

export const FETCH_COMMISSION_STATS_QUERY = gql(/* GraphQL */ `
  query FetchCommissionStats(
    $allFilter: JSONObject
    $pendingFilter: JSONObject
    $declineFilter: JSONObject
    $sentFilter: JSONObject
  ) {
    all: weeklyCommissions(filter: $allFilter) {
      total
    }
    pending: weeklyCommissions(filter: $pendingFilter) {
      total
    }
    decline: weeklyCommissions(filter: $declineFilter) {
      total
    }
    sent: weeklyCommissions(filter: $sentFilter) {
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
