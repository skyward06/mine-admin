import type { PaymentType, OrderStatus } from 'src/__generated__/graphql';

export type Order = {
  __typename?: 'Order';
  id: number;
  status: OrderStatus;
  signUpOrder: boolean;
  createdAt?: any | null;
  member?: {
    __typename?: 'Member';
    id: string;
    username: string;
    fullName: string;
  } | null;
  package?: {
    __typename?: 'Package';
    productName: string;
  } | null;
  waitAddress?: {
    __typename?: 'WaitAddress';
    type: PaymentType;
    address: string;
    totalBalance: number;
    receivedBalance: number;
  } | null;
};
