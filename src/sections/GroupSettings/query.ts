import { gql } from 'src/__generated__';

export const FETCH_GROUP_SETTINGS = gql(/* GraphQL */ `
  query GroupSettings($sort: String, $page: String, $filter: JSONObject) {
    groupSettings(sort: $sort, page: $page, filter: $filter) {
      groupSettings {
        createdAt
        id
        name
        limitDate
        sponsorBonusPackageId
        groupSettingCommissionBonuses {
          lPoint
          rPoint
          commission
        }
      }
      total
    }
  }
`);
