// ----------------------------------------------------------------------

export type MemberRole = 'approved' | 'pending' | 'graveyard';
export type AllowState = 'PENDING' | 'GRAVEYARD' | 'APPROVED' | 'PAID' | 'BLOCKED';

export type IMemberTableFilters = {
  search: string;
  status?: MemberRole;
  allowState?: AllowState;
};

export type IMemberPrismaFilter = {
  OR?: any;
  sponsorId?: any;
  status?: boolean;
  allowState?: AllowState;
  emailVerified?: boolean;
  deletedAt?: any;
};
