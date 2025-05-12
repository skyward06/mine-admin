export type MemberInOutRevenue = {
  __typename?: 'MemberInOutRevenue';
  id: string;
  amount: number;
  percent?: number | null;
  username: string;
  fullName: string;
  commission: number;
  cashCommissionPotential: number;
};

export type WdmsvegasContestWinner = {
  __typename?: 'WDMSVEGASContestWinner';
  level: number;
  points: number;
  fullName: string;
  username: string;
  sponsored: number;
};

export type SpecialReport = {
  title: string;
  link: string;
};

export type OnepointAwayMembers = {
  __typename?: 'ReportMember';
  id: string;
  ID: number;
  email: string;
  mobile: string;
  createdAt: any;
  fullName: string;
  username: string;
  assetId?: string | null;
  totalIntroducers: number;
};
