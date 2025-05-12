import { gql } from 'src/__generated__/gql';

export const FETCH_ONEPOINT_AWAY_MEMBERS_QUERY = gql(/* GraphQL */ `
  query OnepointAwayMembers($sort: String, $page: String) {
    onepointAwayMembers(sort: $sort, page: $page) {
      members {
        id
        ID
        email
        mobile
        assetId
        username
        fullName
        createdAt
        totalIntroducers
      }
      total
    }
  }
`);

export const FETCH_REVENUES_QUERY = gql(/* GraphQL */ `
  query MemberInOutRevenues($sort: String, $page: String, $filter: JSONObject) {
    memberInOutRevenues(sort: $sort, page: $page, filter: $filter) {
      inOuts {
        id
        amount
        percent
        username
        fullName
        commission
        cashCommissionPotential
      }
      total
    }
  }
`);

export const FETCH_WEEKLY_REPORT = gql(/* GraphQL */ `
  query WeeklyReports($sort: String, $page: String, $filter: JSONObject) {
    weeklyReports(sort: $sort, page: $page, filter: $filter) {
      weeklyReports {
        id
        fileId
        createdAt
        weekStartDate
        file {
          id
          url
          size
          mimeType
          originalName
        }
      }
      total
    }
  }
`);

export const FETCH_SPONSORS_QUERY = gql(/* GraphQL */ `
  query WeekIntroducers($week: Date!, $sort: String, $page: String) {
    weekIntroducers(week: $week, sort: $sort, page: $page) {
      members {
        ID
        mobile
        assetId
        username
        fullName
        createdAt
        totalIntroducers
      }
      total
    }
  }
`);

export const GENERATE_WEEKLY_REPORT = gql(/* GraphQL */ `
  mutation generateWeeklyReport($data: GenerateWeeklyReportInput!) {
    generateWeeklyReport(data: $data) {
      message
      result
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const GENERATE_WINNER_REPORT = gql(/* GraphQL */ `
  mutation GenerateWDMSVegasReport {
    generateWDMSVegasReport {
      result
      message
    }
  }
`);
