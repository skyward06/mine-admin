import type { PFile } from '../Proof/List/type';

export type WeeklyReport = {
  __typename?: 'WeeklyReport';
  id: string;
  file: PFile;
  fileId: string;
  weekStartDate: any;
  createdAt?: any | null;
  updatedAt?: any | null;
  deletedAt?: any | null;
};
