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

export const FETCH_SPONSOR_TEMP = gql(/* GraphQL */ `
  query SponsorMembers {
    sponsorMembers {
      id
      username
      fullName
      sponsorId
      createdAt
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
