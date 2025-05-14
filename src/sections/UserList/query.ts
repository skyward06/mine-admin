import { gql } from 'src/__generated__';

export const FETCH_USER_STATS_QUERY = gql(/* GraphQL */ `
  query FetchUserStats(
    $adminFilter: JSONObject
    $apFilter: JSONObject
    $inactiveFilter: JSONObject
  ) {
    all: admins {
      total
    }
    admin: admins(filter: $adminFilter) {
      total
    }
    user: admins(filter: $apFilter) {
      total
    }
    inactive: admins(filter: $inactiveFilter) {
      total
    }
  }
`);

export const FETCH_USERS_QUERY = gql(/* GraphQL */ `
  query FetchUsers($page: String, $filter: JSONObject, $sort: String) {
    admins(page: $page, filter: $filter, sort: $sort) {
      admins {
        id
        email
        avatar
        roleId
        status
        username
        fullName
        createdAt
        updatedAt
        deletedAt
        OTPEnabled
        role {
          id
          name
          role
          sale
          admin
          commission
          description
        }
      }
      total
    }
  }
`);

export const CREATE_ADMIN = gql(/* GraphQL */ `
  mutation createAdmin($data: CreateAdminInput!) {
    createAdmin(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const UPDATE_ADMIN = gql(/* GraphQL */ `
  mutation UpdateAdmin($data: UpdateAdminInput!) {
    updateAdmin(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const UPDATE_PASSWORD_BY_ADMIN = gql(/* GraphQL */ `
  mutation updatePasswordAdminById($data: UpdateAdminPasswordByIdInput!) {
    updatePasswordAdminById(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const REMOVE_ADMIN = gql(/* GraphQL */ `
  mutation RemoveAdmin($data: IDInput!) {
    removeAdmin(data: $data) {
      result
      message
    }
  }
`);
