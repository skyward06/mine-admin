// ----------------------------------------------------------------------

export type ProofRole = 'all' | 'inactive';

export type IProofTableFilters = {
  search: string;
  status: ProofRole;
};

export type IProofPrismaFilter = {
  OR?: any;
  status?: any;
};
