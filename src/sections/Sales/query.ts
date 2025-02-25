import { gql } from 'src/__generated__/gql';

export const FETCH_SALES_QUERY = gql(/* GraphQL */ `
  query Sales($sort: String, $page: String, $filter: JSONObject) {
    sales(sort: $sort, page: $page, filter: $filter) {
      sales {
        id
        ID
        email
        token
        point
        amount
        status
        isMetal
        toEmail
        assetId
        memberId
        username
        fullName
        orderedAt
        createdAt
        sponsorCnt
        toMemberId
        toUsername
        toFullName
        productName
        paymentMethod
      }
      total
    }
  }
`);

export const FETCH_SALE_BY_Id = gql(/* GraphQL */ `
  query SaleById($data: IDInput!) {
    saleById(data: $data) {
      id
      ID
      status
      isMetal
      memberId
      orderedAt
      packageId
      createdAt
      updatedAt
      deletedAt
      sponsorCnt
      toMemberId
      paymentMethod
      statisticsSales {
        id
        saleId
        issuedAt
        statisticsId
      }
      package {
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
      proof {
        id
        note
        type
        refId
        amount
        orderedAt
        files {
          id
          url
          size
          mimeType
          originalName
        }
        reflinks {
          link
          linkType
        }
      }
      member {
        id
        ID
        email
        point
        mobile
        status
        assetId
        balance
        username
        fullName
        groupName
        createdAt
        allowState
        teamReport
        OTPEnabled
        teamStrategy
        syncWithSendy
        emailVerified
        primaryAddress
        secondaryAddress
        totalIntroducers
        preferredContact
        placementPosition
        commissionDefault
        cmnCalculatedWeeks
        preferredContactDetail
        commission {
          begL
          begR
          newL
          newR
        }
      }
      toMember {
        id
        ID
        email
        point
        mobile
        status
        assetId
        balance
        username
        fullName
        groupName
        createdAt
        allowState
        teamReport
        OTPEnabled
        teamStrategy
        syncWithSendy
        emailVerified
        primaryAddress
        secondaryAddress
        totalIntroducers
        preferredContact
        placementPosition
        commissionDefault
        cmnCalculatedWeeks
        preferredContactDetail
        commission {
          begL
          begR
          newL
          newR
        }
      }
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const FETCH_SALE_BY_ID = gql(/* GraphQL */ `
  query SaleBySID($data: IDNInput!) {
    saleBySID(data: $data) {
      id
      ID
      status
      isMetal
      memberId
      orderedAt
      packageId
      createdAt
      updatedAt
      deletedAt
      sponsorCnt
      toMemberId
      paymentMethod
      statisticsSales {
        id
        saleId
        issuedAt
        statisticsId
      }
      package {
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
      proof {
        id
        note
        type
        refId
        amount
        orderedAt
        files {
          id
          url
          size
          mimeType
          originalName
        }
        reflinks {
          link
          linkType
        }
      }
      member {
        id
        ID
        email
        point
        mobile
        status
        assetId
        balance
        username
        fullName
        groupName
        createdAt
        allowState
        teamReport
        OTPEnabled
        teamStrategy
        syncWithSendy
        emailVerified
        primaryAddress
        secondaryAddress
        totalIntroducers
        preferredContact
        placementPosition
        commissionDefault
        cmnCalculatedWeeks
        preferredContactDetail
        commission {
          begL
          begR
          newL
          newR
        }
      }
      toMember {
        id
        ID
        email
        point
        mobile
        status
        assetId
        balance
        username
        fullName
        groupName
        createdAt
        allowState
        teamReport
        OTPEnabled
        teamStrategy
        syncWithSendy
        emailVerified
        primaryAddress
        secondaryAddress
        totalIntroducers
        preferredContact
        placementPosition
        commissionDefault
        cmnCalculatedWeeks
        preferredContactDetail
        commission {
          begL
          begR
          newL
          newR
        }
      }
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const FETCH_SALES_STATS_QUERY = gql(/* GraphQL */ `
  query FetchSaleStats($allFilter: JSONObject, $inactiveFilter: JSONObject) {
    all: sales(filter: $allFilter) {
      total
    }
    inactive: sales(filter: $inactiveFilter) {
      total
    }
  }
`);

export const CREATE_SALE = gql(/* GraphQL */ `
  mutation createSale($data: CreateSaleInput!) {
    createSale(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const UPDATE_SALE = gql(/* GraphQL */ `
  mutation updateSale($data: UpdateSaleInput!) {
    updateSale(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const REMOVE_SALE = gql(/* GraphQL */ `
  mutation removeSale($data: IDInput!) {
    removeSale(data: $data) {
      result
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);
