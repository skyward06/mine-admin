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
  mutation CreateAdminNote($data: CreateAdminNotesInput!) {
    createAdminNote(data: $data) {
      adminId
      id
      description
      memberId
    }
  }
`);

export const UPDATE_NOTE = gql(/* GraphQL */ `
  mutation UpdateAdminNote($data: UpdateAdminNotesInput!) {
    updateAdminNote(data: $data) {
      admin {
        id
        username
        email
        avatar
      }
    }
  }
`);

export const REMOVE_NOTE = gql(/* GraphQL */ `
  mutation RemoveAdminNote($data: IDInput!) {
    removeAdminNote(data: $data) {
      message
      result
    }
  }
`);
