export type ShareAccount = {
  __typename?: 'ShareAccount';
  id: string;
  note?: string | null;
  createdAt?: any | null;
  cashPotential?: number | null;
  isTexitRanger?: boolean | null;
  members?:
    | {
        __typename?: 'BasicMemberInfo';
        id: string;
        username: string;
        fullName: string;
      }[]
    | null;
};
