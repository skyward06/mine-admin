import { OrderStatus, OrderRequestType } from 'src/__generated__/graphql';

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

export const orderType = (requestType: OrderRequestType): string => {
  switch (requestType) {
    case OrderRequestType.AddHash:
      return 'Add Hash';
    case OrderRequestType.AddMember:
      return 'Add Miner';
    case OrderRequestType.Signup:
      return 'Signup';
    default:
      return requestType;
  }
};
