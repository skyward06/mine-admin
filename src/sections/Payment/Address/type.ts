import type { PaymentChain, PaymentToken } from 'src/__generated__/graphql';

export type Address = {
  __typename?: 'Address';
  address: string;
  balance: number;
  isUsed: boolean;
  chain: PaymentChain;
  balances?:
    | {
        __typename?: 'Balance';
        address: string;
        balance: number;
        chain: PaymentChain;
        token: PaymentToken;
      }[]
    | null;
};
