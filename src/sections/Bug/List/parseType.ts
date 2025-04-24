import { BugReportStatus } from 'src/__generated__/graphql';

export const parseType = (proofType: BugReportStatus): string => {
  switch (proofType) {
    case BugReportStatus.Backlog:
      return 'Backlog';
    case BugReportStatus.Done:
      return 'Done';
    case BugReportStatus.Wip:
      return 'Work In Progress';
    default:
      return proofType;
  }
};
