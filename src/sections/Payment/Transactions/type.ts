import type { Order, PaymentChain, PaymentToken } from 'src/__generated__/graphql';

export type Transaction = {
  __typename?: 'Transaction';
  to: string;
  from: string;
  hash: string;
  balance: number;
  chain: PaymentChain;
  createdAt?: any | null;
  tokenType: PaymentToken;
  order?: Order | null;
};
