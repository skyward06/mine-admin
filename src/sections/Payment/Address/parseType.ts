import { PaymentType } from 'src/__generated__/graphql';

export const parseType = (chainType: PaymentType): string => {
  switch (chainType) {
    // case PaymentType.Eth:
    //   return 'Ethereum';
    case PaymentType.Txc:
      return 'Texitcoin';
    case PaymentType.Usdc:
      return 'USDC';
    case PaymentType.Usdt:
      return 'USDT';
    default:
      return chainType;
  }
};
