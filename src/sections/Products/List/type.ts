import type { Sale } from 'src/sections/Sales/List/type';

export type Package = {
  __typename?: 'Package';
  id: string;
  point: number;
  token: number;
  amount: number;
  productName: string;
  enrollVisibility: boolean;
  status: boolean;
  sales?: Array<Sale> | null;
  date: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  deletedAt?: any | null;
};
