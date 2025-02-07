import { gql } from 'src/__generated__/gql';

export const FETCH_PROOF_QUERY = gql(/* GraphQL */ `
  query Proofs($sort: String, $page: String, $filter: JSONObject) {
    proofs(sort: $sort, page: $page, filter: $filter) {
      proofs {
        createdAt
        updatedAt
        deletedAt
        id
        refId
        type
        amount
        orderedAt
        mineLocation
        note
        files {
          createdAt
          updatedAt
          deletedAt
          id
          url
          originalName
          mimeType
          size
        }
        reflinks {
          linkType
          link
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
      frontAction {
        ...FrontActionFields
      }
    }
  }
`);

export const UPDATE_PROOF = gql(/* GraphQL */ `
  mutation updateProof($data: UpdateProofByIDInput!) {
    updateProof(data: $data) {
      id
      frontAction {
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
      frontAction {
        ...FrontActionFields
      }
    }
  }
`);
