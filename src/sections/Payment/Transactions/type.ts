import type { PaymentType, WaitTransactionStatus } from 'src/__generated__/graphql';

export type Transaction = {
  __typename?: 'Transaction';
  to: string;
  from: string;
  hash: string;
  type: PaymentType;
  balance: number;
  createdAt?: any | null;
  waitAddress?: {
    __typename?: 'WaitAddress';
    address: string;
    receivedAt?: any | null;
    initBalance: number;
    totalBalance: number;
    initUnitPrice: number;
    receivedBalance: number;
    status: WaitTransactionStatus;
  } | null;
};
