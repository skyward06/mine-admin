import { gql } from 'src/__generated__/gql';

export const FETCH_TEMPLATE_QUERY = gql(/* GraphQL */ `
  query Templates($sort: String, $page: String, $filter: JSONObject) {
    emailTemplates(sort: $sort, page: $page, filter: $filter) {
      templates {
        id
        body
        subject
        createdAt
        sampleVars
        description
        templateName
      }
      total
    }
  }
`);

export const FETCH_TEMPLATE_BY_ID = gql(/* GraphQL */ `
  query EmailTemplateById($data: IDInput!) {
    emailTemplateById(data: $data) {
      id
      body
      subject
      sampleVars
      description
      templateName
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
