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
        rollSponsorBonusPackageId
        groupSettingCommissionBonuses {
          lPoint
          rPoint
          commission
        }
        sponsorBonusPackage {
          id
          ID
          date
          token
          point
          amount
          status
          freeShare
          productName
          enrollVisibility
        }
      }
      total
    }
  }
`);

export const CREATE_GROUP_SETTINGS = gql(/* GraphQL */ `
  mutation createGroupSetting($data: CreateGroupSettingInput!) {
    createGroupSetting(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const UPDATE_GROUP_SETTINGS = gql(/* GraphQL */ `
  mutation updateGroupSetting($data: UpdateGroupSettingInput!) {
    updateGroupSetting(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const REMOVE_GROUP_SETTINGS = gql(/* GraphQL */ `
  mutation removeGroupSetting($data: IDInput!) {
    removeGroupSetting(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);
