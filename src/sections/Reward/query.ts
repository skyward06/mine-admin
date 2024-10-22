import { gql } from 'src/__generated__/gql';

export const FETCH_STATISTICS_QUERY = gql(/* GraphQL */ `
  query Reward($sort: String, $page: String, $filter: JSONObject) {
    statistics(sort: $sort, page: $page, filter: $filter) {
      statistics {
        id
        transactionId
        issuedAt
        newBlocks
        totalBlocks
        totalHashPower
        totalMembers
        txcShared
        from
        to
        status
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
        createdAt
        updatedAt
        deletedAt
        id
        memberId
        statisticsId
        txcShared
        hashPower
        percent
        issuedAt
        member {
          createdAt
          updatedAt
          deletedAt
          id
          username
          fullName
          email
          point
          mobile
          assetId
          status
          emailVerified
          totalIntroducers
          primaryAddress
          secondaryAddress
          totalIntroducers
          syncWithSendy
          preferredContact
          preferredContactDetail
          memberWallets {
            createdAt
            updatedAt
            deletedAt
            id
            memberId
            payoutId
            address
            percent
            payout {
              id
              method
              status
              name
              display
              createdAt
              updatedAt
              deletedAt
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
  mutation ConfirmStatistics($data: ConfirmStatistics!) {
    confirmStatistics(data: $data) {
      id
    }
  }
`);

export const CREATE_STATISTICS = gql(/* GraphQL */ `
  mutation CreateStatistics($data: CreateStatisticsInput!) {
    createStatistics(data: $data) {
      id
      newBlocks
    }
  }
`);

export const CREATE_MANY_MEMBER_STATISTICS = gql(/* GraphQL */ `
  mutation CreateManyMemberStatistics($data: CreateManyMemberStatisticsInput!) {
    createManyMemberStatistics(data: $data) {
      count
    }
  }
`);

export const UPDATE_STATISTICS = gql(/* GraphQL */ `
  mutation UpdateStatistics($data: UpdateStatisticsInput!) {
    updateStatistics(data: $data) {
      status
      txcShared
    }
  }
`);

export const REMOVE_MEMBER_STATISTICS = gql(/* GraphQL */ `
  mutation RemoveMemberStatisticsByStaitisId($data: IDInput!) {
    removeMemberStatisticsByStaitisId(data: $data) {
      count
    }
  }
`);

export const REMOVE_STATISTICS = gql(/* GraphQL */ `
  mutation RemoveManyStatistics($data: IDsInput!) {
    removeManyStatistics(data: $data) {
      count
    }
  }
`);
