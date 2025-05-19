import { OrderStatus } from 'src/__generated__/graphql';

export const parseType = (orderStatus: OrderStatus): string => {
  switch (orderStatus) {
    case OrderStatus.New:
      return 'New';
    case OrderStatus.Paid:
      return 'Paid';
    case OrderStatus.Pending:
      return 'Pending';
    case OrderStatus.Expired:
      return 'Expired';
    case OrderStatus.Canceled:
      return 'Canceled';
    case OrderStatus.Completed:
      return 'Completed';
    default:
      return orderStatus;
  }
};
