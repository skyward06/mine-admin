export type EmailTemplate = {
  __typename?: 'EmailTemplate';
  id: string;
  body: string;
  sampleVars: any;
  subject: string;
  templateName: string;
  description?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  deletedAt?: any | null;
};
