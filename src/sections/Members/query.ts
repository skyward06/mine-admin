import { gql } from 'src/__generated__/gql';

export const FETCH_MEMBER_STATS_QUERY = gql(/* GraphQL */ `
  query FetchMemberStats($inactiveFilter: JSONObject) {
    all: members {
      total
    }
    inactive: members(filter: $inactiveFilter) {
      total
    }
  }
`);

export const FETCH_MEMBERS_QUERY = gql(/* GraphQL */ `
  query FetchMembers($page: String, $filter: JSONObject, $sort: String) {
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
        payoutId
        sponsorId
        sponsor {
          id
          username
          fullName
          email
          primaryAddress
          secondaryAddress
          mobile
          wallet
          assetId
          payoutId
        }
        payout {
          id
          name
          status
          method
          display
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
        wallet
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
      wallet
      payoutId
    }
  }
`);

export const FETCH_MEMBER = gql(/* GraphQL */ `
  query FetchMember($filter: JSONObject) {
    members(filter: $filter) {
      members {
        id
        username
        fullName
        email
        mobile
        primaryAddress
        secondaryAddress
        assetId
        wallet
        payoutId
        sponsorId
        payout {
          id
          name
          status
          method
          display
        }
        sponsor {
          id
          username
          fullName
          email
          primaryAddress
          secondaryAddress
          mobile
          wallet
          assetId
          payoutId
        }
        deletedAt
      }
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
      payout {
        method
        display
      }
      wallet
      assetId
    }
  }
`);

export const FETCH_MEMBER_HISTORY = gql(/* GraphQL */ `
  query MemberOverview($data: MemberOverviewInput!) {
    memberOverview(data: $data) {
      lastHashPower
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
