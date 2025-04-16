import type { ChainType } from 'src/__generated__/graphql';

export type Address = {
  __typename?: 'Address';
  type: ChainType;
  address: string;
  balance: number;
};
