// ----------------------------------------------------------------------

export type CommissionRole = 'all';

export type ICommissionTableFilters = {
  search: string;
  status: CommissionRole;
};

export type ICommissionPrismaFilter = {
  OR?: any;
  status?: any;
  commission?: any;
  weekStartDate?: any;
};
