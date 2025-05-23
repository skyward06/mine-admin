import type { ConfirmationStatus, CommissionDefaultEnum } from 'src/__generated__/graphql';

import type { PFile } from '../Proof/List/type';

export type WeeklyCommission = {
  __typename?: 'BasicWeeklyCommission';
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
  cash: number;
  email: string;
  memberId: string;
  username: string;
  fullName: string;
  commission: number;
  qualified: boolean;
  weekStartDate: any;
  note?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  deletedAt?: any | null;
  isTexitRanger: boolean;
  shortNote?: string | null;
  status: ConfirmationStatus;
  paymentMethod: CommissionDefaultEnum;
  invoice?: {
    __typename?: 'Invoice';
    id: string;
    proof?: {
      __typename?: 'Proof';
      files?: Array<PFile> | null;
    } | null;
  } | null;
};
