import type { PaymentType } from 'src/__generated__/graphql';

export type Address = {
  __typename?: 'Address';
  type: PaymentType;
  address: string;
  balance: number;
};
