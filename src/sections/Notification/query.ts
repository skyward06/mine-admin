import { gql } from 'src/__generated__';

export const FETCH_NOTIFICATION_QUERY = gql(/* GraphQL */ `
  query Notifications($sort: String, $page: String, $filter: JSONObject) {
    notifications(sort: $sort, page: $page, filter: $filter) {
      notifications {
        id
        read
        level
        message
        createdAt
        updatedAt
      }
      total
    }
  }
`);

export const SET_READ_NOTIFICATIONS = gql(/* GraphQL */ `
  mutation setReadNotification($data: IDInput!) {
    setReadNotification(data: $data) {
      message
      result
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const READ_ALL_NOTIFICATIONS = gql(/* GraphQL */ `
  mutation setReadAllNotifications {
    setReadAllNotifications {
      count
    }
  }
`);

export const SUBSCRIPTION_NOTIFICATION = gql(/* GraphQL */ `
  subscription NewNotification {
    newNotification {
      id
      level
      message
      createdAt
      updatedAt
    }
  }
`);
