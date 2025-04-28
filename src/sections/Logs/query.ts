import { gql } from 'src/__generated__/gql';

export const FETCH_LOG_QUERY = gql(/* GraphQL */ `
  query Logs(
    $size: Int!
    $start: Int!
    $who: String
    $role: String
    $action: String
    $entity: String
    $status: String
    $targetId: String
    $afterWhen: DateTime
    $beforeWhen: DateTime
  ) {
    logs(
      who: $who
      role: $role
      size: $size
      start: $start
      action: $action
      entity: $entity
      status: $status
      targetId: $targetId
      afterWhen: $afterWhen
      beforeWhen: $beforeWhen
    ) {
      logs {
        id
        who
        role
        when
        after
        before
        action
        entity
        status
      }
      total
    }
  }
`);
