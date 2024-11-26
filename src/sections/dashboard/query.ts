import { gql } from 'src/__generated__';

export const FETCH_STATISTICS_QUERY = gql(/* GraphQL */ `
  query HistoryStatistics($page: String, $filter: JSONObject, $sort: String) {
    statistics(page: $page, filter: $filter, sort: $sort) {
      statistics {
        id
        totalHashPower
        newBlocks
        totalBlocks
        totalMembers
        txcShared
        issuedAt
        from
        to
        status
        createdAt
        updatedAt
        deletedAt
      }
      total
    }
  }
`);

export const FETCH_BLOCKS_DATA_QUERY = gql(/* GraphQL */ `
  query BlocksData($data: PeriodStatsArgs!) {
    blocksData(data: $data) {
      hashRate
      difficulty
      base
      baseDate
    }
  }
`);

export const FETCH_MEMBER_COUNT = gql(/* GraphQL */ `
  query NewMemberCounts($data: PeriodStatsArgs!) {
    newMemberCounts(data: $data) {
      base
      baseDate
      minerCount
    }
  }
`);

export const FETCH_MEMBER_REWARD = gql(/* GraphQL */ `
  query AverageMemberReward($data: PeriodStatsArgs!) {
    averageMemberReward(data: $data) {
      base
      baseDate
      reward
    }
  }
`);

export const FETCH_COMMISSION_BY_PERIOD = gql(/* GraphQL */ `
  query CommissionByPeriod($data: PeriodStatsArgs!) {
    commissionByPeriod(data: $data) {
      base
      baseDate
      commission
    }
  }
`);

export const FETCH_REVENUE_QUERY = gql(/* GraphQL */ `
  query RevenueOverview {
    revenueOverview {
      revenue
      spent {
        label
        value
      }
    }
  }
`);

export const FETCH_TOTAL_MINER_QUERY = gql(/* GraphQL */ `
  query TotalMemberCounts($data: PeriodStatsArgs!) {
    totalMemberCounts(data: $data) {
      base
      baseDate
      minerCount
    }
  }
`);

export const FETCH_TXC_SHARES = gql(/* GraphQL */ `
  query TxcShares($data: PeriodStatsArgs!) {
    txcShares(data: $data) {
      base
      baseDate
      txc
    }
  }
`);
