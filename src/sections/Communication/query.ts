import { gql } from 'src/__generated__/gql';

export const FETCH_MEMBERS = gql(/* GraphQL */ `
  query Members($filter: JSONObject) {
    members(filter: $filter) {
      members {
        email
        username
      }
    }
  }
`);

export const FETCH_MEMBER_LIST_QUERY = gql(/* GraphQL */ `
  query Memberlists($sort: String, $page: String, $filter: JSONObject) {
    memberlists(sort: $sort, page: $page, filter: $filter) {
      memberLists {
        id
        name
        emails
        members {
          id
          email
          mobile
          username
          fullName
        }
      }
      total
    }
  }
`);

export const FETCH_MEMBER_LIST_BY_ID = gql(/* GraphQL */ `
  query MemberListById($data: IDInput!) {
    memberListById(data: $data) {
      id
      name
      emails
      members {
        id
        email
        mobile
        username
        fullName
      }
    }
  }
`);

export const CREATE_MEMBER_LIST = gql(/* GraphQL */ `
  mutation CreateMemberList($data: CreateMemberListInput!) {
    createMemberList(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);
