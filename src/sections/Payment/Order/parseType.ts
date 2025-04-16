import { OrderStatus } from 'src/__generated__/graphql';

export const parseType = (orderStatus: OrderStatus): string => {
  switch (orderStatus) {
    case OrderStatus.Success:
      return 'Success';
    case OrderStatus.Pending:
      return 'Pending';
    case OrderStatus.Canceled:
      return 'Canceled';
    case OrderStatus.Failed:
      return 'Failed';
    default:
      return orderStatus;
  }
};
