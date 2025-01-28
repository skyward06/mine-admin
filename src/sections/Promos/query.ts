import { gql } from 'src/__generated__';

export const FETCH_PROMOS_QUERY = gql(/* GraphQL */ `
  query Promos($sort: String, $page: String, $filter: JSONObject) {
    promos(sort: $sort, page: $page, filter: $filter) {
      promos {
        createdAt
        updatedAt
        deletedAt
        id
        code
        description
        status
        startDate
        endDate
      }
      total
    }
  }
`);

export const CREATE_PROMO = gql(/* GraphQL */ `
  mutation CreatePromo($data: CreatePromoInput!) {
    createPromo(data: $data) {
      id
    }
  }
`);

export const UDPATE_PROMO = gql(/* GraphQL */ `
  mutation UpdatePromo($data: UpdatePromoInput!) {
    updatePromo(data: $data) {
      id
    }
  }
`);

export const REMOVE_PROMO = gql(/* GraphQL */ `
  mutation RemovePromo($data: IDInput!) {
    removePromo(data: $data) {
      message
      result
    }
  }
`);
