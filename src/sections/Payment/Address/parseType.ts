import { PaymentToken } from 'src/__generated__/graphql';

export const parseType = (chainType: PaymentToken): string => {
  switch (chainType) {
    case PaymentToken.Eth:
      return 'Ethereum';
    case PaymentToken.Pyusd:
      return 'PYUSD';
    case PaymentToken.Usdc:
      return 'USDC';
    case PaymentToken.Usdt:
      return 'USDT';
    default:
      return chainType;
  }
};
