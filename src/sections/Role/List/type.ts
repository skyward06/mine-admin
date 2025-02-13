import type { RoleEnum, FrontActionEnum, FrontActionExtra } from 'src/__generated__/graphql';

export type FrontAction = {
  __typename?: 'FrontAction';
  message: string;
  action: FrontActionEnum;
  extra?: FrontActionExtra | null;
};

export type Role = {
  __typename?: 'Role';
  id: string;
  name: string;
  sale: RoleEnum;
  proof: RoleEnum;
  member: RoleEnum;
  balance: RoleEnum;
  additions: RoleEnum;
  description: string;
  commission: RoleEnum;
  frontActions?: Array<FrontAction> | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  deletedAt?: any | null;
};
