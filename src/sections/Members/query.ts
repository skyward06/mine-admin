import { gql } from 'src/__generated__/gql';

export const FETCH_MEMBER_STATS_QUERY = gql(/* GraphQL */ `
  query FetchMemberStats($pendingFilter: JSONObject, $inactiveFilter: JSONObject) {
    all: members {
      total
    }
    pending: members(filter: $pendingFilter) {
      total
    }
    inactive: members(filter: $inactiveFilter) {
      total
    }
  }
`);

export const FETCH_MEMBERS_QUERY = gql(/* GraphQL */ `
  query FetchMembers($page: String, $filter: JSONObject, $sort: String, $logsize: Float) {
    members(page: $page, filter: $filter, sort: $sort) {
      members {
        id
        username
        fullName
        email
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
        emailVerified
        totalIntroducers
        syncWithSendy
        preferredContact
        preferredContactDetail
        sponsor {
          id
          username
          fullName
          email
          point
          primaryAddress
          secondaryAddress
          mobile
          assetId
          status
          emailVerified
          totalIntroducers
          syncWithSendy
          preferredContact
          preferredContactDetail
        }
        placementParentId
        placementPosition
        placementParent {
          id
          username
          fullName
          email
          point
          primaryAddress
          secondaryAddress
          mobile
          assetId
          status
          emailVerified
          totalIntroducers
          syncWithSendy
          preferredContact
          preferredContactDetail
        }
        sales {
          id
          invoiceNo
          memberId
          packageId
          paymentMethod
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
  query MemberOverview($data: MemberOverviewInput!) {
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
