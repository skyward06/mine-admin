import { gql } from 'src/__generated__/gql';

export const REMOVE_MEMBER_FROM_PLACEMENT_TREE = gql(/* GraphQL */ `
  mutation RemoveMemberFromPlacementTree($data: IDInput!) {
    removeMemberFromPlacementTree(data: $data) {
      frontActions {
        ...FrontActionFields
      }
      message
      result
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
        allowState
        teamReport
        OTPEnabled
        teamStrategy
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

export const FETCH_PLACEMENT_MEMBERS_O_QUERY = gql(/* GraphQL */ `
  query PlacementMembers {
    placementMembers {
      id
      username
      fullName
      createdAt
      commission {
        begL
        begR
        newL
        newR
      }
      placementPosition
      placementParentId
      cmnCalculatedWeeks
      teamStrategy
    }
  }
`);

export const FETCH_PLACEMENT_MEMBERS_WEEK = gql(/* GraphQL */ `
  query PlacementMembersForWeek($data: WeekStartDateInput!) {
    placementMembersForWeek(data: $data) {
      id
      maxL
      maxR
      pkgL
      pkgR
      username
      fullName
      createdAt
      commission
      placementPosition
      placementParentId
    }
  }
`);
