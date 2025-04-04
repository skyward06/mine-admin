// TODO: Get type from codegen instead of copying
// Copied from src/__generated__/graphql/AccountsQuery

import type { ProofType } from 'src/__generated__/graphql';

export type PFile = {
  __typename?: 'PFile';
  id: string;
  url: string;
  size: number;
  mimeType: string;
  originalName: string;
  createdAt?: any | null;
  updatedAt?: any | null;
  deletedAt?: any | null;
};

export type RefLink = {
  __typename?: 'RefLink';
  link: string;
  linkType: string;
};

export type Proof = {
  __typename?: 'Proof';
  id: string;
  refId: string;
  amount: number;
  orderedAt: any;
  type: ProofType;
  note?: string | null;
  vendor?: string | null;
  files?: Array<PFile> | null;
  mineLocation?: string | null;
  reflinks?: Array<RefLink> | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  deletedAt?: any | null;
};
