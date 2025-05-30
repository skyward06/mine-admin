import type { Order, PaymentChain, PaymentToken } from 'src/__generated__/graphql';

export type Transaction = {
  __typename?: 'Transaction';
  hash: string;
  chain: PaymentChain;
  createdAt?: any | null;
  tokenType: PaymentToken;
  order?: Order | null;
};
