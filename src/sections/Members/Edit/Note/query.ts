import { gql } from 'src/__generated__/gql';

export const FETCH_NOTES_QUERY = gql(/* GraphQL */ `
  query AdminNotes($sort: String, $page: String, $filter: JSONObject) {
    adminNotes(sort: $sort, page: $page, filter: $filter) {
      adminNotes {
        createdAt
        updatedAt
        deletedAt
        id
        memberId
        adminId
        description
        member {
          createdAt
          updatedAt
          deletedAt
          id
          username
          fullName
          sponsorId
          email
          mobile
          assetId
          primaryAddress
          secondaryAddress
          city
          state
          zipCode
          placementParentId
          placementPosition
          point
          emailVerified
          status
          totalIntroducers
          syncWithSendy
          preferredContact
          preferredContactDetail
          commission {
            begL
            begR
            newL
            newR
          }
        }
        admin {
          createdAt
          updatedAt
          deletedAt
          id
          username
          email
          avatar
        }
      }
      total
    }
  }
`);

export const CREATE_NOTE = gql(/* GraphQL */ `
  mutation createAdminNote($data: CreateAdminNotesInput!) {
    createAdminNote(data: $data) {
      id
      frontAction {
        ...FrontActionFields
      }
    }
  }
`);

export const UPDATE_NOTE = gql(/* GraphQL */ `
  mutation updateAdminNote($data: UpdateAdminNotesInput!) {
    updateAdminNote(data: $data) {
      admin {
        id
        frontAction {
          ...FrontActionFields
        }
      }
    }
  }
`);

export const REMOVE_NOTE = gql(/* GraphQL */ `
  mutation removeAdminNote($data: IDInput!) {
    removeAdminNote(data: $data) {
      message
      result
      frontAction {
        ...FrontActionFields
      }
    }
  }
`);
