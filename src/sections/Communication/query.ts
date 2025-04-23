import { gql } from 'src/__generated__/gql';

export const FETCH_WEEKLY_MEMBERS = gql(/* GraphQL */ `
  query WeeklyMembers($sort: String, $page: String, $filter: JSONObject) {
    weeklyCommissions(sort: $sort, page: $page, filter: $filter) {
      weeklyCommissions {
        email
        memberId
        username
        fullName
      }
      total
    }
  }
`);

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
        createdAt
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
        templateID
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
      templateID
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
        recipients {
          open
          sent
          email
          sender
          sentTime
          openTime
        }
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
      sender
      subject
      listType
      listExtra
      recipients {
        open
        sent
        body
        email
        sender
        sentTime
        openTime
      }
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

export const REMOVE_MEMBER_LIST = gql(/* GraphQL */ `
  mutation RemoveMemberList($data: IDInput!) {
    removeMemberList(data: $data) {
      message
      result
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);
