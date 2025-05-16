import type { PaymentChain } from 'src/__generated__/graphql';

export type CollectAddress = {
  __typename?: 'CollectAddress';
  id: string;
  address: string;
  weekStartDate: any;
  chain: PaymentChain;
};
