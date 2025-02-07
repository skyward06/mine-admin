import { gql } from 'src/__generated__/gql';

export const FETCH_PAYMENT_QUERY = gql(/* GraphQL */ `
  query PaymentMethods($sort: String, $page: String, $filter: JSONObject) {
    paymentMethods(sort: $sort, page: $page, filter: $filter) {
      paymentMethods {
        id
        name
        visible
        createdAt
        defaultLink
        paymentMethodLinks {
          id
          link
          packageId
          paymentMethodId
        }
      }
      total
    }
  }
`);

export const CREATE_PAYMENT = gql(/* GraphQL */ `
  mutation createPaymentMethod($data: CreatePaymentMethodInput!) {
    createPaymentMethod(data: $data) {
      id
      frontAction {
        ...FrontActionFields
      }
    }
  }
`);

export const UPDATE_PAYMENT = gql(/* GraphQL */ `
  mutation updatePaymentMethod($data: UpdatePaymentMethodInput!) {
    updatePaymentMethod(data: $data) {
      id
      frontAction {
        ...FrontActionFields
      }
    }
  }
`);

export const REMOVE_PAYMENT = gql(/* GraphQL */ `
  mutation removePaymentMethod($data: IDInput!) {
    removePaymentMethod(data: $data) {
      message
      result
      frontAction {
        ...FrontActionFields
      }
    }
  }
`);
