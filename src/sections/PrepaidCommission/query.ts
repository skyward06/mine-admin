import { gql } from 'src/__generated__';

export const FETCH_PREPAID_QUERY = gql(/* GraphQL */ `
  query PrepaidCommissions($sort: String, $page: String, $filter: JSONObject) {
    prepaidCommissions(sort: $sort, page: $page, filter: $filter) {
      prepaidCommissions {
        createdAt
        updatedAt
        deletedAt
        id
        memberId
        saleId
        note
        pkgL
        pkgR
        commission
        orderedAt
        weekStartDate
        paymentConfirm {
          createdAt
          updatedAt
          deletedAt
          id
          url
          originalName
          mimeType
          size
        }
        member {
          createdAt
          updatedAt
          deletedAt
          id
          username
          fullName
          sponsorId
          email
          userId
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
          begL
          begR
          newL
          newR
        }
        sale {
          createdAt
          updatedAt
          deletedAt
          id
          purchaseId
          paymentMethod
          status
          memberId
          packageId
          package {
            id
            date
            token
            point
            amount
            status
            productName
            enrollVisibility
          }
          orderedAt
          note
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

export const CREATE_PREPAID = gql(/* GraphQL */ `
  mutation CreatePrepaidCommission($data: CreatePrepaidCommissionInput!) {
    createPrepaidCommission(data: $data) {
      id
    }
  }
`);

export const UPDATE_PREPAID = gql(/* GraphQL */ `
  mutation UpdatePrepaidCommission($data: UpdatePrepaidCommissionInput!) {
    updatePrepaidCommission(data: $data) {
      id
    }
  }
`);
