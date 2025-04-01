import type { ConfirmationStatus, CommissionDefaultEnum } from 'src/__generated__/graphql';

import type { Proof } from '../Proof/List/type';

export type WeeklyCommission = {
  __typename?: 'WeeklyCommission';
  ID: number;
  id: string;
  begL: number;
  begR: number;
  endL: number;
  endR: number;
  maxL: number;
  maxR: number;
  newL: number;
  newR: number;
  pkgL: number;
  pkgR: number;
  memberId: string;
  commission: number;
  weekStartDate: any;
  proof?: Proof | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  deletedAt?: any | null;
  shortNote?: string | null;
  status: ConfirmationStatus;
  member?: {
    __typename?: 'Member';
    id: string;
    username: string;
    fullName: string;
    updatedAt?: any | null;
    commissionDefault: CommissionDefaultEnum;
  } | null;
};
