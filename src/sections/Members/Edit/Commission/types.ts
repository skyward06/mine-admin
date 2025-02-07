// ----------------------------------------------------------------------

export type CommissionRole = 'pending' | 'approved' | 'declined';

export type ICommissionTableFilters = {
  search: string;
  status: CommissionRole;
};

export type ICommissionPrismaFilter = {
  OR?: any;
  status?: any;
  commission?: any;
  memberId?: any;
  weekStartDate?: any;
};
