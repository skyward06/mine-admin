import type { Package } from 'src/sections/Products/List/type';

export type GroupSettingCommissionBonus = {
  __typename?: 'GroupSettingCommissionBonus';
  lPoint: number;
  rPoint: number;
  commission: number;
  createdAt?: any | null;
  updatedAt?: any | null;
  deletedAt?: any | null;
};

export type GroupSetting = {
  __typename?: 'GroupSetting';
  id: string;
  name: string;
  limitDate: any;
  sponsorBonusPackageId: string;
  sponsorBonusPackage?: Package;
  groupSettingCommissionBonuses: Array<GroupSettingCommissionBonus>;
  createdAt?: any | null;
  updatedAt?: any | null;
  deletedAt?: any | null;
};
