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
        sponsorBonusPackage {
          id
          date
          status
          enrollVisibility
          token
          point
          amount
          freeShare
          productName
        }
      }
      total
    }
  }
`);

export const CREATE_GROUP_SETTINGS = gql(/* GraphQL */ `
  mutation CreateGroupSetting($data: CreateGroupSettingInput!) {
    createGroupSetting(data: $data) {
      id
    }
  }
`);

export const UPDATE_GROUP_SETTINGS = gql(/* GraphQL */ `
  mutation UpdateGroupSetting($data: UpdateGroupSettingInput!) {
    updateGroupSetting(data: $data) {
      id
    }
  }
`);

export const REMOVE_GROUP_SETTINGS = gql(/* GraphQL */ `
  mutation RemoveGroupSetting($data: IDInput!) {
    removeGroupSetting(data: $data) {
      id
    }
  }
`);
