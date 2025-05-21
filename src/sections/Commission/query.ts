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
        cash
        note
        email
        status
        username
        fullName
        memberId
        createdAt
        qualified
        shortNote
        commission
        isTexitRanger
        weekStartDate
        commissionDefault
        invoice {
          id
          proof {
            files {
              id
              url
              size
              mimeType
              originalName
            }
          }
        }
      }
      total
    }
  }
`);

export const FETCH_COMMISSION_BY_ID = gql(/* GraphQL */ `
  query WeeklyCommissionById($data: IDInput!) {
    weeklyCommissionById(data: $data) {
      id
      ID
      cash
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
      cash
      status
      memberId
      shortNote
      commission
      weekStartDate
      member {
        username
        fullName
        updatedAt
      }
      proof {
        note
        reflinks {
          link
          linkType
        }
        files {
          id
          url
          size
          mimeType
          originalName
        }
      }
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

export const GENERATE_COMMISSION_TXC_SENDMANY = gql(/* GraphQL */ `
  query GenerateCommissionTXCSendmany($data: TXCPriceInput!) {
    generateCommissionTXCSendmany(data: $data) {
      ids
      command
    }
  }
`);

export const GENERATE_COMMISSION_USDC_SENDMANY = gql(/* GraphQL */ `
  query GenerateCommissionUSDCSendmany {
    generateCommissionUSDCSendmany {
      ids
      command
    }
  }
`);

export const APPROVE_COMMISSION_TRANSACTION = gql(/* GraphQL */ `
  mutation ApproveCommissionWithTransactionIds($data: ApproveCommissionWithTxIDInput!) {
    approveCommissionWithTransactionIds(data: $data) {
      result
      message
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
