import type { Proof } from 'src/sections/Proof/List/type';
import type { InvoiceStatusEnum } from 'src/__generated__/graphql';

export type Invoice = {
  __typename?: 'Invoice';
  id: string;
  ID: number;
  name: string;
  dueDate: any;
  description: string;
  proof?: Proof | null;
  member?: {
    __typename?: 'Member';
    peerETHAddress?: string | null;
  } | null;
  amountInCents: number;
  status: InvoiceStatusEnum;
  createdAt?: any | null;
  updatedAt?: any | null;
  deletedAt?: any | null;
};
