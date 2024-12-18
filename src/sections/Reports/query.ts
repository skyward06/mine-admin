import { gql } from 'src/__generated__/gql';

export const FETCH_ONEPOINT_AWAY_MEMBERS_QUERY = gql(/* GraphQL */ `
  query FetchOnepointAwayMembers($page: String, $sort: String) {
    onepointAwayMembers(page: $page, sort: $sort) {
      members {
        id
        username
        fullName
        email
        assetId
        mobile
        totalIntroducers
        createdAt
        updatedAt
        deletedAt
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

export const GENERATE_WEEKLY_REPORT = gql(/* GraphQL */ `
  mutation GenerateWeeklyReport($data: GenerateWeeklyReportInput!) {
    generateWeeklyReport(data: $data) {
      message
      result
    }
  }
`);
