import type { NotificationLevel } from 'src/__generated__/graphql';

import type { Member } from '../Members/List/type';

export type NotificationClient = {
  __typename?: 'NotificationClient';
  id: string;
  read: boolean;
  message: string;
  readMembers: number;
  totalMembers: number;
  members: Array<Member>;
  level: NotificationLevel;
  createdAt?: any | null;
  updatedAt?: any | null;
  deletedAt?: any | null;
};
