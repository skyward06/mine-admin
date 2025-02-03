import { gql } from 'src/__generated__/gql';

export const FETCH_MEMBER_STATS_QUERY = gql(/* GraphQL */ `
  query FetchMemberStats(
    $approveFilter: JSONObject
    $pendingFilter: JSONObject
    $graveyardFilter: JSONObject
  ) {
    APPROVED: members(filter: $approveFilter) {
      total
    }
    PENDING: members(filter: $pendingFilter) {
      total
    }
    GRAVEYARD: members(filter: $graveyardFilter) {
      total
    }
  }
`);

export const FETCH_MEMBERS_QUERY = gql(/* GraphQL */ `
  query FetchMembers($page: String, $filter: JSONObject, $sort: String, $logsize: Float) {
    members(page: $page, filter: $filter, sort: $sort) {
      members {
        id
        ID
        balance
        username
        fullName
        email
        country
        allowState
        primaryAddress
        secondaryAddress
        assetId
        mobile
        city
        state
        zipCode
        point
        sponsorId
        status
        promoCode
        groupName
        emailVerified
        totalIntroducers
        syncWithSendy
        preferredContact
        preferredContactDetail
        cmnCalculatedWeeks
        teamStrategy
        teamReport
        placementPosition
        signupFormRequest
        commission {
          begL
          begR
          newL
          newR
        }
        sponsor {
          id
          ID
          balance
          username
          fullName
          email
          point
          promoCode
          allowState
          primaryAddress
          secondaryAddress
          mobile
          assetId
          groupName
          status
          emailVerified
          totalIntroducers
          syncWithSendy
          preferredContact
          preferredContactDetail
          cmnCalculatedWeeks
          teamStrategy
          teamReport
          placementPosition
          commission {
            begL
            begR
            newL
            newR
          }
        }
        placementParentId
        placementPosition
        placementParent {
          id
          ID
          email
          point
          mobile
          status
          assetId
          balance
          username
          fullName
          groupName
          allowState
          emailVerified
          syncWithSendy
          primaryAddress
          totalIntroducers
          preferredContact
          secondaryAddress
          preferredContactDetail
          cmnCalculatedWeeks
          teamStrategy
          teamReport
          placementPosition
          commission {
            begL
            begR
            newL
            newR
          }
        }
        placementChildren {
          id
          ID
          email
          point
          mobile
          status
          assetId
          balance
          username
          fullName
          groupName
          allowState
          emailVerified
          syncWithSendy
          primaryAddress
          secondaryAddress
          preferredContact
          totalIntroducers
          placementPosition
          preferredContactDetail
          cmnCalculatedWeeks
          teamStrategy
          teamReport
          placementPosition
          commission {
            begL
            begR
            newL
            newR
          }
        }
        sales {
          id
          ID
          memberId
          packageId
          paymentMethod
          freeShareSale
          proof {
            createdAt
            updatedAt
            deletedAt
            id
            refId
            type
            amount
            note
            orderedAt
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
          status
          orderedAt
        }
        memberWallets {
          createdAt
          updatedAt
          deletedAt
          id
          memberId
          payoutId
          address
          percent
          note
          payout {
            id
            method
            status
            name
            display
            createdAt
            updatedAt
            deletedAt
          }
        }
        logs(logsize: $logsize) {
          id
          who
          role
          when
          entity
          action
          status
          before
          after
        }
        createdAt
        updatedAt
        deletedAt
      }
      total
    }
  }
`);

export const FETCH_PLACEMENT_MEMBERS_QUERY = gql(/* GraphQL */ `
  query FetchPlacementMembers($page: String, $filter: JSONObject, $sort: String) {
    members(page: $page, filter: $filter, sort: $sort) {
      members {
        id
        username
        email
        fullName
        sponsorId
        groupName
        status
        teamReport
        allowState
        cmnCalculatedWeeks
        placementParentId
        placementPosition
        placementParent {
          id
          balance
          username
          fullName
        }
        sponsor {
          balance
          username
        }
        commission {
          begL
          begR
          newL
          newR
        }
        createdAt
      }
      total
    }
  }
`);

export const CREATE_MEMBER = gql(/* GraphQL */ `
  mutation CreateMember($data: CreateMemberInput!) {
    createMember(data: $data) {
      username
      fullName
      email
      mobile
      primaryAddress
      secondaryAddress
      assetId
    }
  }
`);

export const UPDATE_MEMBER = gql(/* GraphQL */ `
  mutation UpdateMember($data: UpdateMemberInput!) {
    updateMember(data: $data) {
      id
      mobile
      primaryAddress
      secondaryAddress
      assetId
    }
  }
`);

export const FETCH_MEMBER_HISTORY = gql(/* GraphQL */ `
  query MemberOverview($data: IDInput!) {
    memberOverview(data: $data) {
      currentHashPower
      totalTXCShared
      joinDate
    }
  }
`);

export const FETCH_MEMBER_STATISTICS = gql(/* GraphQL */ `
  query MemberStatistics($sort: String, $page: String, $filter: JSONObject) {
    memberStatistics(sort: $sort, page: $page, filter: $filter) {
      memberStatistics {
        issuedAt
        hashPower
        txcShared
      }
      total
    }
  }
`);

export const FETCH_PAYOUTS_QUERY = gql(/* GraphQL */ `
  query Payouts($filter: JSONObject, $page: String, $sort: String) {
    payouts(filter: $filter, page: $page, sort: $sort) {
      payouts {
        id
        method
        display
        name
        status
        createdAt
        updatedAt
        deletedAt
      }
      total
    }
  }
`);

export const UPDATE_PASSWORD_QUERY = gql(/* GraphQL */ `
  mutation UpdatePasswordMemberById($data: UpdateMemberPasswordInputById!) {
    updatePasswordMemberById(data: $data) {
      id
    }
  }
`);

export const REMOVE_MEMBER_QUERY = gql(/* GraphQL */ `
  mutation RemoveMember($data: IDInput!) {
    removeMember(data: $data) {
      message
      result
    }
  }
`);

export const REMOVE_MEMBER_PLACEMENT = gql(/* GraphQL */ `
  mutation RemoveCompleteMemberPlacement($data: IDInput!) {
    removeCompleteMemberPlacement(data: $data) {
      message
      result
    }
  }
`);

export const APPROVE_MEMBER = gql(/* GraphQL */ `
  mutation Mutation($data: IDInput!) {
    approveMember(data: $data) {
      message
      result
      result
    }
  }
`);

export const SEND_WELCOME_EMAIL = gql(/* GraphQL */ `
  mutation SendWelcomeEmail($data: EmailInput!) {
    sendWelcomeEmail(data: $data) {
      message
      result
    }
  }
`);

export const MOVE_TO_GRAVEYARD = gql(/* GraphQL */ `
  mutation MoveToGraveyard($data: IDInput!) {
    moveToGraveyard(data: $data) {
      message
      result
    }
  }
`);

export const VERIFY_MEMBER_EMAIL = gql(/* GraphQL */ `
  mutation VerifyMemberEmail($data: IDInput!) {
    verifyMemberEmail(data: $data) {
      message
      result
    }
  }
`);
