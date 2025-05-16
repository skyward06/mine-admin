import { OrderStatus } from 'src/__generated__/graphql';

export const parseType = (transactionStatus: OrderStatus): string => {
  switch (transactionStatus) {
    case OrderStatus.New:
      return 'New';
    case OrderStatus.Paid:
      return 'Paid';
    case OrderStatus.Pending:
      return 'Pending';
    case OrderStatus.Expired:
      return 'Expired';
    case OrderStatus.Canceled:
      return 'Failed';
    case OrderStatus.Completed:
      return 'Completed';
    default:
      return transactionStatus;
  }
};
