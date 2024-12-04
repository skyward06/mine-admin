import type { Proof } from 'src/sections/Proof/List/type';
import type { Member } from 'src/sections/Members/List/type';
import type { Package } from 'src/sections/Products/List/type';
import type { StatisticsSale } from 'src/sections/Statistics/type';

export type Sale = {
  __typename?: 'Sale';
  id: string;
  ID: number;
  memberId: string;
  packageId: string;
  paymentMethod: string;
  proof?: Proof | null;
  member?: Member | null;
  package?: Package | null;
  statisticsSales?: Array<StatisticsSale> | null;
  status: boolean;
  orderedAt: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  deletedAt?: any | null;
};
