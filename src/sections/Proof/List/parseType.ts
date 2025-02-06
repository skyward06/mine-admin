import { ProofType } from 'src/__generated__/graphql';

export const parseType = (proofType: ProofType): string => {
  switch (proofType) {
    case ProofType.Administrationsalary:
      return 'Administration Salary';
    case ProofType.Commission:
      return 'Commission';
    case ProofType.Developersapps:
      return 'Developers Apps';
    case ProofType.Developersintegrations:
      return 'Developers Integrations';
    case ProofType.Developersprotocol:
      return 'Developers Protocol';
    case ProofType.Developersweb:
      return 'Developers Web';
    case ProofType.Exchangefee:
      return 'Exchange Fee';
    case ProofType.Infrastructure:
      return 'Infrastructure';
    case ProofType.Marketingminetxcpromotion:
      return 'Marketing MineTXC Promotion';
    case ProofType.Marketingtxcpromotion:
      return 'Marketing TXC Promotion';
    case ProofType.Mineelectricity:
      return 'Mine Electricity';
    case ProofType.Minefacilityrentmortage:
      return 'Mine Facility Rent Mortage';
    case ProofType.Minemaintainance:
      return 'Mine maintainance';
    case ProofType.Minenewequipment:
      return 'Mine New Equipment';
    case ProofType.Overhead:
      return 'Overhead';
    case ProofType.Profit:
      return 'Profit';
    case ProofType.Promotion:
      return 'Promotion';
    case ProofType.Sale:
      return 'Sale';
    case ProofType.Transactionprocessing:
      return 'Transaction Processing';
    default:
      return proofType;
  }
};
