import { gql } from 'src/__generated__';

export const FETCH_BALANCES = gql(/* GraphQL */ `
  query Balances($sort: String, $page: String, $filter: JSONObject) {
    balances(sort: $sort, page: $page, filter: $filter) {
      balances {
        id
        date
        type
        note
        memberId
        amountInCents
        member {
          id
          email
          point
          mobile
          status
          balance
          username
          fullName
          groupName
          allowState
          teamReport
          teamStrategy
          syncWithSendy
          emailVerified
          primaryAddress
          totalIntroducers
          placementPosition
          cmnCalculatedWeeks
        }
        extra1
        extra2
      }
      total
    }
  }
`);

export const CREATE_BALANCE = gql(/* GraphQL */ `
  mutation AddBalance($data: AddBalanceInput!) {
    addBalance(data: $data) {
      id
    }
  }
`);
