import type { PFile, BugReportStatus } from 'src/__generated__/graphql';

export type BugReport = {
  __typename?: 'BugReport';
  id: string;
  subject: string;
  who?: string | null;
  description: string;
  contact?: string | null;
  status: BugReportStatus;
  files?: Array<PFile> | null;
  solvedBy?: {
    __typename?: 'Admin';
    username: string;
    fullName: string;
  } | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  deletedAt?: any | null;
};
