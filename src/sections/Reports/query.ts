import { gql } from 'src/__generated__/gql';

export const FETCH_ONEPOINT_AWAY_MEMBERS_QUERY = gql(/* GraphQL */ `
  query FetchOnepointAwayMembers($page: String, $sort: String) {
    onepointAwayMembers(page: $page, sort: $sort) {
      members {
        id
        username
        fullName
        email
        assetId
        mobile
        totalIntroducers
        createdAt
        updatedAt
        deletedAt
      }
      total
    }
  }
`);
