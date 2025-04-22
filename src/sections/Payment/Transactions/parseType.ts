import { WaitTransactionStatus } from 'src/__generated__/graphql';

export const parseType = (transactionStatus: WaitTransactionStatus): string => {
  switch (transactionStatus) {
    case WaitTransactionStatus.Wait:
      return 'Wait';
    case WaitTransactionStatus.Expired:
      return 'Expired';
    case WaitTransactionStatus.Received:
      return 'Received';
    case WaitTransactionStatus.Canceled:
      return 'Failed';
    default:
      return transactionStatus;
  }
};
