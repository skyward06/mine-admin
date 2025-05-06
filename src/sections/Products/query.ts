import { gql } from 'src/__generated__/gql';

export const FETCH_PACKAGES_QUERY = gql(/* GraphQL */ `
  query Packages($sort: String, $page: String, $filter: JSONObject) {
    packages(sort: $sort, page: $page, filter: $filter) {
      packages {
        id
        ID
        date
        point
        token
        amount
        status
        freeShare
        createdAt
        updatedAt
        deletedAt
        productName
        orderVisibility
        enrollVisibility
      }
      total
    }
  }
`);

export const FETCH_PACKAGES_STATS_QUERY = gql(/* GraphQL */ `
  query FetchPackageStats($allFilter: JSONObject, $inactiveFilter: JSONObject) {
    all: packages(filter: $allFilter) {
      total
    }
    inactive: packages(filter: $inactiveFilter) {
      total
    }
  }
`);

export const CREATE_PACKAGE = gql(/* GraphQL */ `
  mutation createPackage($data: CreatePackageInput!) {
    createPackage(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const UPDATE_PACKAGE = gql(/* GraphQL */ `
  mutation updatePackage($data: UpdatePackageInput!) {
    updatePackage(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const REMOVE_PACKAGE = gql(/* GraphQL */ `
  mutation removePackage($data: IDInput!) {
    removePackage(data: $data) {
      result
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);
