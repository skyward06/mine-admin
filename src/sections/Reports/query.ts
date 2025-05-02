import { gql } from 'src/__generated__/gql';

export const FETCH_ONEPOINT_AWAY_MEMBERS_QUERY = gql(/* GraphQL */ `
  query FetchOnepointAwayMembers($page: String, $sort: String) {
    onepointAwayMembers(page: $page, sort: $sort) {
      members {
        id
        email
        mobile
        assetId
        username
        fullName
        createdAt
        updatedAt
        deletedAt
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
  query Sponsors($sort: String, $page: String, $filter: JSONObject, $week: Date!) {
    members(sort: $sort, page: $page, filter: $filter) {
      members {
        id
        ID
        email
        point
        avatar
        mobile
        status
        username
        fullName
        allowState
        teamReport
        OTPEnabled
        teamStrategy
        syncWithSendy
        emailVerified
        primaryAddress
        weekIntroducers(week: $week)
        totalIntroducers
        placementPosition
        commissionDefault
        cmnCalculatedWeeks
      }
      total
    }
  }
`);

export const FETCH_WINNERS_QUERY = gql(/* GraphQL */ `
  query Winners($sort: String, $page: String, $filter: JSONObject) {
    WDMSVegasContestWinners(sort: $sort, page: $page, filter: $filter) {
      winners {
        level
        points
        username
        fullName
        sponsored
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
