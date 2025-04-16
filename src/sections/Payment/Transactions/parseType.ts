import { WaitTransactionStatus } from 'src/__generated__/graphql';

export const parseType = (transactionStatus: WaitTransactionStatus): string => {
  switch (transactionStatus) {
    case WaitTransactionStatus.Wait:
      return 'Wait';
    case WaitTransactionStatus.Received:
      return 'Received';
    case WaitTransactionStatus.Failed:
      return 'Failed';
    default:
      return transactionStatus;
  }
};
