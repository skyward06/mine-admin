import { gql } from 'src/__generated__/gql';

export const FETCH_STATISTICS_QUERY = gql(/* GraphQL */ `
  query Reward($sort: String, $page: String, $filter: JSONObject) {
    statistics(sort: $sort, page: $page, filter: $filter) {
      statistics {
        id
        to
        from
        status
        issuedAt
        txcShared
        newBlocks
        totalBlocks
        totalMembers
        transactionId
        totalHashPower
        statisticsSales {
          id
          saleId
          issuedAt
        }
      }
      total
    }
  }
`);

export const FETCH_MEMBERSTATISTICS_QUERY = gql(/* GraphQL */ `
  query FetchMemberStatistics($sort: String, $page: String, $filter: JSONObject) {
    memberStatistics(sort: $sort, page: $page, filter: $filter) {
      memberStatistics {
        id
        percent
        memberId
        issuedAt
        txcShared
        hashPower
        createdAt
        updatedAt
        statisticsId
        member {
          id
          email
          point
          mobile
          status
          username
          fullName
          allowState
          teamReport
          OTPEnabled
          teamStrategy
          isTexitRanger
          syncWithSendy
          emailVerified
          primaryAddress
          totalIntroducers
          placementPosition
          commissionDefault
          cmnCalculatedWeeks
          commission {
            begL
            begR
            newL
            newR
          }
          memberWallets {
            id
            percent
            address
            memberId
            payoutId
            isDefault
            payout {
              id
              name
              method
              status
              display
            }
          }
        }
        statistics {
          createdAt
          updatedAt
          deletedAt
          id
          transactionId
          newBlocks
          totalBlocks
          totalHashPower
          totalMembers
          status
          txcShared
          issuedAt
          from
          to
        }
      }
      total
    }
  }
`);

export const CONFIRM_STATISTICS = gql(/* GraphQL */ `
  mutation confirmStatistics($data: ConfirmStatistics!) {
    confirmStatistics(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const CREATE_STATISTICS = gql(/* GraphQL */ `
  mutation createStatistics($data: CreateStatisticsInput!) {
    createStatistics(data: $data) {
      id
      newBlocks
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const CREATE_MANY_MEMBER_STATISTICS = gql(/* GraphQL */ `
  mutation createManyMemberStatistics($data: CreateManyMemberStatisticsInput!) {
    createManyMemberStatistics(data: $data) {
      count
    }
  }
`);

export const UPDATE_STATISTICS = gql(/* GraphQL */ `
  mutation updateStatistics($data: UpdateStatisticsInput!) {
    updateStatistics(data: $data) {
      status
      txcShared
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const REMOVE_MEMBER_STATISTICS = gql(/* GraphQL */ `
  mutation removeMemberStatisticsByStaitisId($data: IDInput!) {
    removeMemberStatisticsByStaitisId(data: $data) {
      count
    }
  }
`);

export const REMOVE_STATISTICS = gql(/* GraphQL */ `
  mutation removeManyStatistics($data: IDsInput!) {
    removeManyStatistics(data: $data) {
      count
    }
  }
`);
