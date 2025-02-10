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
  mutation createPromo($data: CreatePromoInput!) {
    createPromo(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const UDPATE_PROMO = gql(/* GraphQL */ `
  mutation updatePromo($data: UpdatePromoInput!) {
    updatePromo(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const REMOVE_PROMO = gql(/* GraphQL */ `
  mutation removePromo($data: IDInput!) {
    removePromo(data: $data) {
      message
      result
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);
