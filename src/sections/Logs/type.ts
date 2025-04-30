export type EntityLog = {
  __typename?: 'EntityLog';
  when: any;
  id: string;
  who: string;
  role: string;
  action: string;
  entity: string;
  status: string;
  after?: any | null;
  before?: any | null;
};

export type LogFilterType = {
  to?: string;
  who?: string;
  from?: string;
  role?: string;
  action?: string;
  status?: string;
};
