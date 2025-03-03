import type {
  TeamReport,
  MemberState,
  TeamStrategy,
  PlacementPosition,
  CommissionDefaultEnum,
} from 'src/__generated__/graphql';

import type { PFile } from '../Proof/List/type';

export type WeeklyReport = {
  __typename?: 'WeeklyReport';
  id: string;
  file: PFile;
  fileId: string;
  weekStartDate: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  deletedAt?: any | null;
};

export type Sponsor = {
  __typename?: 'Member';
  id: string;
  ID?: number | null;
  email: string;
  point: number;
  avatar: string;
  mobile: string;
  status: boolean;
  balance: number;
  username: string;
  fullName: string;
  groupName: string;
  allowState: MemberState;
  teamReport: Array<TeamReport>;
  OTPEnabled: boolean;
  teamStrategy: TeamStrategy;
  syncWithSendy: boolean;
  emailVerified: boolean;
  primaryAddress: string;
  weekIntroducers?: number | null;
  totalIntroducers: number;
  placementPosition: PlacementPosition;
  commissionDefault: CommissionDefaultEnum;
  cmnCalculatedWeeks: number;
};
