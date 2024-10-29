// ----------------------------------------------------------------------

export type INoteTableFilters = {
  search: string;
};

export type INotePrismaFilter = {
  OR?: any;
  status?: any;
  memberId?: string;
};
