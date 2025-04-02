import { gql } from 'src/__generated__';

export const FETCH_COMMISSION_QUERY = gql(/* GraphQL */ `
  query WeeklyCommissions($sort: String, $page: String, $filter: JSONObject) {
    weeklyCommissions(sort: $sort, page: $page, filter: $filter) {
      weeklyCommissions {
        id
        ID
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
        note
        email
        status
        username
        fullName
        memberId
        createdAt
        shortNote
        commission
        weekStartDate
        commissionDefault
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

export const GENERATE_COMMISSION_SENDMANY = gql(/* GraphQL */ `
  query GenerateCommissionSendmany($data: TXCPriceInput!) {
    generateCommissionSendmany(data: $data) {
      ids
      command
    }
  }
`);

export const APPROVE_COMMISSION_TRANSACTION = gql(/* GraphQL */ `
  mutation ApproveCommissionWithTransactionIds($data: ApproveCommissionWithTxIDInput!) {
    approveCommissionWithTransactionIds(data: $data) {
      message
      result
      frontActions {
        ...FrontActionFields
      }
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
