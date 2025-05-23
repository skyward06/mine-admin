import { CommissionDefaultEnum } from 'src/__generated__/graphql';

export const parseType = (orderStatus: CommissionDefaultEnum): string => {
  switch (orderStatus) {
    case CommissionDefaultEnum.Usdc:
      return 'USDC';
    case CommissionDefaultEnum.Hash:
      return 'HASH';
    case CommissionDefaultEnum.Txc:
      return 'TXC';
    default:
      return orderStatus;
  }
};
