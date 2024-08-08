// ----------------------------------------------------------------------

export type ProductRole = 'all' | 'inactive';

export type IProductTableFilters = {
  search: string;
  status: ProductRole;
};

export type IProductPrismaFilter = {
  OR?: any;
  status?: any;
};
