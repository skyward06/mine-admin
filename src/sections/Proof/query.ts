import { gql } from 'src/__generated__/gql';

export const FETCH_PROOF_QUERY = gql(/* GraphQL */ `
  query Proofs($sort: String, $page: String, $filter: JSONObject) {
    proofs(sort: $sort, page: $page, filter: $filter) {
      proofs {
        id
        note
        type
        refId
        amount
        vendor
        createdAt
        orderedAt
        mineLocation
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
      total
    }
  }
`);

export const CREATE_PROOF = gql(/* GraphQL */ `
  mutation createProof($data: CreateProofInput!) {
    createProof(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const UPDATE_PROOF = gql(/* GraphQL */ `
  mutation updateProof($data: UpdateProofByIDInput!) {
    updateProof(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const REMOVE_PROOF = gql(/* GraphQL */ `
  mutation removeProof($data: IDInput!) {
    removeProof(data: $data) {
      message
      result
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);
