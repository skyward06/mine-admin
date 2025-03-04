import type { FrontActionEnum, FrontActionExtra } from 'src/__generated__/graphql';

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
  sale: number;
  role: number;
  // proof: RoleEnum;
  // member: RoleEnum;
  // balance: RoleEnum;
  // additions: RoleEnum;
  commission: number;
  description: string;
  createdAt?: any | null;
  updatedAt?: any | null;
  deletedAt?: any | null;
  frontActions?: Array<FrontAction> | null;
};
