import { gql } from 'src/__generated__/gql';

export const FETCH_MEMBERS = gql(/* GraphQL */ `
  query Members($filter: JSONObject) {
    members(filter: $filter) {
      members {
        email
        username
      }
    }
  }
`);

export const FETCH_MEMBER_LIST_QUERY = gql(/* GraphQL */ `
  query Memberlists($sort: String, $page: String, $filter: JSONObject) {
    memberlists(sort: $sort, page: $page, filter: $filter) {
      memberLists {
        id
        name
        emails
        members {
          id
          email
          mobile
          username
          fullName
        }
      }
      total
    }
  }
`);

export const FETCH_MEMBER_LIST_BY_ID = gql(/* GraphQL */ `
  query MemberListById($data: IDInput!) {
    memberListById(data: $data) {
      id
      name
      emails
      members {
        id
        email
        mobile
        username
        fullName
      }
    }
  }
`);

export const FETCH_EMAIL_TEMPLATES = gql(/* GraphQL */ `
  query EmailTemplates($sort: String, $page: String, $filter: JSONObject) {
    emailTemplates(sort: $sort, page: $page, filter: $filter) {
      templates {
        id
        body
        subject
        description
      }
      total
    }
  }
`);

export const FETCH_EMAIL_TEMPLATE_BY_ID = gql(/* GraphQL */ `
  query EmailTemplateById($data: IDInput!) {
    emailTemplateById(data: $data) {
      id
      body
      subject
      createdAt
      description
    }
  }
`);

export const FETCH_CAMPAIGN_QUERY = gql(/* GraphQL */ `
  query Campaigns($sort: String, $page: String, $filter: JSONObject) {
    campaigns(sort: $sort, page: $page, filter: $filter) {
      campaigns {
        id
        body
        subject
        listType
        listExtra
      }
      total
    }
  }
`);

export const FETCH_CAMPAIGN_BY_ID = gql(/* GraphQL */ `
  query CampaignById($data: IDInput!) {
    campaignById(data: $data) {
      id
      body
      subject
      listType
      listExtra
    }
  }
`);

export const CREATE_SEND_CAMPAIGN = gql(/* GraphQL */ `
  mutation CreateAndSendCampaign($data: CreateCampaignInput!) {
    createAndSendCampaign(data: $data) {
      id
    }
  }
`);

export const CREATE_MEMBER_LIST = gql(/* GraphQL */ `
  mutation CreateMemberList($data: CreateMemberListInput!) {
    createMemberList(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const CREATE_EMAIL_TEMPLATE = gql(/* GraphQL */ `
  mutation CreateEmailTemplate($data: CreateEmailTemplateInput!) {
    createEmailTemplate(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

export const UPDATE_EMAIL_TEMPLATE = gql(/* GraphQL */ `
  mutation UpdateEmailTemplate($data: UpdateEmailTemplateInput!) {
    updateEmailTemplate(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);
