import { gql } from '@apollo/client';
import { createFragmentRegistry } from '@apollo/client/cache';

export const fragment = {
  fragments: createFragmentRegistry(gql`
    fragment FrontActionFields on FrontAction {
      action
      message
      extra {
        ... on FrontActionCreate12FreeBonusSale {
          username
          fullName
          memberId
          packageId
          sponsorCnt
          packageName
          paymentMethod
          isWithinSponsorRollDuration
        }
        ... on FrontActionUpdate12FreeBonusSale {
          id
          oldPackageId
          newPackageId
          newPackageName
          status
        }
        ... on FrontActionRemove12FreeBonusSale {
          id
        }
      }
    }
    fragment PayoutFields on Payout {
      id
      method
      display
      name
      status
      createdAt
      updatedAt
      deletedAt
    }
    fragment PackageFields on Package {
      id
      date
      token
      point
      amount
      status
      freeShare
      productName
      enrollVisibility
    }
  `),
};
