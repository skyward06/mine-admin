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
          isMetal
          paymentMethod
          sponsorCnt
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
  mutation createMember($data: CreateMemberInput!) {
    createMember(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const UPDATE_MEMBER = gql(/* GraphQL */ `
  mutation updateMember($data: UpdateMemberInput!) {
    updateMember(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const FETCH_MEMBER_HISTORY = gql(/* GraphQL */ `
  query MemberOverview($data: IDInput!) {
    memberOverview(data: $data) {
      cashCommissionPotential
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
  mutation updatePasswordMemberById($data: UpdateMemberPasswordInputById!) {
    updatePasswordMemberById(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const REMOVE_MEMBER_QUERY = gql(/* GraphQL */ `
  mutation removeMember($data: IDInput!) {
    removeMember(data: $data) {
      message
      result
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const REMOVE_MEMBER_PLACEMENT = gql(/* GraphQL */ `
  mutation removeCompleteMemberPlacement($data: IDInput!) {
    removeCompleteMemberPlacement(data: $data) {
      message
      result
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const APPROVE_MEMBER = gql(/* GraphQL */ `
  mutation approveMember($data: IDInput!) {
    approveMember(data: $data) {
      message
      result
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const SEND_WELCOME_EMAIL = gql(/* GraphQL */ `
  mutation sendWelcomeEmail($data: EmailInput!) {
    sendWelcomeEmail(data: $data) {
      message
      result
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const MOVE_TO_GRAVEYARD = gql(/* GraphQL */ `
  mutation moveToGraveyard($data: IDInput!) {
    moveToGraveyard(data: $data) {
      message
      result
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const MOVE_TO_PENDING = gql(/* GraphQL */ `
  mutation MoveToPending($data: IDInput!) {
    moveToPending(data: $data) {
      result
      message
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const VERIFY_MEMBER_EMAIL = gql(/* GraphQL */ `
  mutation verifyMemberEmail($data: IDInput!) {
    verifyMemberEmail(data: $data) {
      message
      result
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);
