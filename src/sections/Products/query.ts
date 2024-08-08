import { gql } from 'src/__generated__/gql';

export const FETCH_PACKAGES_QUERY = gql(/* GraphQL */ `
  query Packages($sort: String, $page: String, $filter: JSONObject) {
    packages(sort: $sort, page: $page, filter: $filter) {
      packages {
        createdAt
        updatedAt
        deletedAt
        id
        productName
        amount
        status
        date
        token
        sales {
          id
          invoiceNo
          memberId
          orderedAt
          packageId
          paymentMethod
          status
        }
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
  mutation CreatePackage($data: CreatePackageInput!) {
    createPackage(data: $data) {
      id
    }
  }
`);

export const UPDATE_PACKAGE = gql(/* GraphQL */ `
  mutation UpdatePackage($data: UpdatePackageInput!) {
    updatePackage(data: $data) {
      id
    }
  }
`);

export const REMOVE_PACKAGE = gql(/* GraphQL */ `
  mutation RemovePackage($data: IDInput!) {
    removePackage(data: $data) {
      id
    }
  }
`);
