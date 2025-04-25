import { gql } from 'src/__generated__/gql';

export const FETCH_BUG_REPORTS = gql(/* GraphQL */ `
  query BugReports($sort: String, $page: String, $filter: JSONObject) {
    bugReports(sort: $sort, page: $page, filter: $filter) {
      bugReports {
        id
        who
        status
        contact
        subject
        description
        createdAt
        files {
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

export const FETCH_BUG_REPORT = gql(/* GraphQL */ `
  query BugReportById($data: IDInput!) {
    bugReportById(data: $data) {
      createdAt
      id
      who
      status
      contact
      subject
      description
      solvedBy {
        username
        fullName
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
`);

export const MOVE_TO_SOLVE = gql(/* GraphQL */ `
  mutation MoveToSolve($data: IDInput!) {
    moveToSolve(data: $data) {
      message
      result
    }
  }
`);

export const MOVE_TO_WIP = gql(/* GraphQL */ `
  mutation MoveToWIP($data: IDInput!) {
    moveToWIP(data: $data) {
      message
      result
    }
  }
`);
