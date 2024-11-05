// ----------------------------------------------------------------------

export type MemberRole = 'all' | 'pending' | 'inactive';

export type IMemberTableFilters = {
  search: string;
  status: MemberRole;
};

export type IMemberPrismaFilter = {
  OR?: any;
  sponsorId?: any;
  status?: boolean;
  emailVerified?: boolean;
  deletedAt?: any;
};
