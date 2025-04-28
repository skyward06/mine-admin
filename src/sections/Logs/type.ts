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
