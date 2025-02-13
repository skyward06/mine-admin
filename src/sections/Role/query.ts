import { gql } from 'src/__generated__';

export const FETCH_ROLES_QUERY = gql(/* GraphQL */ `
  query Roles($sort: String, $page: String, $filter: JSONObject) {
    roles(sort: $sort, page: $page, filter: $filter) {
      roles {
        id
        name
        sale
        proof
        member
        balance
        additions
        createdAt
        commission
        description
        frontActions {
          ...FrontActionFields
        }
      }
      total
    }
  }
`);

export const FETCH_ROLE_BY_ID = gql(/* GraphQL */ `
  query RoleById($data: IDInput!) {
    roleById(data: $data) {
      id
      name
      sale
      proof
      member
      balance
      additions
      createdAt
      commission
      description
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const CREATE_ROLE = gql(/* GraphQL */ `
  mutation CreateRole($data: CreateRoleInput!) {
    createRole(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const UPDATE_ROLE = gql(/* GraphQL */ `
  mutation UpdateRole($data: UpdateRoleInput!) {
    updateRole(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const REMOVE_ROLE = gql(/* GeaphQL */ `
  mutation RemoveRole($data: IDInput!) {
    removeRole(data: $data) {
      result
      message
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);
