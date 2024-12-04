// TODO: Get type from codegen instead of copying
// Copied from src/__generated__/graphql/AccountsQuery

export type PaymentMethodLink = {
  __typename?: 'PaymentMethodLink';
  createdAt?: any | null;
  deletedAt?: any | null;
  id: string;
  link: string;
  // package?: Maybe<Package>;
  packageId: string;
  // paymentMethod?: Maybe<PaymentMethod>;
  paymentMethodId: string;
  updatedAt?: any | null;
};

export type PaymentMethod = {
  __typename?: 'PaymentMethod';
  id: string;
  name: string;
  visible: boolean;
  defaultLink?: string | null;
  createdAt?: any | null;
  deletedAt?: any | null;
  updatedAt?: any | null;
  paymentMethodLinks?: Array<PaymentMethodLink> | null;
};
