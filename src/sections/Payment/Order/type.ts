import type { OrderStatus, PaymentChain, PaymentToken } from 'src/__generated__/graphql';

export type Order = {
  __typename?: 'Order';
  id: string;
  ID: number;
  usdBalance: number;
  paidBalance: number;
  expiredAt: any;
  paidAt?: any | null;
  status: OrderStatus;
  createdAt?: any | null;
  completedAt?: any | null;
  paymentAddress?: string | null;
  paymentChain?: PaymentChain | null;
  paymentToken?: PaymentToken | null;
  member?: {
    __typename?: 'Member';
    id: string;
    username: string;
    fullName: string;
    assetId?: string | null;
  } | null;
  transactions?:
    | {
        __typename?: 'Transaction';
        to: string;
        from: string;
        hash: string;
        balance: number;
        tokenType: PaymentToken;
      }[]
    | null;
};
