import { gql } from 'src/__generated__/gql';

export const FETCH_INVOICES_QUERY = gql(/* GraphQL */ `
  query Invoices($sort: String, $page: String, $filter: JSONObject) {
    invoices(sort: $sort, page: $page, filter: $filter) {
      invoices {
        id
        name
        status
        dueDate
        createdAt
        description
        amountInCents
        proof {
          id
          type
          note
          refId
          amount
          orderedAt
          files {
            id
            url
            size
            mimeType
            originalName
          }
          reflinks {
            link
            linkType
          }
        }
      }
      total
    }
  }
`);

export const FETCH_INVOICE_BY_ID = gql(/* GraphQL */ `
  query InvoiceById($data: IDNInput!) {
    invoiceById(data: $data) {
      id
      name
      status
      dueDate
      createdAt
      description
      amountInCents
      proof {
        id
        type
        note
        refId
        amount
        orderedAt
        files {
          id
          url
          size
          mimeType
          originalName
        }
        reflinks {
          link
          linkType
        }
      }
    }
  }
`);

export const MOVE_TO_PAID = gql(/* GraphQL */ `
  mutation MoveInvoicePaid($data: IDNInput!) {
    moveInvoicePaid(data: $data) {
      result
      message
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const UPDATE_INVOICE = gql(/* GraphQL */ `
  mutation UpdateInvoice($data: UpdateInvoiceInput!) {
    updateInvoice(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const GENERATE_WEEK_INVOICE = gql(/* GraphQL */ `
  mutation GenerateWeekP2PInvoice($data: InvoiceWeekInput!) {
    generateWeekP2PInvoice(data: $data) {
      result
      message
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const REGENERATE_INVOICE_BY_ID = gql(/* GraphQL */ `
  mutation RegenerateInvoiceById($data: IDNInput!) {
    regenerateInvoiceById(data: $data) {
      result
      message
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);
