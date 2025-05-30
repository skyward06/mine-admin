import type {
  OrderStatus,
  PaymentChain,
  PaymentToken,
  OrderRequestType,
} from 'src/__generated__/graphql';

export type BasicOrder = {
  __typename?: 'BasicOrder';
  id: string;
  ID: number;
  expiredAt: any;
  fullName: string;
  memberId: string;
  usdBalance: number;
  paidBalance: number;
  paidAt?: any | null;
  status: OrderStatus;
  createdAt?: any | null;
  completedAt?: any | null;
  requestType: OrderRequestType;
  paymentAddress?: string | null;
  requiredBalance?: number | null;
  paymentChain?: PaymentChain | null;
  paymentToken?: PaymentToken | null;
};

export type Order = {
  __typename?: 'Order';
  id: string;
  ID: number;
  expiredAt: any;
  usdBalance: number;
  paidBalance: number;
  requiredBalance?: number | null;
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
