import { ChainType } from 'src/__generated__/graphql';

export const parseType = (chainType: ChainType): string => {
  switch (chainType) {
    case ChainType.Eth:
      return 'Ethereum';
    case ChainType.Txc:
      return 'Texitcoin';
    default:
      return chainType;
  }
};
