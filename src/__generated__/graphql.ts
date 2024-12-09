/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** BigInt custom scalar type */
  BigInt: { input: any; output: any; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any; }
};

export type Admin = {
  __typename?: 'Admin';
  adminNotes?: Maybe<Array<AdminNotes>>;
  avatar: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  username: Scalars['String']['output'];
};

export type AdminLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type AdminLoginResponse = {
  __typename?: 'AdminLoginResponse';
  accessToken: Scalars['String']['output'];
};

export type AdminNotes = {
  __typename?: 'AdminNotes';
  admin?: Maybe<Admin>;
  adminId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  member?: Maybe<Member>;
  memberId: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type AdminNotesResponse = {
  __typename?: 'AdminNotesResponse';
  adminNotes?: Maybe<Array<AdminNotes>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type AdminsResponse = {
  __typename?: 'AdminsResponse';
  admins?: Maybe<Array<Admin>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type AverageMinerRewardStatsResponse = {
  __typename?: 'AverageMinerRewardStatsResponse';
  base: Scalars['String']['output'];
  baseDate: Scalars['DateTimeISO']['output'];
  reward: Scalars['Float']['output'];
};

export type Block = {
  __typename?: 'Block';
  blockNo: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  difficulty: Scalars['Float']['output'];
  hashRate: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  issuedAt: Scalars['DateTimeISO']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type BlockStatsResponse = {
  __typename?: 'BlockStatsResponse';
  base: Scalars['String']['output'];
  baseDate?: Maybe<Scalars['DateTimeISO']['output']>;
  difficulty: Scalars['Float']['output'];
  hashRate: Scalars['Float']['output'];
};

export type BlocksResponse = {
  __typename?: 'BlocksResponse';
  blocks?: Maybe<Array<Block>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type CommissionOverview = {
  __typename?: 'CommissionOverview';
  totalAmount: Scalars['Int']['output'];
  totalMember: Scalars['Int']['output'];
  totalRevenue: Scalars['Int']['output'];
  totalSale: Scalars['Int']['output'];
  weekStartDate: Scalars['DateTimeISO']['output'];
};

export type CommissionOverviewResponse = {
  __typename?: 'CommissionOverviewResponse';
  commissions?: Maybe<Array<CommissionOverview>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type CommissionPeriodResponse = {
  __typename?: 'CommissionPeriodResponse';
  base: Scalars['String']['output'];
  baseDate: Scalars['DateTimeISO']['output'];
  commission: Scalars['Int']['output'];
  revenue: Scalars['Int']['output'];
};

export type CommissionStatus = {
  __typename?: 'CommissionStatus';
  begL: Scalars['Int']['output'];
  begR: Scalars['Int']['output'];
  newL: Scalars['Int']['output'];
  newR: Scalars['Int']['output'];
};

export type ConfirmStatistics = {
  id: Scalars['ID']['input'];
  transactionId: Scalars['ID']['input'];
};

export enum ConfirmationStatus {
  Approved = 'APPROVED',
  Declined = 'DECLINED',
  None = 'NONE',
  Paid = 'PAID',
  Pending = 'PENDING',
  Preview = 'PREVIEW'
}

export type CountResponse = {
  __typename?: 'CountResponse';
  count: Scalars['Float']['output'];
};

export type CreateAdminInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateAdminNotesInput = {
  description: Scalars['String']['input'];
  memberId: Scalars['ID']['input'];
};

export type CreateBlockInput = {
  blockNo: Scalars['Float']['input'];
  difficulty: Scalars['Float']['input'];
  hashRate: Scalars['Float']['input'];
  issuedAt: Scalars['DateTimeISO']['input'];
};

export type CreateManyMemberStatisticsInput = {
  memberStatistics: Array<CreateMemberStatisticsInput>;
};

export type CreateManyStatisticsSaleInput = {
  statisticsSales: Array<CreateStatisticsSaleInput>;
};

export type CreateMemberInput = {
  ID: Scalars['String']['input'];
  assetId?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  mobile: Scalars['String']['input'];
  placementParentId?: InputMaybe<Scalars['ID']['input']>;
  placementPosition?: InputMaybe<PlacementPosition>;
  preferredContact?: InputMaybe<Scalars['String']['input']>;
  preferredContactDetail?: InputMaybe<Scalars['String']['input']>;
  primaryAddress: Scalars['String']['input'];
  secondaryAddress?: InputMaybe<Scalars['String']['input']>;
  sponsorId: Scalars['ID']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
  syncWithSendy?: InputMaybe<Scalars['Boolean']['input']>;
  teamStrategy?: InputMaybe<TeamStrategy>;
  username: Scalars['String']['input'];
  wallets: Array<MemberWalletDataInput>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type CreateMemberStatisticsInput = {
  hashPower: Scalars['Float']['input'];
  issuedAt: Scalars['DateTimeISO']['input'];
  memberId: Scalars['String']['input'];
  percent: Scalars['Float']['input'];
  statisticsId: Scalars['String']['input'];
  txcShared: Scalars['Float']['input'];
};

export type CreatePackageInput = {
  amount: Scalars['Float']['input'];
  date?: InputMaybe<Scalars['DateTimeISO']['input']>;
  enrollVisibility?: InputMaybe<Scalars['Boolean']['input']>;
  point?: InputMaybe<Scalars['Float']['input']>;
  productName: Scalars['String']['input'];
  status: Scalars['Boolean']['input'];
  token: Scalars['Float']['input'];
};

export type CreatePaymentMethodInput = {
  defaultLink?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  paymentMethodLinks?: InputMaybe<Array<PaymentMethodLinkInput>>;
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreatePayoutInput = {
  display: Scalars['String']['input'];
  method: Scalars['String']['input'];
  name: Scalars['String']['input'];
  status: Scalars['Boolean']['input'];
};

export type CreatePrepaidCommissionInput = {
  commissionId: Scalars['ID']['input'];
  fileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  note?: InputMaybe<Scalars['String']['input']>;
  orderedAt: Scalars['DateTimeISO']['input'];
  reflinks?: InputMaybe<Array<LinkInput>>;
  txId?: InputMaybe<Scalars['ID']['input']>;
  txType?: InputMaybe<Scalars['String']['input']>;
};

export type CreateProofInput = {
  amount: Scalars['Float']['input'];
  fileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  mineLocation?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  orderedAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  refId: Scalars['ID']['input'];
  reflinks?: InputMaybe<Array<LinkInput>>;
  type: ProofType;
};

export type CreateSaleInput = {
  fileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  memberId: Scalars['ID']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  orderedAt: Scalars['DateTimeISO']['input'];
  packageId: Scalars['ID']['input'];
  paymentMethod: Scalars['String']['input'];
  reflinks?: InputMaybe<Array<LinkInput>>;
  status: Scalars['Boolean']['input'];
};

export type CreateStatisticsInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  issuedAt: Scalars['DateTimeISO']['input'];
  memberStatistics: Array<CreateStatisticsMemberStatisticsInput>;
  saleIds: Array<Scalars['ID']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
  totalHashPower: Scalars['Float']['input'];
  totalMembers: Scalars['Float']['input'];
  txcShared: Scalars['Float']['input'];
};

export type CreateStatisticsMemberStatisticsInput = {
  hashPower: Scalars['Float']['input'];
  memberId: Scalars['ID']['input'];
  percent: Scalars['Float']['input'];
  txcShared: Scalars['Float']['input'];
};

export type CreateStatisticsSaleInput = {
  issuedAt: Scalars['DateTimeISO']['input'];
  saleId: Scalars['ID']['input'];
  statisticsId: Scalars['ID']['input'];
};

export type DailyReward = {
  __typename?: 'DailyReward';
  day: Scalars['DateTimeISO']['output'];
  rewardsByWallet: Array<RewardByWallet>;
  totalTxc: Scalars['BigInt']['output'];
};

export type DailyRewards = {
  __typename?: 'DailyRewards';
  rewards: Array<DailyReward>;
};

export type DailyStats = {
  __typename?: 'DailyStats';
  count: Scalars['Int']['output'];
  field: Scalars['String']['output'];
};

export type EmailInput = {
  email: Scalars['String']['input'];
};

export type EmailVerificationInput = {
  digit: Scalars['String']['input'];
  email: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type EmailVerificationResponse = {
  __typename?: 'EmailVerificationResponse';
  token: Scalars['String']['output'];
};

export type EmailVerifyResult = {
  __typename?: 'EmailVerifyResult';
  message?: Maybe<Scalars['String']['output']>;
  packageId?: Maybe<Scalars['ID']['output']>;
  paymentMethod?: Maybe<Scalars['String']['output']>;
  result: SuccessResult;
};

export type EntityStats = {
  __typename?: 'EntityStats';
  dailyData: Array<DailyStats>;
  meta?: Maybe<Scalars['Float']['output']>;
  total: Scalars['Float']['output'];
};

export type HashPowerResponse = {
  __typename?: 'HashPowerResponse';
  actualHashPower: Scalars['Float']['output'];
  soldHashPower: Scalars['Float']['output'];
};

export type IdInput = {
  id: Scalars['ID']['input'];
};

export type IDsInput = {
  ids: Array<Scalars['ID']['input']>;
};

export type Introducer = {
  __typename?: 'Introducer';
  createdAt: Scalars['DateTimeISO']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type IntroducersResponse = {
  __typename?: 'IntroducersResponse';
  introducers?: Maybe<Array<Introducer>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type LatestStatistics = {
  __typename?: 'LatestStatistics';
  id: Scalars['ID']['output'];
  issuedAt: Scalars['DateTimeISO']['output'];
  newBlocks: Scalars['Float']['output'];
  totalMembers: Scalars['Float']['output'];
  txcShared: Scalars['Float']['output'];
};

export type LinkInput = {
  link: Scalars['String']['input'];
  linkType: Scalars['String']['input'];
};

export type LiveStatsArgs = {
  pastDays: Scalars['Float']['input'];
};

export type ManySuccessResponse = {
  __typename?: 'ManySuccessResponse';
  count: Scalars['Float']['output'];
};

export type Member = {
  __typename?: 'Member';
  ID: Scalars['String']['output'];
  adminNotes?: Maybe<Array<AdminNotes>>;
  assetId?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  cmnCalculatedWeeks: Scalars['Int']['output'];
  commission?: Maybe<CommissionStatus>;
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  introduceMembers?: Maybe<Array<Member>>;
  logs?: Maybe<Array<MemberLog>>;
  memberWallets?: Maybe<Array<MemberWallet>>;
  mobile: Scalars['String']['output'];
  placementChildren?: Maybe<Array<Member>>;
  placementParent?: Maybe<Member>;
  placementParentId?: Maybe<Scalars['ID']['output']>;
  placementPosition: PlacementPosition;
  point: Scalars['Float']['output'];
  preferredContact?: Maybe<Scalars['String']['output']>;
  preferredContactDetail?: Maybe<Scalars['String']['output']>;
  primaryAddress: Scalars['String']['output'];
  sales?: Maybe<Array<Sale>>;
  secondaryAddress?: Maybe<Scalars['String']['output']>;
  sponsor?: Maybe<Member>;
  sponsorId?: Maybe<Scalars['ID']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  statistics?: Maybe<Array<MemberStatistics>>;
  status: Scalars['Boolean']['output'];
  syncWithSendy: Scalars['Boolean']['output'];
  teamStrategy: TeamStrategy;
  totalIntroducers: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  username: Scalars['String']['output'];
  weeklyCommissions?: Maybe<Array<WeeklyCommission>>;
  zipCode?: Maybe<Scalars['String']['output']>;
};


export type MemberLogsArgs = {
  logsize?: Scalars['Float']['input'];
};

export type MemberLog = {
  __typename?: 'MemberLog';
  action: Scalars['String']['output'];
  after?: Maybe<Scalars['JSON']['output']>;
  before?: Maybe<Scalars['JSON']['output']>;
  entity: Scalars['String']['output'];
  id: Scalars['String']['output'];
  role: Scalars['String']['output'];
  status: Scalars['String']['output'];
  when: Scalars['DateTimeISO']['output'];
  who: Scalars['String']['output'];
};

export type MemberLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MemberLoginResponse = {
  __typename?: 'MemberLoginResponse';
  accessToken: Scalars['String']['output'];
};

export type MemberOverview = {
  __typename?: 'MemberOverview';
  currentHashPower: Scalars['Float']['output'];
  joinDate: Scalars['DateTimeISO']['output'];
  point: Scalars['Float']['output'];
  totalTXCShared: Scalars['BigInt']['output'];
};

export type MemberOverviewInput = {
  id: Scalars['ID']['input'];
};

export type MemberStatistics = {
  __typename?: 'MemberStatistics';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  hashPower: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  issuedAt: Scalars['DateTimeISO']['output'];
  member?: Maybe<Member>;
  memberId: Scalars['String']['output'];
  memberStatisticsWallets?: Maybe<Array<MemberStatisticsWallet>>;
  percent: Scalars['Float']['output'];
  statistics?: Maybe<Statistics>;
  statisticsId: Scalars['String']['output'];
  txcShared: Scalars['BigInt']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type MemberStatisticsResponse = {
  __typename?: 'MemberStatisticsResponse';
  memberStatistics?: Maybe<Array<MemberStatistics>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type MemberStatisticsWallet = {
  __typename?: 'MemberStatisticsWallet';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['ID']['output'];
  issuedAt: Scalars['DateTimeISO']['output'];
  memberStatistic?: Maybe<MemberStatistics>;
  memberStatisticId: Scalars['String']['output'];
  memberWallet?: Maybe<MemberWallet>;
  memberWalletId: Scalars['String']['output'];
  txc: Scalars['BigInt']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type MemberStatisticsWalletResponse = {
  __typename?: 'MemberStatisticsWalletResponse';
  memberStatisticsWallets?: Maybe<Array<MemberStatisticsWallet>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type MemberWallet = {
  __typename?: 'MemberWallet';
  address: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['ID']['output'];
  member?: Maybe<Member>;
  memberId: Scalars['String']['output'];
  memberStatisticsWallets?: Maybe<Array<MemberStatisticsWallet>>;
  note?: Maybe<Scalars['String']['output']>;
  payout?: Maybe<Payout>;
  payoutId: Scalars['ID']['output'];
  percent: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type MemberWalletDataInput = {
  address: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  payoutId: Scalars['String']['input'];
  percent: Scalars['Float']['input'];
};

export type MemberWalletResponse = {
  __typename?: 'MemberWalletResponse';
  MemberWallets?: Maybe<Array<MemberWallet>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type MembersResponse = {
  __typename?: 'MembersResponse';
  members?: Maybe<Array<Member>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type MinerCountStatsResponse = {
  __typename?: 'MinerCountStatsResponse';
  base: Scalars['String']['output'];
  baseDate: Scalars['DateTimeISO']['output'];
  minerCount: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  adminLogin: AdminLoginResponse;
  approveMember: SuccessResponse;
  calculatePreview: SuccessResponse;
  confirmStatistics: Statistics;
  createAdmin: Admin;
  createAdminNote: AdminNotes;
  createBlock: Block;
  createManyMemberStatistics: ManySuccessResponse;
  createManyStatisticsSales: ManySuccessResponse;
  createMember: Member;
  createMemberStatistics: MemberStatistics;
  createPackage: Package;
  createPaymentMethod: PaymentMethod;
  createPayout: Payout;
  createPrepaidCommission: PrepaidCommission;
  createProof: Proof;
  createSale: Sale;
  createStatistics: Statistics;
  createStatisticsSale: StatisticsSale;
  emailVerify: EmailVerifyResult;
  memberLogin: MemberLoginResponse;
  removeAdminNote: SuccessResponse;
  removeAdmins: ManySuccessResponse;
  removeCompleteMemberPlacement: SuccessResponse;
  removeManyMemberStatistics: ManySuccessResponse;
  removeManyStatistics: ManySuccessResponse;
  removeManyStatisticsSales: ManySuccessResponse;
  removeMember: SuccessResponse;
  removeMemberStatisticsByStaitisId: ManySuccessResponse;
  removePackage: SuccessResponse;
  removePaymentMethod: SuccessResponse;
  removePrepaidCommission: SuccessResponse;
  removeProof: SuccessResponse;
  removeSale: SuccessResponse;
  removeStatisticsSalesByStaitisId: ManySuccessResponse;
  resetPasswordByToken: SuccessResponse;
  resetPasswordRequest: SuccessResponse;
  resetTokenVerify: VerifyTokenResponse;
  sendEmailVerification: EmailVerificationResponse;
  signUpMember: Member;
  updateAdmin: Admin;
  updateAdminNote: AdminNotes;
  updateCommission: WeeklyCommission;
  updateCommissionShortNote: WeeklyCommission;
  updateCommissionsStatus: SuccessResponse;
  updateMember: Member;
  updateMemberWallet: SuccessResponse;
  updatePackage: Package;
  updatePasswordAdmin: SuccessResponse;
  updatePasswordAdminById: Admin;
  updatePasswordMember: SuccessResponse;
  updatePasswordMemberById: Member;
  updatePaymentMethod: PaymentMethod;
  updatePrepaidCommission: PrepaidCommission;
  updateProof: Proof;
  updateSale: Sale;
  updateStatistics: Statistics;
};


export type MutationAdminLoginArgs = {
  data: AdminLoginInput;
};


export type MutationApproveMemberArgs = {
  data: IdInput;
};


export type MutationConfirmStatisticsArgs = {
  data: ConfirmStatistics;
};


export type MutationCreateAdminArgs = {
  data: CreateAdminInput;
};


export type MutationCreateAdminNoteArgs = {
  data: CreateAdminNotesInput;
};


export type MutationCreateBlockArgs = {
  data: CreateBlockInput;
};


export type MutationCreateManyMemberStatisticsArgs = {
  data: CreateManyMemberStatisticsInput;
};


export type MutationCreateManyStatisticsSalesArgs = {
  data: CreateManyStatisticsSaleInput;
};


export type MutationCreateMemberArgs = {
  data: CreateMemberInput;
};


export type MutationCreateMemberStatisticsArgs = {
  data: CreateMemberStatisticsInput;
};


export type MutationCreatePackageArgs = {
  data: CreatePackageInput;
};


export type MutationCreatePaymentMethodArgs = {
  data: CreatePaymentMethodInput;
};


export type MutationCreatePayoutArgs = {
  data: CreatePayoutInput;
};


export type MutationCreatePrepaidCommissionArgs = {
  data: CreatePrepaidCommissionInput;
};


export type MutationCreateProofArgs = {
  data: CreateProofInput;
};


export type MutationCreateSaleArgs = {
  data: CreateSaleInput;
};


export type MutationCreateStatisticsArgs = {
  data: CreateStatisticsInput;
};


export type MutationCreateStatisticsSaleArgs = {
  data: CreateStatisticsSaleInput;
};


export type MutationEmailVerifyArgs = {
  data: EmailVerificationInput;
};


export type MutationMemberLoginArgs = {
  data: MemberLoginInput;
};


export type MutationRemoveAdminNoteArgs = {
  data: IdInput;
};


export type MutationRemoveAdminsArgs = {
  data: IDsInput;
};


export type MutationRemoveCompleteMemberPlacementArgs = {
  data: IdInput;
};


export type MutationRemoveManyMemberStatisticsArgs = {
  data: IDsInput;
};


export type MutationRemoveManyStatisticsArgs = {
  data: IDsInput;
};


export type MutationRemoveManyStatisticsSalesArgs = {
  data: IDsInput;
};


export type MutationRemoveMemberArgs = {
  data: IdInput;
};


export type MutationRemoveMemberStatisticsByStaitisIdArgs = {
  data: IdInput;
};


export type MutationRemovePackageArgs = {
  data: IdInput;
};


export type MutationRemovePaymentMethodArgs = {
  data: IdInput;
};


export type MutationRemovePrepaidCommissionArgs = {
  data: IdInput;
};


export type MutationRemoveProofArgs = {
  data: IdInput;
};


export type MutationRemoveSaleArgs = {
  data: IdInput;
};


export type MutationRemoveStatisticsSalesByStaitisIdArgs = {
  data: IdInput;
};


export type MutationResetPasswordByTokenArgs = {
  data: ResetPasswordTokenInput;
};


export type MutationResetPasswordRequestArgs = {
  data: EmailInput;
};


export type MutationResetTokenVerifyArgs = {
  data: TokenInput;
};


export type MutationSendEmailVerificationArgs = {
  data: EmailInput;
};


export type MutationSignUpMemberArgs = {
  data: SignupFormInput;
};


export type MutationUpdateAdminArgs = {
  data: UpdateAdminInput;
};


export type MutationUpdateAdminNoteArgs = {
  data: UpdateAdminNotesInput;
};


export type MutationUpdateCommissionArgs = {
  data: WeeklyCommissionUpdateInput;
};


export type MutationUpdateCommissionShortNoteArgs = {
  data: WeeklyCommissionNoteInput;
};


export type MutationUpdateCommissionsStatusArgs = {
  data: WeeklyCommissionsStatusUpdateInput;
};


export type MutationUpdateMemberArgs = {
  data: UpdateMemberInput;
};


export type MutationUpdateMemberWalletArgs = {
  data: UpdateMemberWalletInput;
};


export type MutationUpdatePackageArgs = {
  data: UpdatePackageInput;
};


export type MutationUpdatePasswordAdminArgs = {
  data: UpdateAdminPasswordInput;
};


export type MutationUpdatePasswordAdminByIdArgs = {
  data: UpdateAdminPasswordByIdInput;
};


export type MutationUpdatePasswordMemberArgs = {
  data: UpdateMemberPasswordInput;
};


export type MutationUpdatePasswordMemberByIdArgs = {
  data: UpdateMemberPasswordInputById;
};


export type MutationUpdatePaymentMethodArgs = {
  data: UpdatePaymentMethodInput;
};


export type MutationUpdatePrepaidCommissionArgs = {
  data: UpdatePrepaidCommissionInput;
};


export type MutationUpdateProofArgs = {
  data: UpdateProofByIdInput;
};


export type MutationUpdateSaleArgs = {
  data: UpdateSaleInput;
};


export type MutationUpdateStatisticsArgs = {
  data: UpdateStatisticsInput;
};

export type PFile = {
  __typename?: 'PFile';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['ID']['output'];
  mimeType: Scalars['String']['output'];
  originalName: Scalars['String']['output'];
  size: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  url: Scalars['String']['output'];
};

export type Package = {
  __typename?: 'Package';
  amount: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  date: Scalars['DateTimeISO']['output'];
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  enrollVisibility: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  paymentMethodLinks?: Maybe<Array<PaymentMethodLink>>;
  point: Scalars['Float']['output'];
  productName: Scalars['String']['output'];
  sales?: Maybe<Array<Sale>>;
  status: Scalars['Boolean']['output'];
  token: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type PackageResponse = {
  __typename?: 'PackageResponse';
  packages?: Maybe<Array<Package>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type PaymentMethod = {
  __typename?: 'PaymentMethod';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  defaultLink?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  paymentMethodLinks?: Maybe<Array<PaymentMethodLink>>;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  visible: Scalars['Boolean']['output'];
};

export type PaymentMethodLink = {
  __typename?: 'PaymentMethodLink';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['ID']['output'];
  link: Scalars['String']['output'];
  package?: Maybe<Package>;
  packageId: Scalars['ID']['output'];
  paymentMethod?: Maybe<PaymentMethod>;
  paymentMethodId: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type PaymentMethodLinkInput = {
  link: Scalars['String']['input'];
  packageId: Scalars['ID']['input'];
};

export type PaymentMethodLinkResponse = {
  __typename?: 'PaymentMethodLinkResponse';
  paymentMethodLinks?: Maybe<Array<PaymentMethodLink>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type PaymentMethodResponse = {
  __typename?: 'PaymentMethodResponse';
  paymentMethods?: Maybe<Array<PaymentMethod>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type Payout = {
  __typename?: 'Payout';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  display: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  memberWallets?: Maybe<Array<MemberWallet>>;
  method: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type PayoutResponse = {
  __typename?: 'PayoutResponse';
  payouts?: Maybe<Array<Payout>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type PeriodStatsArgs = {
  type: Scalars['String']['input'];
};

export enum PlacementPosition {
  Left = 'LEFT',
  None = 'NONE',
  Right = 'RIGHT'
}

export type PlacementPositionCountResponse = {
  __typename?: 'PlacementPositionCountResponse';
  leftCount: Scalars['Float']['output'];
  rightCount: Scalars['Float']['output'];
};

export type PrepaidCommission = {
  __typename?: 'PrepaidCommission';
  commission?: Maybe<WeeklyCommission>;
  commissionId: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['ID']['output'];
  orderedAt: Scalars['DateTimeISO']['output'];
  proof?: Maybe<Proof>;
  txId?: Maybe<Scalars['ID']['output']>;
  txType?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type PrepaidCommissionResponse = {
  __typename?: 'PrepaidCommissionResponse';
  prepaidCommissions?: Maybe<Array<PrepaidCommission>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type ProfitabilityCalculationInput = {
  init: Scalars['Int']['input'];
  joinDate: Scalars['DateTimeISO']['input'];
  target: Scalars['Int']['input'];
};

export type ProfitabilityCalculationResponse = {
  __typename?: 'ProfitabilityCalculationResponse';
  endDate: Scalars['DateTimeISO']['output'];
  extraTXC: Scalars['Float']['output'];
  init: Scalars['Int']['output'];
  period: Scalars['Int']['output'];
  startDate: Scalars['DateTimeISO']['output'];
  target: Scalars['Int']['output'];
  txc: Scalars['Float']['output'];
  txcCost: Scalars['Float']['output'];
  txcPrice: Scalars['Float']['output'];
};

export type Proof = {
  __typename?: 'Proof';
  amount: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  files?: Maybe<Array<PFile>>;
  id: Scalars['ID']['output'];
  mineLocation?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  orderedAt: Scalars['DateTimeISO']['output'];
  refId: Scalars['ID']['output'];
  reflinks?: Maybe<Array<RefLink>>;
  type: ProofType;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type ProofResponse = {
  __typename?: 'ProofResponse';
  proofs?: Maybe<Array<Proof>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export enum ProofType {
  Administrationsalary = 'ADMINISTRATIONSALARY',
  Commission = 'COMMISSION',
  Developersapps = 'DEVELOPERSAPPS',
  Developersintegrations = 'DEVELOPERSINTEGRATIONS',
  Developersprotocol = 'DEVELOPERSPROTOCOL',
  Developersweb = 'DEVELOPERSWEB',
  Exchangefee = 'EXCHANGEFEE',
  Infrastructure = 'INFRASTRUCTURE',
  Marketingminetxcpromotion = 'MARKETINGMINETXCPROMOTION',
  Marketingtxcpromotion = 'MARKETINGTXCPROMOTION',
  Mineelectricity = 'MINEELECTRICITY',
  Minefacilityrentmortage = 'MINEFACILITYRENTMORTAGE',
  Minemaintainance = 'MINEMAINTAINANCE',
  Minenewequipment = 'MINENEWEQUIPMENT',
  Overhead = 'OVERHEAD',
  Prepay = 'PREPAY',
  Profit = 'PROFIT',
  Promotion = 'PROMOTION',
  Sale = 'SALE'
}

export type Query = {
  __typename?: 'Query';
  adminMe: Admin;
  adminNotes: AdminNotesResponse;
  admins: AdminsResponse;
  averageMemberReward: Array<AverageMinerRewardStatsResponse>;
  blocks: BlocksResponse;
  blocksData: Array<BlockStatsResponse>;
  calculateProfitability: ProfitabilityCalculationResponse;
  commissionByMemberIDAndWeek: WeeklyCommission;
  commissionByPeriod: Array<CommissionPeriodResponse>;
  commissionsByWeek: CommissionOverviewResponse;
  countBelowMembers: PlacementPositionCountResponse;
  countLeftMembers: CountResponse;
  countRightMembers: CountResponse;
  dailyRewards: DailyRewards;
  generateReferenceLink: ReferenceLink;
  hashPowerResponse: HashPowerResponse;
  introducers: IntroducersResponse;
  latestStatistics: Array<LatestStatistics>;
  liveBlockStats: EntityStats;
  liveMiningStats: EntityStats;
  liveUserStats: EntityStats;
  memberMe: Member;
  memberOverview: MemberOverview;
  memberStatistics: MemberStatisticsResponse;
  memberStatisticsWallets: MemberStatisticsWalletResponse;
  memberWallets: MemberWalletResponse;
  members: MembersResponse;
  newMemberCounts: Array<MinerCountStatsResponse>;
  onepointAwayMembers: MembersResponse;
  packages: PackageResponse;
  paymentMethodLinks: PaymentMethodLinkResponse;
  paymentMethods: PaymentMethodResponse;
  payouts: PayoutResponse;
  prepaidCommissions: PrepaidCommissionResponse;
  proofById: Proof;
  proofs: ProofResponse;
  revenueOverview: RevenueOverviewResponse;
  rewardsByWallets: RewardsByWallets;
  sales: SalesResponse;
  statistics: StatisticsResponse;
  statisticsSales: StatisticsSaleResponse;
  topEarners: Array<TopEarnersResponse>;
  topRecruiters: Array<TopRecruitersResponse>;
  totalMemberCounts: Array<MinerCountStatsResponse>;
  txcShares: Array<TxcSharedResponse>;
  weeklyCommissions: WeeklyCommissionResponse;
};


export type QueryAdminNotesArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAdminsArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAverageMemberRewardArgs = {
  data: PeriodStatsArgs;
};


export type QueryBlocksArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBlocksDataArgs = {
  data: PeriodStatsArgs;
};


export type QueryCalculateProfitabilityArgs = {
  data: ProfitabilityCalculationInput;
};


export type QueryCommissionByMemberIdAndWeekArgs = {
  data: WeeklyCommissionGetInput;
};


export type QueryCommissionByPeriodArgs = {
  data: PeriodStatsArgs;
};


export type QueryCommissionsByWeekArgs = {
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  weekStartDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
};


export type QueryCountBelowMembersArgs = {
  data: IdInput;
};


export type QueryCountLeftMembersArgs = {
  data: IdInput;
};


export type QueryCountRightMembersArgs = {
  data: IdInput;
};


export type QueryDailyRewardsArgs = {
  from: Scalars['DateTimeISO']['input'];
  memberId?: InputMaybe<Scalars['ID']['input']>;
  to: Scalars['DateTimeISO']['input'];
};


export type QueryIntroducersArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryLiveBlockStatsArgs = {
  data: LiveStatsArgs;
};


export type QueryLiveUserStatsArgs = {
  data: LiveStatsArgs;
};


export type QueryMemberOverviewArgs = {
  data: MemberOverviewInput;
};


export type QueryMemberStatisticsArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMemberStatisticsWalletsArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMemberWalletsArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMembersArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryNewMemberCountsArgs = {
  data: PeriodStatsArgs;
};


export type QueryOnepointAwayMembersArgs = {
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPackagesArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPaymentMethodLinksArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPaymentMethodsArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPayoutsArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPrepaidCommissionsArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProofByIdArgs = {
  data: IdInput;
};


export type QueryProofsArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryRewardsByWalletsArgs = {
  from: Scalars['DateTimeISO']['input'];
  memberId?: InputMaybe<Scalars['ID']['input']>;
  to: Scalars['DateTimeISO']['input'];
};


export type QuerySalesArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryStatisticsArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryStatisticsSalesArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTotalMemberCountsArgs = {
  data: PeriodStatsArgs;
};


export type QueryTxcSharesArgs = {
  data: PeriodStatsArgs;
};


export type QueryWeeklyCommissionsArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};

export type RefLink = {
  __typename?: 'RefLink';
  link: Scalars['String']['output'];
  linkType: Scalars['String']['output'];
};

export type ReferenceLink = {
  __typename?: 'ReferenceLink';
  link: Scalars['String']['output'];
};

export type ResetPasswordTokenInput = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type RevenueOverviewResponse = {
  __typename?: 'RevenueOverviewResponse';
  revenue: Scalars['Float']['output'];
  spent?: Maybe<Array<RevenueSpentItem>>;
};

export type RevenueSpentItem = {
  __typename?: 'RevenueSpentItem';
  label: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export type RewardByWallet = {
  __typename?: 'RewardByWallet';
  txc: Scalars['BigInt']['output'];
  wallet: MemberWallet;
};

export type RewardsByWallets = {
  __typename?: 'RewardsByWallets';
  rewards: Array<RewardByWallet>;
};

export type Sale = {
  __typename?: 'Sale';
  ID: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['ID']['output'];
  member?: Maybe<Member>;
  memberId: Scalars['ID']['output'];
  orderedAt: Scalars['DateTimeISO']['output'];
  package?: Maybe<Package>;
  packageId: Scalars['ID']['output'];
  paymentMethod: Scalars['String']['output'];
  proof?: Maybe<Proof>;
  statisticsSales?: Maybe<Array<StatisticsSale>>;
  status: Scalars['Boolean']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type SalesResponse = {
  __typename?: 'SalesResponse';
  sales?: Maybe<Array<Sale>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type SignupFormInput = {
  assetId?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  mobile: Scalars['String']['input'];
  packageId?: InputMaybe<Scalars['ID']['input']>;
  password: Scalars['String']['input'];
  paymentMethod?: InputMaybe<Scalars['String']['input']>;
  preferredContact?: InputMaybe<Scalars['String']['input']>;
  preferredContactDetail?: InputMaybe<Scalars['String']['input']>;
  primaryAddress: Scalars['String']['input'];
  secondaryAddress?: InputMaybe<Scalars['String']['input']>;
  sponsorUserId?: InputMaybe<Scalars['ID']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type Statistics = {
  __typename?: 'Statistics';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  from: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  issuedAt: Scalars['DateTimeISO']['output'];
  memberStatistics?: Maybe<Array<MemberStatistics>>;
  newBlocks: Scalars['Float']['output'];
  statisticsSales?: Maybe<Array<StatisticsSale>>;
  status: Scalars['Boolean']['output'];
  to: Scalars['DateTimeISO']['output'];
  totalBlocks: Scalars['Float']['output'];
  totalHashPower: Scalars['Float']['output'];
  totalMembers: Scalars['Float']['output'];
  transactionId?: Maybe<Scalars['ID']['output']>;
  txcShared: Scalars['BigInt']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type StatisticsResponse = {
  __typename?: 'StatisticsResponse';
  statistics?: Maybe<Array<Statistics>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type StatisticsSale = {
  __typename?: 'StatisticsSale';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['ID']['output'];
  issuedAt: Scalars['DateTimeISO']['output'];
  sale?: Maybe<Sale>;
  saleId: Scalars['ID']['output'];
  statistics?: Maybe<Statistics>;
  statisticsId: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type StatisticsSaleResponse = {
  __typename?: 'StatisticsSaleResponse';
  statisticsSales?: Maybe<Array<StatisticsSale>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type SuccessResponse = {
  __typename?: 'SuccessResponse';
  message?: Maybe<Scalars['String']['output']>;
  result: SuccessResult;
};

export enum SuccessResult {
  Failed = 'failed',
  Success = 'success'
}

export type TxcSharedResponse = {
  __typename?: 'TXCSharedResponse';
  base: Scalars['String']['output'];
  baseDate: Scalars['DateTimeISO']['output'];
  txc: Scalars['Float']['output'];
};

export enum TeamStrategy {
  Balance = 'BALANCE',
  Left = 'LEFT',
  Manual = 'MANUAL',
  Right = 'RIGHT'
}

export type TokenInput = {
  token: Scalars['String']['input'];
};

export type TopEarnersResponse = {
  __typename?: 'TopEarnersResponse';
  earned: Scalars['Float']['output'];
  fullName: Scalars['String']['output'];
};

export type TopRecruitersResponse = {
  __typename?: 'TopRecruitersResponse';
  fullName: Scalars['String']['output'];
  totalIntroducers: Scalars['Float']['output'];
};

export type UpdateAdminInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAdminNotesInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type UpdateAdminPasswordByIdInput = {
  id: Scalars['ID']['input'];
  newPassword: Scalars['String']['input'];
};

export type UpdateAdminPasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type UpdateMemberInput = {
  ID?: InputMaybe<Scalars['String']['input']>;
  assetId?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  mobile?: InputMaybe<Scalars['String']['input']>;
  placementParentId?: InputMaybe<Scalars['ID']['input']>;
  placementPosition?: InputMaybe<PlacementPosition>;
  preferredContact?: InputMaybe<Scalars['String']['input']>;
  preferredContactDetail?: InputMaybe<Scalars['String']['input']>;
  primaryAddress?: InputMaybe<Scalars['String']['input']>;
  secondaryAddress?: InputMaybe<Scalars['String']['input']>;
  sponsorId?: InputMaybe<Scalars['ID']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
  syncWithSendy?: InputMaybe<Scalars['Boolean']['input']>;
  teamStrategy?: InputMaybe<TeamStrategy>;
  username?: InputMaybe<Scalars['String']['input']>;
  wallets?: InputMaybe<Array<MemberWalletDataInput>>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMemberPasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type UpdateMemberPasswordInputById = {
  id: Scalars['ID']['input'];
  newPassword: Scalars['String']['input'];
};

export type UpdateMemberWalletInput = {
  memberId: Scalars['ID']['input'];
  wallets: Array<MemberWalletDataInput>;
};

export type UpdatePackageInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  date?: InputMaybe<Scalars['DateTimeISO']['input']>;
  enrollVisibility?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  point?: InputMaybe<Scalars['Float']['input']>;
  productName?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
  token?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdatePaymentMethodInput = {
  defaultLink?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  paymentMethodLinks?: InputMaybe<Array<PaymentMethodLinkInput>>;
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdatePrepaidCommissionInput = {
  commissionId?: InputMaybe<Scalars['ID']['input']>;
  fileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  id: Scalars['ID']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  orderedAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  reflinks?: InputMaybe<Array<LinkInput>>;
  txId?: InputMaybe<Scalars['ID']['input']>;
  txType?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProofByIdInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  fileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  id: Scalars['ID']['input'];
  mineLocation?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  orderedAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  refId?: InputMaybe<Scalars['ID']['input']>;
  reflinks?: InputMaybe<Array<LinkInput>>;
  type?: InputMaybe<ProofType>;
};

export type UpdateSaleInput = {
  fileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  id: Scalars['ID']['input'];
  memberId?: InputMaybe<Scalars['ID']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  orderedAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  packageId?: InputMaybe<Scalars['ID']['input']>;
  paymentMethod?: InputMaybe<Scalars['String']['input']>;
  reflinks?: InputMaybe<Array<LinkInput>>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateStatisticsInput = {
  id: Scalars['ID']['input'];
  status?: InputMaybe<Scalars['Boolean']['input']>;
  transactionId?: InputMaybe<Scalars['ID']['input']>;
  txcShared?: InputMaybe<Scalars['Float']['input']>;
};

export type VerifyTokenResponse = {
  __typename?: 'VerifyTokenResponse';
  email: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type WeeklyCommission = {
  __typename?: 'WeeklyCommission';
  ID: Scalars['Int']['output'];
  begL: Scalars['Float']['output'];
  begR: Scalars['Float']['output'];
  commission: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  endL: Scalars['Float']['output'];
  endR: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  maxL: Scalars['Float']['output'];
  maxR: Scalars['Float']['output'];
  member?: Maybe<Member>;
  memberId: Scalars['ID']['output'];
  newL: Scalars['Float']['output'];
  newR: Scalars['Float']['output'];
  pkgL: Scalars['Float']['output'];
  pkgR: Scalars['Float']['output'];
  proof?: Maybe<Proof>;
  shortNote?: Maybe<Scalars['String']['output']>;
  status: ConfirmationStatus;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  weekStartDate: Scalars['DateTimeISO']['output'];
};

export type WeeklyCommissionGetInput = {
  memberId: Scalars['ID']['input'];
  weekStartDate: Scalars['DateTimeISO']['input'];
};

export type WeeklyCommissionNoteInput = {
  id: Scalars['ID']['input'];
  shortNote?: InputMaybe<Scalars['String']['input']>;
};

export type WeeklyCommissionResponse = {
  __typename?: 'WeeklyCommissionResponse';
  total?: Maybe<Scalars['Int']['output']>;
  weeklyCommissions?: Maybe<Array<WeeklyCommission>>;
};

export type WeeklyCommissionUpdateInput = {
  fileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  id: Scalars['ID']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  reflinks?: InputMaybe<Array<LinkInput>>;
  shortNote?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ConfirmationStatus>;
};

export type WeeklyCommissionsStatusUpdateInput = {
  ids: Array<Scalars['ID']['input']>;
  status: ConfirmationStatus;
};

export type FetchMeQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchMeQuery = { __typename?: 'Query', adminMe: { __typename?: 'Admin', id: string, avatar: string, username: string, email: string } };

export type WeeklyCommissionsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type WeeklyCommissionsQuery = { __typename?: 'Query', weeklyCommissions: { __typename?: 'WeeklyCommissionResponse', total?: number | null, weeklyCommissions?: Array<{ __typename?: 'WeeklyCommission', id: string, ID: number, memberId: string, weekStartDate: any, begL: number, begR: number, newL: number, newR: number, maxL: number, maxR: number, endL: number, endR: number, pkgL: number, pkgR: number, commission: number, status: ConfirmationStatus, shortNote?: string | null, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, proof?: { __typename?: 'Proof', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, refId: string, type: ProofType, amount: number, note?: string | null, orderedAt: any, files?: Array<{ __typename?: 'PFile', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, url: string, originalName: string, mimeType: string, size: number }> | null, reflinks?: Array<{ __typename?: 'RefLink', linkType: string, link: string }> | null } | null, member?: { __typename?: 'Member', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, username: string, fullName: string, sponsorId?: string | null, email: string, mobile: string, assetId?: string | null, primaryAddress: string, secondaryAddress?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, placementParentId?: string | null, placementPosition: PlacementPosition, point: number, emailVerified: boolean, status: boolean, totalIntroducers: number } | null }> | null } };

export type FetchCommissionStatsQueryVariables = Exact<{
  allFilter?: InputMaybe<Scalars['JSONObject']['input']>;
  pendingFilter?: InputMaybe<Scalars['JSONObject']['input']>;
  declinedFilter?: InputMaybe<Scalars['JSONObject']['input']>;
  paidFilter?: InputMaybe<Scalars['JSONObject']['input']>;
  approvedFilter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type FetchCommissionStatsQuery = { __typename?: 'Query', all: { __typename?: 'WeeklyCommissionResponse', total?: number | null }, pending: { __typename?: 'WeeklyCommissionResponse', total?: number | null }, declined: { __typename?: 'WeeklyCommissionResponse', total?: number | null }, paid: { __typename?: 'WeeklyCommissionResponse', total?: number | null }, approved: { __typename?: 'WeeklyCommissionResponse', total?: number | null } };

export type CommissionsByWeekQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  weekStartDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
}>;


export type CommissionsByWeekQuery = { __typename?: 'Query', commissionsByWeek: { __typename?: 'CommissionOverviewResponse', total?: number | null, commissions?: Array<{ __typename?: 'CommissionOverview', weekStartDate: any, totalSale: number, totalRevenue: number, totalMember: number, totalAmount: number }> | null } };

export type UpdateCommissionMutationVariables = Exact<{
  data: WeeklyCommissionUpdateInput;
}>;


export type UpdateCommissionMutation = { __typename?: 'Mutation', updateCommission: { __typename?: 'WeeklyCommission', ID: number } };

export type UpdateCommissionsStatusMutationVariables = Exact<{
  data: WeeklyCommissionsStatusUpdateInput;
}>;


export type UpdateCommissionsStatusMutation = { __typename?: 'Mutation', updateCommissionsStatus: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult } };

export type CalculatePreviewMutationVariables = Exact<{ [key: string]: never; }>;


export type CalculatePreviewMutation = { __typename?: 'Mutation', calculatePreview: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult } };

export type UpdateCommissionShortNoteMutationVariables = Exact<{
  data: WeeklyCommissionNoteInput;
}>;


export type UpdateCommissionShortNoteMutation = { __typename?: 'Mutation', updateCommissionShortNote: { __typename?: 'WeeklyCommission', ID: number } };

export type AdminNotesQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type AdminNotesQuery = { __typename?: 'Query', adminNotes: { __typename?: 'AdminNotesResponse', total?: number | null, adminNotes?: Array<{ __typename?: 'AdminNotes', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, memberId: string, adminId: string, description?: string | null, member?: { __typename?: 'Member', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, username: string, fullName: string, sponsorId?: string | null, email: string, mobile: string, assetId?: string | null, primaryAddress: string, secondaryAddress?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, placementParentId?: string | null, placementPosition: PlacementPosition, point: number, emailVerified: boolean, status: boolean, totalIntroducers: number, syncWithSendy: boolean, preferredContact?: string | null, preferredContactDetail?: string | null, commission?: { __typename?: 'CommissionStatus', begL: number, begR: number, newL: number, newR: number } | null } | null, admin?: { __typename?: 'Admin', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, username: string, email: string, avatar: string } | null }> | null } };

export type CreateAdminNoteMutationVariables = Exact<{
  data: CreateAdminNotesInput;
}>;


export type CreateAdminNoteMutation = { __typename?: 'Mutation', createAdminNote: { __typename?: 'AdminNotes', adminId: string, id: string, description?: string | null, memberId: string } };

export type UpdateAdminNoteMutationVariables = Exact<{
  data: UpdateAdminNotesInput;
}>;


export type UpdateAdminNoteMutation = { __typename?: 'Mutation', updateAdminNote: { __typename?: 'AdminNotes', admin?: { __typename?: 'Admin', id: string, username: string, email: string, avatar: string } | null } };

export type RemoveAdminNoteMutationVariables = Exact<{
  data: IdInput;
}>;


export type RemoveAdminNoteMutation = { __typename?: 'Mutation', removeAdminNote: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult } };

export type FetchMemberStatsQueryVariables = Exact<{
  pendingFilter?: InputMaybe<Scalars['JSONObject']['input']>;
  inactiveFilter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type FetchMemberStatsQuery = { __typename?: 'Query', all: { __typename?: 'MembersResponse', total?: number | null }, pending: { __typename?: 'MembersResponse', total?: number | null }, inactive: { __typename?: 'MembersResponse', total?: number | null } };

export type FetchMembersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  logsize?: InputMaybe<Scalars['Float']['input']>;
}>;


export type FetchMembersQuery = { __typename?: 'Query', members: { __typename?: 'MembersResponse', total?: number | null, members?: Array<{ __typename?: 'Member', id: string, ID: string, username: string, fullName: string, email: string, primaryAddress: string, secondaryAddress?: string | null, assetId?: string | null, mobile: string, city?: string | null, state?: string | null, zipCode?: string | null, point: number, sponsorId?: string | null, status: boolean, emailVerified: boolean, totalIntroducers: number, syncWithSendy: boolean, preferredContact?: string | null, preferredContactDetail?: string | null, cmnCalculatedWeeks: number, teamStrategy: TeamStrategy, placementPosition: PlacementPosition, placementParentId?: string | null, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, commission?: { __typename?: 'CommissionStatus', begL: number, begR: number, newL: number, newR: number } | null, sponsor?: { __typename?: 'Member', id: string, ID: string, username: string, fullName: string, email: string, point: number, primaryAddress: string, secondaryAddress?: string | null, mobile: string, assetId?: string | null, status: boolean, emailVerified: boolean, totalIntroducers: number, syncWithSendy: boolean, preferredContact?: string | null, preferredContactDetail?: string | null, cmnCalculatedWeeks: number, teamStrategy: TeamStrategy, placementPosition: PlacementPosition, commission?: { __typename?: 'CommissionStatus', begL: number, begR: number, newL: number, newR: number } | null } | null, placementParent?: { __typename?: 'Member', id: string, ID: string, email: string, point: number, mobile: string, status: boolean, assetId?: string | null, username: string, fullName: string, emailVerified: boolean, syncWithSendy: boolean, primaryAddress: string, totalIntroducers: number, preferredContact?: string | null, secondaryAddress?: string | null, preferredContactDetail?: string | null, cmnCalculatedWeeks: number, teamStrategy: TeamStrategy, placementPosition: PlacementPosition, commission?: { __typename?: 'CommissionStatus', begL: number, begR: number, newL: number, newR: number } | null } | null, placementChildren?: Array<{ __typename?: 'Member', id: string, ID: string, email: string, point: number, mobile: string, status: boolean, assetId?: string | null, username: string, fullName: string, emailVerified: boolean, syncWithSendy: boolean, primaryAddress: string, secondaryAddress?: string | null, preferredContact?: string | null, totalIntroducers: number, placementPosition: PlacementPosition, preferredContactDetail?: string | null, cmnCalculatedWeeks: number, teamStrategy: TeamStrategy, commission?: { __typename?: 'CommissionStatus', begL: number, begR: number, newL: number, newR: number } | null }> | null, sales?: Array<{ __typename?: 'Sale', id: string, ID: number, memberId: string, packageId: string, paymentMethod: string, status: boolean, orderedAt: any, proof?: { __typename?: 'Proof', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, refId: string, type: ProofType, amount: number, note?: string | null, orderedAt: any, files?: Array<{ __typename?: 'PFile', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, url: string, originalName: string, mimeType: string, size: number }> | null, reflinks?: Array<{ __typename?: 'RefLink', linkType: string, link: string }> | null } | null }> | null, memberWallets?: Array<{ __typename?: 'MemberWallet', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, memberId: string, payoutId: string, address: string, percent: number, note?: string | null, payout?: { __typename?: 'Payout', id: string, method: string, status: boolean, name: string, display: string, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null } | null }> | null, logs?: Array<{ __typename?: 'MemberLog', id: string, who: string, role: string, when: any, entity: string, action: string, status: string, before?: any | null, after?: any | null }> | null }> | null } };

export type FetchPlacementMembersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type FetchPlacementMembersQuery = { __typename?: 'Query', members: { __typename?: 'MembersResponse', total?: number | null, members?: Array<{ __typename?: 'Member', id: string, username: string, email: string, fullName: string, sponsorId?: string | null, cmnCalculatedWeeks: number, placementParentId?: string | null, placementPosition: PlacementPosition, createdAt?: any | null, placementParent?: { __typename?: 'Member', id: string, username: string, fullName: string } | null, sponsor?: { __typename?: 'Member', username: string } | null, commission?: { __typename?: 'CommissionStatus', begL: number, begR: number, newL: number, newR: number } | null }> | null } };

export type CreateMemberMutationVariables = Exact<{
  data: CreateMemberInput;
}>;


export type CreateMemberMutation = { __typename?: 'Mutation', createMember: { __typename?: 'Member', username: string, fullName: string, email: string, mobile: string, primaryAddress: string, secondaryAddress?: string | null, assetId?: string | null } };

export type UpdateMemberMutationVariables = Exact<{
  data: UpdateMemberInput;
}>;


export type UpdateMemberMutation = { __typename?: 'Mutation', updateMember: { __typename?: 'Member', id: string, mobile: string, primaryAddress: string, secondaryAddress?: string | null, assetId?: string | null } };

export type MemberOverviewQueryVariables = Exact<{
  data: MemberOverviewInput;
}>;


export type MemberOverviewQuery = { __typename?: 'Query', memberOverview: { __typename?: 'MemberOverview', currentHashPower: number, totalTXCShared: any, joinDate: any } };

export type MemberStatisticsQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type MemberStatisticsQuery = { __typename?: 'Query', memberStatistics: { __typename?: 'MemberStatisticsResponse', total?: number | null, memberStatistics?: Array<{ __typename?: 'MemberStatistics', issuedAt: any, hashPower: number, txcShared: any }> | null } };

export type PayoutsQueryVariables = Exact<{
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type PayoutsQuery = { __typename?: 'Query', payouts: { __typename?: 'PayoutResponse', total?: number | null, payouts?: Array<{ __typename?: 'Payout', id: string, method: string, display: string, name: string, status: boolean, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null }> | null } };

export type UpdatePasswordMemberByIdMutationVariables = Exact<{
  data: UpdateMemberPasswordInputById;
}>;


export type UpdatePasswordMemberByIdMutation = { __typename?: 'Mutation', updatePasswordMemberById: { __typename?: 'Member', id: string } };

export type RemoveMemberMutationVariables = Exact<{
  data: IdInput;
}>;


export type RemoveMemberMutation = { __typename?: 'Mutation', removeMember: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult } };

export type RemoveCompleteMemberPlacementMutationVariables = Exact<{
  data: IdInput;
}>;


export type RemoveCompleteMemberPlacementMutation = { __typename?: 'Mutation', removeCompleteMemberPlacement: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult } };

export type MutationMutationVariables = Exact<{
  data: IdInput;
}>;


export type MutationMutation = { __typename?: 'Mutation', approveMember: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult } };

export type PaymentMethodsQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type PaymentMethodsQuery = { __typename?: 'Query', paymentMethods: { __typename?: 'PaymentMethodResponse', total?: number | null, paymentMethods?: Array<{ __typename?: 'PaymentMethod', id: string, name: string, visible: boolean, createdAt?: any | null, defaultLink?: string | null, paymentMethodLinks?: Array<{ __typename?: 'PaymentMethodLink', id: string, link: string, packageId: string, paymentMethodId: string }> | null }> | null } };

export type CreatePaymentMethodMutationVariables = Exact<{
  data: CreatePaymentMethodInput;
}>;


export type CreatePaymentMethodMutation = { __typename?: 'Mutation', createPaymentMethod: { __typename?: 'PaymentMethod', id: string } };

export type UpdatePaymentMethodMutationVariables = Exact<{
  data: UpdatePaymentMethodInput;
}>;


export type UpdatePaymentMethodMutation = { __typename?: 'Mutation', updatePaymentMethod: { __typename?: 'PaymentMethod', id: string } };

export type RemovePaymentMethodMutationVariables = Exact<{
  data: IdInput;
}>;


export type RemovePaymentMethodMutation = { __typename?: 'Mutation', removePaymentMethod: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult } };

export type PrepaidCommissionsQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type PrepaidCommissionsQuery = { __typename?: 'Query', prepaidCommissions: { __typename?: 'PrepaidCommissionResponse', total?: number | null, prepaidCommissions?: Array<{ __typename?: 'PrepaidCommission', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, commissionId: string, txId?: string | null, txType?: string | null, orderedAt: any, commission?: { __typename?: 'WeeklyCommission', commission: number, weekStartDate: any, pkgL: number, pkgR: number, member?: { __typename?: 'Member', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, username: string, fullName: string, sponsorId?: string | null, email: string, ID: string, mobile: string, assetId?: string | null, primaryAddress: string, secondaryAddress?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, placementParentId?: string | null, placementPosition: PlacementPosition, point: number, emailVerified: boolean, status: boolean, totalIntroducers: number, syncWithSendy: boolean, preferredContact?: string | null, preferredContactDetail?: string | null, commission?: { __typename?: 'CommissionStatus', begL: number, begR: number, newL: number, newR: number } | null } | null } | null, proof?: { __typename?: 'Proof', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, refId: string, type: ProofType, amount: number, note?: string | null, orderedAt: any, files?: Array<{ __typename?: 'PFile', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, url: string, originalName: string, mimeType: string, size: number }> | null, reflinks?: Array<{ __typename?: 'RefLink', linkType: string, link: string }> | null } | null }> | null } };

export type CommissionByMemberIdAndWeekQueryVariables = Exact<{
  data: WeeklyCommissionGetInput;
}>;


export type CommissionByMemberIdAndWeekQuery = { __typename?: 'Query', commissionByMemberIDAndWeek: { __typename?: 'WeeklyCommission', id: string, commission: number, pkgL: number, pkgR: number } };

export type CreatePrepaidCommissionMutationVariables = Exact<{
  data: CreatePrepaidCommissionInput;
}>;


export type CreatePrepaidCommissionMutation = { __typename?: 'Mutation', createPrepaidCommission: { __typename?: 'PrepaidCommission', id: string } };

export type UpdatePrepaidCommissionMutationVariables = Exact<{
  data: UpdatePrepaidCommissionInput;
}>;


export type UpdatePrepaidCommissionMutation = { __typename?: 'Mutation', updatePrepaidCommission: { __typename?: 'PrepaidCommission', id: string } };

export type RemovePrepaidCommissionMutationVariables = Exact<{
  data: IdInput;
}>;


export type RemovePrepaidCommissionMutation = { __typename?: 'Mutation', removePrepaidCommission: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult } };

export type PackagesQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type PackagesQuery = { __typename?: 'Query', packages: { __typename?: 'PackageResponse', total?: number | null, packages?: Array<{ __typename?: 'Package', id: string, date: any, point: number, token: number, amount: number, status: boolean, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, productName: string, enrollVisibility: boolean, sales?: Array<{ __typename?: 'Sale', id: string, ID: number, status: boolean, memberId: string, orderedAt: any, packageId: string, paymentMethod: string, proof?: { __typename?: 'Proof', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, refId: string, type: ProofType, amount: number, orderedAt: any, note?: string | null, files?: Array<{ __typename?: 'PFile', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, url: string, originalName: string, mimeType: string, size: number }> | null, reflinks?: Array<{ __typename?: 'RefLink', linkType: string, link: string }> | null } | null }> | null }> | null } };

export type FetchPackageStatsQueryVariables = Exact<{
  allFilter?: InputMaybe<Scalars['JSONObject']['input']>;
  inactiveFilter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type FetchPackageStatsQuery = { __typename?: 'Query', all: { __typename?: 'PackageResponse', total?: number | null }, inactive: { __typename?: 'PackageResponse', total?: number | null } };

export type CreatePackageMutationVariables = Exact<{
  data: CreatePackageInput;
}>;


export type CreatePackageMutation = { __typename?: 'Mutation', createPackage: { __typename?: 'Package', id: string } };

export type UpdatePackageMutationVariables = Exact<{
  data: UpdatePackageInput;
}>;


export type UpdatePackageMutation = { __typename?: 'Mutation', updatePackage: { __typename?: 'Package', id: string } };

export type RemovePackageMutationVariables = Exact<{
  data: IdInput;
}>;


export type RemovePackageMutation = { __typename?: 'Mutation', removePackage: { __typename?: 'SuccessResponse', result: SuccessResult } };

export type UpdatePasswordAdminMutationVariables = Exact<{
  data: UpdateAdminPasswordInput;
}>;


export type UpdatePasswordAdminMutation = { __typename?: 'Mutation', updatePasswordAdmin: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult } };

export type ProofsQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type ProofsQuery = { __typename?: 'Query', proofs: { __typename?: 'ProofResponse', total?: number | null, proofs?: Array<{ __typename?: 'Proof', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, refId: string, type: ProofType, amount: number, orderedAt: any, mineLocation?: string | null, note?: string | null, files?: Array<{ __typename?: 'PFile', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, url: string, originalName: string, mimeType: string, size: number }> | null, reflinks?: Array<{ __typename?: 'RefLink', linkType: string, link: string }> | null }> | null } };

export type CreateProofMutationVariables = Exact<{
  data: CreateProofInput;
}>;


export type CreateProofMutation = { __typename?: 'Mutation', createProof: { __typename?: 'Proof', id: string } };

export type UpdateProofMutationVariables = Exact<{
  data: UpdateProofByIdInput;
}>;


export type UpdateProofMutation = { __typename?: 'Mutation', updateProof: { __typename?: 'Proof', id: string } };

export type RemoveProofMutationVariables = Exact<{
  data: IdInput;
}>;


export type RemoveProofMutation = { __typename?: 'Mutation', removeProof: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult } };

export type FetchOnepointAwayMembersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type FetchOnepointAwayMembersQuery = { __typename?: 'Query', onepointAwayMembers: { __typename?: 'MembersResponse', total?: number | null, members?: Array<{ __typename?: 'Member', id: string, username: string, fullName: string, email: string, assetId?: string | null, mobile: string, totalIntroducers: number, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null }> | null } };

export type RewardQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type RewardQuery = { __typename?: 'Query', statistics: { __typename?: 'StatisticsResponse', total?: number | null, statistics?: Array<{ __typename?: 'Statistics', id: string, transactionId?: string | null, issuedAt: any, newBlocks: number, totalBlocks: number, totalHashPower: number, totalMembers: number, txcShared: any, from: any, to: any, status: boolean, statisticsSales?: Array<{ __typename?: 'StatisticsSale', id: string, saleId: string, issuedAt: any }> | null }> | null } };

export type FetchMemberStatisticsQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type FetchMemberStatisticsQuery = { __typename?: 'Query', memberStatistics: { __typename?: 'MemberStatisticsResponse', total?: number | null, memberStatistics?: Array<{ __typename?: 'MemberStatistics', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, memberId: string, statisticsId: string, txcShared: any, hashPower: number, percent: number, issuedAt: any, member?: { __typename?: 'Member', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, ID: string, username: string, fullName: string, email: string, point: number, mobile: string, assetId?: string | null, status: boolean, emailVerified: boolean, totalIntroducers: number, primaryAddress: string, secondaryAddress?: string | null, syncWithSendy: boolean, preferredContact?: string | null, preferredContactDetail?: string | null, cmnCalculatedWeeks: number, placementPosition: PlacementPosition, teamStrategy: TeamStrategy, commission?: { __typename?: 'CommissionStatus', begL: number, begR: number, newL: number, newR: number } | null, memberWallets?: Array<{ __typename?: 'MemberWallet', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, memberId: string, payoutId: string, address: string, percent: number, payout?: { __typename?: 'Payout', id: string, method: string, status: boolean, name: string, display: string, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null } | null }> | null } | null, statistics?: { __typename?: 'Statistics', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, transactionId?: string | null, newBlocks: number, totalBlocks: number, totalHashPower: number, totalMembers: number, status: boolean, txcShared: any, issuedAt: any, from: any, to: any } | null }> | null } };

export type ConfirmStatisticsMutationVariables = Exact<{
  data: ConfirmStatistics;
}>;


export type ConfirmStatisticsMutation = { __typename?: 'Mutation', confirmStatistics: { __typename?: 'Statistics', id: string } };

export type CreateStatisticsMutationVariables = Exact<{
  data: CreateStatisticsInput;
}>;


export type CreateStatisticsMutation = { __typename?: 'Mutation', createStatistics: { __typename?: 'Statistics', id: string, newBlocks: number } };

export type CreateManyMemberStatisticsMutationVariables = Exact<{
  data: CreateManyMemberStatisticsInput;
}>;


export type CreateManyMemberStatisticsMutation = { __typename?: 'Mutation', createManyMemberStatistics: { __typename?: 'ManySuccessResponse', count: number } };

export type UpdateStatisticsMutationVariables = Exact<{
  data: UpdateStatisticsInput;
}>;


export type UpdateStatisticsMutation = { __typename?: 'Mutation', updateStatistics: { __typename?: 'Statistics', status: boolean, txcShared: any } };

export type RemoveMemberStatisticsByStaitisIdMutationVariables = Exact<{
  data: IdInput;
}>;


export type RemoveMemberStatisticsByStaitisIdMutation = { __typename?: 'Mutation', removeMemberStatisticsByStaitisId: { __typename?: 'ManySuccessResponse', count: number } };

export type RemoveManyStatisticsMutationVariables = Exact<{
  data: IDsInput;
}>;


export type RemoveManyStatisticsMutation = { __typename?: 'Mutation', removeManyStatistics: { __typename?: 'ManySuccessResponse', count: number } };

export type FetchSalesQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type FetchSalesQuery = { __typename?: 'Query', sales: { __typename?: 'SalesResponse', total?: number | null, sales?: Array<{ __typename?: 'Sale', id: string, ID: number, memberId: string, packageId: string, createdAt?: any | null, updatedAt?: any | null, status: boolean, orderedAt: any, paymentMethod: string, proof?: { __typename?: 'Proof', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, refId: string, type: ProofType, amount: number, orderedAt: any, note?: string | null, files?: Array<{ __typename?: 'PFile', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, url: string, originalName: string, mimeType: string, size: number }> | null, reflinks?: Array<{ __typename?: 'RefLink', linkType: string, link: string }> | null } | null, member?: { __typename?: 'Member', id: string, ID: string, email: string, point: number, mobile: string, status: boolean, assetId?: string | null, username: string, fullName: string, syncWithSendy: boolean, emailVerified: boolean, primaryAddress: string, secondaryAddress?: string | null, totalIntroducers: number, preferredContact?: string | null, preferredContactDetail?: string | null, cmnCalculatedWeeks: number, placementPosition: PlacementPosition, teamStrategy: TeamStrategy, createdAt?: any | null, commission?: { __typename?: 'CommissionStatus', begL: number, begR: number, newL: number, newR: number } | null } | null, package?: { __typename?: 'Package', id: string, date: any, token: number, point: number, amount: number, status: boolean, productName: string, enrollVisibility: boolean } | null, statisticsSales?: Array<{ __typename?: 'StatisticsSale', id: string, saleId: string, issuedAt: any, statisticsId: string }> | null }> | null } };

export type FetchSaleStatsQueryVariables = Exact<{
  allFilter?: InputMaybe<Scalars['JSONObject']['input']>;
  inactiveFilter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type FetchSaleStatsQuery = { __typename?: 'Query', all: { __typename?: 'SalesResponse', total?: number | null }, inactive: { __typename?: 'SalesResponse', total?: number | null } };

export type CreateSaleMutationVariables = Exact<{
  data: CreateSaleInput;
}>;


export type CreateSaleMutation = { __typename?: 'Mutation', createSale: { __typename?: 'Sale', status: boolean, memberId: string, orderedAt: any, packageId: string, paymentMethod: string } };

export type UpdateSaleMutationVariables = Exact<{
  data: UpdateSaleInput;
}>;


export type UpdateSaleMutation = { __typename?: 'Mutation', updateSale: { __typename?: 'Sale', id: string, status: boolean } };

export type RemoveSaleMutationVariables = Exact<{
  data: IdInput;
}>;


export type RemoveSaleMutation = { __typename?: 'Mutation', removeSale: { __typename?: 'SuccessResponse', result: SuccessResult } };

export type LoginMutationVariables = Exact<{
  data: AdminLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', adminLogin: { __typename?: 'AdminLoginResponse', accessToken: string } };

export type QueryQueryVariables = Exact<{
  data: LiveStatsArgs;
}>;


export type QueryQuery = { __typename?: 'Query', liveBlockStats: { __typename?: 'EntityStats', meta?: number | null, total: number, dailyData: Array<{ __typename?: 'DailyStats', count: number, field: string }> }, liveMiningStats: { __typename?: 'EntityStats', meta?: number | null, total: number, dailyData: Array<{ __typename?: 'DailyStats', count: number, field: string }> }, liveUserStats: { __typename?: 'EntityStats', meta?: number | null, total: number, dailyData: Array<{ __typename?: 'DailyStats', count: number, field: string }> } };

export type BlocksQueryVariables = Exact<{
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type BlocksQuery = { __typename?: 'Query', blocks: { __typename?: 'BlocksResponse', total?: number | null, blocks?: Array<{ __typename?: 'Block', id: string, blockNo: number, hashRate: number, difficulty: number, issuedAt: any, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null }> | null } };

export type StatisticsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type StatisticsQuery = { __typename?: 'Query', statistics: { __typename?: 'StatisticsResponse', total?: number | null, statistics?: Array<{ __typename?: 'Statistics', id: string, totalHashPower: number, newBlocks: number, totalBlocks: number, totalMembers: number, txcShared: any, issuedAt: any, from: any, to: any, status: boolean, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null }> | null } };

export type TxcMemberStatisticsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type TxcMemberStatisticsQuery = { __typename?: 'Query', memberStatistics: { __typename?: 'MemberStatisticsResponse', total?: number | null, memberStatistics?: Array<{ __typename?: 'MemberStatistics', id: string, hashPower: number, txcShared: any, issuedAt: any, percent: number, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, member?: { __typename?: 'Member', username: string, email: string, assetId?: string | null } | null, statistics?: { __typename?: 'Statistics', newBlocks: number, status: boolean } | null }> | null } };

export type CreateAdminMutationVariables = Exact<{
  data: CreateAdminInput;
}>;


export type CreateAdminMutation = { __typename?: 'Mutation', createAdmin: { __typename?: 'Admin', id: string, username: string, email: string, createdAt?: any | null } };

export type UpdateAdminMutationVariables = Exact<{
  data: UpdateAdminInput;
}>;


export type UpdateAdminMutation = { __typename?: 'Mutation', updateAdmin: { __typename?: 'Admin', id: string, username: string, email: string, createdAt?: any | null } };

export type FetchUserQueryVariables = Exact<{
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type FetchUserQuery = { __typename?: 'Query', admins: { __typename?: 'AdminsResponse', admins?: Array<{ __typename?: 'Admin', id: string, avatar: string, username: string, email: string, deletedAt?: any | null }> | null } };

export type FetchUserStatsQueryVariables = Exact<{
  adminFilter?: InputMaybe<Scalars['JSONObject']['input']>;
  apFilter?: InputMaybe<Scalars['JSONObject']['input']>;
  inactiveFilter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type FetchUserStatsQuery = { __typename?: 'Query', all: { __typename?: 'AdminsResponse', total?: number | null }, admin: { __typename?: 'AdminsResponse', total?: number | null }, user: { __typename?: 'AdminsResponse', total?: number | null }, inactive: { __typename?: 'AdminsResponse', total?: number | null } };

export type FetchUsersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type FetchUsersQuery = { __typename?: 'Query', admins: { __typename?: 'AdminsResponse', total?: number | null, admins?: Array<{ __typename?: 'Admin', id: string, avatar: string, username: string, email: string, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null }> | null } };

export type RemoveUsersMutationVariables = Exact<{
  data: IDsInput;
}>;


export type RemoveUsersMutation = { __typename?: 'Mutation', removeAdmins: { __typename?: 'ManySuccessResponse', count: number } };

export type HistoryStatisticsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type HistoryStatisticsQuery = { __typename?: 'Query', statistics: { __typename?: 'StatisticsResponse', total?: number | null, statistics?: Array<{ __typename?: 'Statistics', id: string, totalHashPower: number, newBlocks: number, totalBlocks: number, totalMembers: number, txcShared: any, issuedAt: any, from: any, to: any, status: boolean, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null }> | null } };

export type BlocksDataQueryVariables = Exact<{
  data: PeriodStatsArgs;
}>;


export type BlocksDataQuery = { __typename?: 'Query', blocksData: Array<{ __typename?: 'BlockStatsResponse', hashRate: number, difficulty: number, base: string, baseDate?: any | null }> };

export type NewMemberCountsQueryVariables = Exact<{
  data: PeriodStatsArgs;
}>;


export type NewMemberCountsQuery = { __typename?: 'Query', newMemberCounts: Array<{ __typename?: 'MinerCountStatsResponse', base: string, baseDate: any, minerCount: number }> };

export type AverageMemberRewardQueryVariables = Exact<{
  data: PeriodStatsArgs;
}>;


export type AverageMemberRewardQuery = { __typename?: 'Query', averageMemberReward: Array<{ __typename?: 'AverageMinerRewardStatsResponse', base: string, baseDate: any, reward: number }> };

export type CommissionByPeriodQueryVariables = Exact<{
  data: PeriodStatsArgs;
}>;


export type CommissionByPeriodQuery = { __typename?: 'Query', commissionByPeriod: Array<{ __typename?: 'CommissionPeriodResponse', base: string, baseDate: any, commission: number, revenue: number }> };

export type RevenueOverviewQueryVariables = Exact<{ [key: string]: never; }>;


export type RevenueOverviewQuery = { __typename?: 'Query', revenueOverview: { __typename?: 'RevenueOverviewResponse', revenue: number, spent?: Array<{ __typename?: 'RevenueSpentItem', label: string, value: number }> | null } };

export type TotalMemberCountsQueryVariables = Exact<{
  data: PeriodStatsArgs;
}>;


export type TotalMemberCountsQuery = { __typename?: 'Query', totalMemberCounts: Array<{ __typename?: 'MinerCountStatsResponse', base: string, baseDate: any, minerCount: number }> };

export type TxcSharesQueryVariables = Exact<{
  data: PeriodStatsArgs;
}>;


export type TxcSharesQuery = { __typename?: 'Query', txcShares: Array<{ __typename?: 'TXCSharedResponse', base: string, baseDate: any, txc: number }> };

export type LatestStatisticsQueryVariables = Exact<{ [key: string]: never; }>;


export type LatestStatisticsQuery = { __typename?: 'Query', latestStatistics: Array<{ __typename?: 'LatestStatistics', id: string, newBlocks: number, totalMembers: number, txcShared: number, issuedAt: any }> };

export type TopEarnersQueryVariables = Exact<{ [key: string]: never; }>;


export type TopEarnersQuery = { __typename?: 'Query', topEarners: Array<{ __typename?: 'TopEarnersResponse', fullName: string, earned: number }> };

export type TopRecruitersQueryVariables = Exact<{ [key: string]: never; }>;


export type TopRecruitersQuery = { __typename?: 'Query', topRecruiters: Array<{ __typename?: 'TopRecruitersResponse', fullName: string, totalIntroducers: number }> };


export const FetchMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<FetchMeQuery, FetchMeQueryVariables>;
export const WeeklyCommissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WeeklyCommissions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weeklyCommissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weeklyCommissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"weekStartDate"}},{"kind":"Field","name":{"kind":"Name","value":"begL"}},{"kind":"Field","name":{"kind":"Name","value":"begR"}},{"kind":"Field","name":{"kind":"Name","value":"newL"}},{"kind":"Field","name":{"kind":"Name","value":"newR"}},{"kind":"Field","name":{"kind":"Name","value":"maxL"}},{"kind":"Field","name":{"kind":"Name","value":"maxR"}},{"kind":"Field","name":{"kind":"Name","value":"endL"}},{"kind":"Field","name":{"kind":"Name","value":"endR"}},{"kind":"Field","name":{"kind":"Name","value":"pkgL"}},{"kind":"Field","name":{"kind":"Name","value":"pkgR"}},{"kind":"Field","name":{"kind":"Name","value":"commission"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"shortNote"}},{"kind":"Field","name":{"kind":"Name","value":"proof"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"refId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reflinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"linkType"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}},{"kind":"Field","name":{"kind":"Name","value":"placementParentId"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<WeeklyCommissionsQuery, WeeklyCommissionsQueryVariables>;
export const FetchCommissionStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchCommissionStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"allFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pendingFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"declinedFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paidFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"approvedFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"all"},"name":{"kind":"Name","value":"weeklyCommissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"allFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"pending"},"name":{"kind":"Name","value":"weeklyCommissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pendingFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"declined"},"name":{"kind":"Name","value":"weeklyCommissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"declinedFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"paid"},"name":{"kind":"Name","value":"weeklyCommissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paidFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"approved"},"name":{"kind":"Name","value":"weeklyCommissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"approvedFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FetchCommissionStatsQuery, FetchCommissionStatsQueryVariables>;
export const CommissionsByWeekDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommissionsByWeek"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"weekStartDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTimeISO"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commissionsByWeek"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"weekStartDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"weekStartDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weekStartDate"}},{"kind":"Field","name":{"kind":"Name","value":"totalSale"}},{"kind":"Field","name":{"kind":"Name","value":"totalRevenue"}},{"kind":"Field","name":{"kind":"Name","value":"totalMember"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<CommissionsByWeekQuery, CommissionsByWeekQueryVariables>;
export const UpdateCommissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCommission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WeeklyCommissionUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCommission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}}]}}]}}]} as unknown as DocumentNode<UpdateCommissionMutation, UpdateCommissionMutationVariables>;
export const UpdateCommissionsStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCommissionsStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WeeklyCommissionsStatusUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCommissionsStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}}]} as unknown as DocumentNode<UpdateCommissionsStatusMutation, UpdateCommissionsStatusMutationVariables>;
export const CalculatePreviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CalculatePreview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"calculatePreview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}}]} as unknown as DocumentNode<CalculatePreviewMutation, CalculatePreviewMutationVariables>;
export const UpdateCommissionShortNoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCommissionShortNote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WeeklyCommissionNoteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCommissionShortNote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}}]}}]}}]} as unknown as DocumentNode<UpdateCommissionShortNoteMutation, UpdateCommissionShortNoteMutationVariables>;
export const AdminNotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminNotes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminNotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminNotes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"adminId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}},{"kind":"Field","name":{"kind":"Name","value":"placementParentId"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}},{"kind":"Field","name":{"kind":"Name","value":"syncWithSendy"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContact"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContactDetail"}},{"kind":"Field","name":{"kind":"Name","value":"commission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"begL"}},{"kind":"Field","name":{"kind":"Name","value":"begR"}},{"kind":"Field","name":{"kind":"Name","value":"newL"}},{"kind":"Field","name":{"kind":"Name","value":"newR"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<AdminNotesQuery, AdminNotesQueryVariables>;
export const CreateAdminNoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAdminNote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAdminNotesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAdminNote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}}]}}]}}]} as unknown as DocumentNode<CreateAdminNoteMutation, CreateAdminNoteMutationVariables>;
export const UpdateAdminNoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAdminNote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAdminNotesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAdminNote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateAdminNoteMutation, UpdateAdminNoteMutationVariables>;
export const RemoveAdminNoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveAdminNote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeAdminNote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}}]} as unknown as DocumentNode<RemoveAdminNoteMutation, RemoveAdminNoteMutationVariables>;
export const FetchMemberStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchMemberStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pendingFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inactiveFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"all"},"name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"pending"},"name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pendingFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"inactive"},"name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inactiveFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FetchMemberStatsQuery, FetchMemberStatsQueryVariables>;
export const FetchMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"logsize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}},{"kind":"Field","name":{"kind":"Name","value":"syncWithSendy"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContact"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContactDetail"}},{"kind":"Field","name":{"kind":"Name","value":"cmnCalculatedWeeks"}},{"kind":"Field","name":{"kind":"Name","value":"teamStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"commission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"begL"}},{"kind":"Field","name":{"kind":"Name","value":"begR"}},{"kind":"Field","name":{"kind":"Name","value":"newL"}},{"kind":"Field","name":{"kind":"Name","value":"newR"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sponsor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}},{"kind":"Field","name":{"kind":"Name","value":"syncWithSendy"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContact"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContactDetail"}},{"kind":"Field","name":{"kind":"Name","value":"cmnCalculatedWeeks"}},{"kind":"Field","name":{"kind":"Name","value":"teamStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"commission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"begL"}},{"kind":"Field","name":{"kind":"Name","value":"begR"}},{"kind":"Field","name":{"kind":"Name","value":"newL"}},{"kind":"Field","name":{"kind":"Name","value":"newR"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"placementParentId"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"placementParent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"syncWithSendy"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContact"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContactDetail"}},{"kind":"Field","name":{"kind":"Name","value":"cmnCalculatedWeeks"}},{"kind":"Field","name":{"kind":"Name","value":"teamStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"commission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"begL"}},{"kind":"Field","name":{"kind":"Name","value":"begR"}},{"kind":"Field","name":{"kind":"Name","value":"newL"}},{"kind":"Field","name":{"kind":"Name","value":"newR"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"placementChildren"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"syncWithSendy"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContact"}},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContactDetail"}},{"kind":"Field","name":{"kind":"Name","value":"cmnCalculatedWeeks"}},{"kind":"Field","name":{"kind":"Name","value":"teamStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"commission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"begL"}},{"kind":"Field","name":{"kind":"Name","value":"begR"}},{"kind":"Field","name":{"kind":"Name","value":"newL"}},{"kind":"Field","name":{"kind":"Name","value":"newR"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"sales"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"proof"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"refId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reflinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"linkType"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"memberWallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"payoutId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"percent"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"payout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"display"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"logsize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"logsize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"who"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"when"}},{"kind":"Field","name":{"kind":"Name","value":"entity"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"before"}},{"kind":"Field","name":{"kind":"Name","value":"after"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FetchMembersQuery, FetchMembersQueryVariables>;
export const FetchPlacementMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchPlacementMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorId"}},{"kind":"Field","name":{"kind":"Name","value":"cmnCalculatedWeeks"}},{"kind":"Field","name":{"kind":"Name","value":"placementParentId"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"placementParent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sponsor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"commission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"begL"}},{"kind":"Field","name":{"kind":"Name","value":"begR"}},{"kind":"Field","name":{"kind":"Name","value":"newL"}},{"kind":"Field","name":{"kind":"Name","value":"newR"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FetchPlacementMembersQuery, FetchPlacementMembersQueryVariables>;
export const CreateMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMemberInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}}]}}]}}]} as unknown as DocumentNode<CreateMemberMutation, CreateMemberMutationVariables>;
export const UpdateMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMemberInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}}]}}]}}]} as unknown as DocumentNode<UpdateMemberMutation, UpdateMemberMutationVariables>;
export const MemberOverviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MemberOverview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MemberOverviewInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberOverview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentHashPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalTXCShared"}},{"kind":"Field","name":{"kind":"Name","value":"joinDate"}}]}}]}}]} as unknown as DocumentNode<MemberOverviewQuery, MemberOverviewQueryVariables>;
export const MemberStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MemberStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberStatistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"hashPower"}},{"kind":"Field","name":{"kind":"Name","value":"txcShared"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<MemberStatisticsQuery, MemberStatisticsQueryVariables>;
export const PayoutsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Payouts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payouts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payouts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"display"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<PayoutsQuery, PayoutsQueryVariables>;
export const UpdatePasswordMemberByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePasswordMemberById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMemberPasswordInputById"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePasswordMemberById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdatePasswordMemberByIdMutation, UpdatePasswordMemberByIdMutationVariables>;
export const RemoveMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}}]} as unknown as DocumentNode<RemoveMemberMutation, RemoveMemberMutationVariables>;
export const RemoveCompleteMemberPlacementDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveCompleteMemberPlacement"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeCompleteMemberPlacement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}}]} as unknown as DocumentNode<RemoveCompleteMemberPlacementMutation, RemoveCompleteMemberPlacementMutationVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approveMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const PaymentMethodsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaymentMethods"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paymentMethods"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paymentMethods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"defaultLink"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethodLinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethodId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<PaymentMethodsQuery, PaymentMethodsQueryVariables>;
export const CreatePaymentMethodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePaymentMethod"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePaymentMethodInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPaymentMethod"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreatePaymentMethodMutation, CreatePaymentMethodMutationVariables>;
export const UpdatePaymentMethodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePaymentMethod"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePaymentMethodInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePaymentMethod"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdatePaymentMethodMutation, UpdatePaymentMethodMutationVariables>;
export const RemovePaymentMethodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemovePaymentMethod"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removePaymentMethod"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}}]} as unknown as DocumentNode<RemovePaymentMethodMutation, RemovePaymentMethodMutationVariables>;
export const PrepaidCommissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PrepaidCommissions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"prepaidCommissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"prepaidCommissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"commissionId"}},{"kind":"Field","name":{"kind":"Name","value":"txId"}},{"kind":"Field","name":{"kind":"Name","value":"txType"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}},{"kind":"Field","name":{"kind":"Name","value":"commission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commission"}},{"kind":"Field","name":{"kind":"Name","value":"weekStartDate"}},{"kind":"Field","name":{"kind":"Name","value":"pkgL"}},{"kind":"Field","name":{"kind":"Name","value":"pkgR"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}},{"kind":"Field","name":{"kind":"Name","value":"placementParentId"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}},{"kind":"Field","name":{"kind":"Name","value":"syncWithSendy"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContact"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContactDetail"}},{"kind":"Field","name":{"kind":"Name","value":"commission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"begL"}},{"kind":"Field","name":{"kind":"Name","value":"begR"}},{"kind":"Field","name":{"kind":"Name","value":"newL"}},{"kind":"Field","name":{"kind":"Name","value":"newR"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"proof"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"refId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reflinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"linkType"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<PrepaidCommissionsQuery, PrepaidCommissionsQueryVariables>;
export const CommissionByMemberIdAndWeekDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommissionByMemberIDAndWeek"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WeeklyCommissionGetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commissionByMemberIDAndWeek"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"commission"}},{"kind":"Field","name":{"kind":"Name","value":"pkgL"}},{"kind":"Field","name":{"kind":"Name","value":"pkgR"}}]}}]}}]} as unknown as DocumentNode<CommissionByMemberIdAndWeekQuery, CommissionByMemberIdAndWeekQueryVariables>;
export const CreatePrepaidCommissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePrepaidCommission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePrepaidCommissionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPrepaidCommission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreatePrepaidCommissionMutation, CreatePrepaidCommissionMutationVariables>;
export const UpdatePrepaidCommissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePrepaidCommission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePrepaidCommissionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePrepaidCommission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdatePrepaidCommissionMutation, UpdatePrepaidCommissionMutationVariables>;
export const RemovePrepaidCommissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemovePrepaidCommission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removePrepaidCommission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}}]} as unknown as DocumentNode<RemovePrepaidCommissionMutation, RemovePrepaidCommissionMutationVariables>;
export const PackagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Packages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"enrollVisibility"}},{"kind":"Field","name":{"kind":"Name","value":"sales"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"proof"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"refId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reflinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"linkType"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<PackagesQuery, PackagesQueryVariables>;
export const FetchPackageStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchPackageStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"allFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inactiveFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"all"},"name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"allFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"inactive"},"name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inactiveFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FetchPackageStatsQuery, FetchPackageStatsQueryVariables>;
export const CreatePackageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePackage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePackageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreatePackageMutation, CreatePackageMutationVariables>;
export const UpdatePackageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePackage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePackageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdatePackageMutation, UpdatePackageMutationVariables>;
export const RemovePackageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemovePackage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removePackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}}]} as unknown as DocumentNode<RemovePackageMutation, RemovePackageMutationVariables>;
export const UpdatePasswordAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePasswordAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAdminPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePasswordAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}}]} as unknown as DocumentNode<UpdatePasswordAdminMutation, UpdatePasswordAdminMutationVariables>;
export const ProofsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Proofs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proofs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proofs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"refId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}},{"kind":"Field","name":{"kind":"Name","value":"mineLocation"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reflinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"linkType"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<ProofsQuery, ProofsQueryVariables>;
export const CreateProofDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProof"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProofInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProof"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateProofMutation, CreateProofMutationVariables>;
export const UpdateProofDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProof"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProofByIDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProof"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateProofMutation, UpdateProofMutationVariables>;
export const RemoveProofDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveProof"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProof"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}}]} as unknown as DocumentNode<RemoveProofMutation, RemoveProofMutationVariables>;
export const FetchOnepointAwayMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchOnepointAwayMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onepointAwayMembers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FetchOnepointAwayMembersQuery, FetchOnepointAwayMembersQueryVariables>;
export const RewardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Reward"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"transactionId"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"newBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalHashPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalMembers"}},{"kind":"Field","name":{"kind":"Name","value":"txcShared"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"statisticsSales"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"saleId"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<RewardQuery, RewardQueryVariables>;
export const FetchMemberStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchMemberStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberStatistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"statisticsId"}},{"kind":"Field","name":{"kind":"Name","value":"txcShared"}},{"kind":"Field","name":{"kind":"Name","value":"hashPower"}},{"kind":"Field","name":{"kind":"Name","value":"percent"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}},{"kind":"Field","name":{"kind":"Name","value":"syncWithSendy"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContact"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContactDetail"}},{"kind":"Field","name":{"kind":"Name","value":"cmnCalculatedWeeks"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"teamStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"commission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"begL"}},{"kind":"Field","name":{"kind":"Name","value":"begR"}},{"kind":"Field","name":{"kind":"Name","value":"newL"}},{"kind":"Field","name":{"kind":"Name","value":"newR"}}]}},{"kind":"Field","name":{"kind":"Name","value":"memberWallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"payoutId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"percent"}},{"kind":"Field","name":{"kind":"Name","value":"payout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"display"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"transactionId"}},{"kind":"Field","name":{"kind":"Name","value":"newBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalHashPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalMembers"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"txcShared"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FetchMemberStatisticsQuery, FetchMemberStatisticsQueryVariables>;
export const ConfirmStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConfirmStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ConfirmStatistics"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ConfirmStatisticsMutation, ConfirmStatisticsMutationVariables>;
export const CreateStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateStatisticsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"newBlocks"}}]}}]}}]} as unknown as DocumentNode<CreateStatisticsMutation, CreateStatisticsMutationVariables>;
export const CreateManyMemberStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateManyMemberStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateManyMemberStatisticsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createManyMemberStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<CreateManyMemberStatisticsMutation, CreateManyMemberStatisticsMutationVariables>;
export const UpdateStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateStatisticsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"txcShared"}}]}}]}}]} as unknown as DocumentNode<UpdateStatisticsMutation, UpdateStatisticsMutationVariables>;
export const RemoveMemberStatisticsByStaitisIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveMemberStatisticsByStaitisId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeMemberStatisticsByStaitisId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<RemoveMemberStatisticsByStaitisIdMutation, RemoveMemberStatisticsByStaitisIdMutationVariables>;
export const RemoveManyStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveManyStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeManyStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<RemoveManyStatisticsMutation, RemoveManyStatisticsMutationVariables>;
export const FetchSalesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchSales"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sales"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sales"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"proof"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"refId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reflinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"linkType"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"commission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"begL"}},{"kind":"Field","name":{"kind":"Name","value":"begR"}},{"kind":"Field","name":{"kind":"Name","value":"newL"}},{"kind":"Field","name":{"kind":"Name","value":"newR"}}]}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"syncWithSendy"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContact"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContactDetail"}},{"kind":"Field","name":{"kind":"Name","value":"cmnCalculatedWeeks"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"teamStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"enrollVisibility"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statisticsSales"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"saleId"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"statisticsId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"proof"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"refId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reflinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"linkType"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FetchSalesQuery, FetchSalesQueryVariables>;
export const FetchSaleStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchSaleStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"allFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inactiveFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"all"},"name":{"kind":"Name","value":"sales"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"allFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"inactive"},"name":{"kind":"Name","value":"sales"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inactiveFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FetchSaleStatsQuery, FetchSaleStatsQueryVariables>;
export const CreateSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSale"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSaleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSale"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}}]}}]}}]} as unknown as DocumentNode<CreateSaleMutation, CreateSaleMutationVariables>;
export const UpdateSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSale"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSaleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSale"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateSaleMutation, UpdateSaleMutationVariables>;
export const RemoveSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveSale"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSale"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}}]} as unknown as DocumentNode<RemoveSaleMutation, RemoveSaleMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminLoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LiveStatsArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"liveBlockStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dailyData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"field"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"liveMiningStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dailyData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"field"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"liveUserStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dailyData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"field"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const BlocksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Blocks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"blockNo"}},{"kind":"Field","name":{"kind":"Name","value":"hashRate"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<BlocksQuery, BlocksQueryVariables>;
export const StatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Statistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalHashPower"}},{"kind":"Field","name":{"kind":"Name","value":"newBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalMembers"}},{"kind":"Field","name":{"kind":"Name","value":"txcShared"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<StatisticsQuery, StatisticsQueryVariables>;
export const TxcMemberStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TXCMemberStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberStatistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hashPower"}},{"kind":"Field","name":{"kind":"Name","value":"txcShared"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"percent"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<TxcMemberStatisticsQuery, TxcMemberStatisticsQueryVariables>;
export const CreateAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAdminInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateAdminMutation, CreateAdminMutationVariables>;
export const UpdateAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAdminInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UpdateAdminMutation, UpdateAdminMutationVariables>;
export const FetchUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admins"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admins"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]}}]}}]} as unknown as DocumentNode<FetchUserQuery, FetchUserQueryVariables>;
export const FetchUserStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchUserStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"adminFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"apFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inactiveFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"all"},"name":{"kind":"Name","value":"admins"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"admin"},"name":{"kind":"Name","value":"admins"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"adminFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"admins"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"apFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"inactive"},"name":{"kind":"Name","value":"admins"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inactiveFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FetchUserStatsQuery, FetchUserStatsQueryVariables>;
export const FetchUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admins"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admins"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FetchUsersQuery, FetchUsersQueryVariables>;
export const RemoveUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeAdmins"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<RemoveUsersMutation, RemoveUsersMutationVariables>;
export const HistoryStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HistoryStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalHashPower"}},{"kind":"Field","name":{"kind":"Name","value":"newBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalMembers"}},{"kind":"Field","name":{"kind":"Name","value":"txcShared"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<HistoryStatisticsQuery, HistoryStatisticsQueryVariables>;
export const BlocksDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BlocksData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PeriodStatsArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blocksData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hashRate"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"baseDate"}}]}}]}}]} as unknown as DocumentNode<BlocksDataQuery, BlocksDataQueryVariables>;
export const NewMemberCountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NewMemberCounts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PeriodStatsArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newMemberCounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"baseDate"}},{"kind":"Field","name":{"kind":"Name","value":"minerCount"}}]}}]}}]} as unknown as DocumentNode<NewMemberCountsQuery, NewMemberCountsQueryVariables>;
export const AverageMemberRewardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AverageMemberReward"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PeriodStatsArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageMemberReward"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"baseDate"}},{"kind":"Field","name":{"kind":"Name","value":"reward"}}]}}]}}]} as unknown as DocumentNode<AverageMemberRewardQuery, AverageMemberRewardQueryVariables>;
export const CommissionByPeriodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommissionByPeriod"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PeriodStatsArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commissionByPeriod"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"baseDate"}},{"kind":"Field","name":{"kind":"Name","value":"commission"}},{"kind":"Field","name":{"kind":"Name","value":"revenue"}}]}}]}}]} as unknown as DocumentNode<CommissionByPeriodQuery, CommissionByPeriodQueryVariables>;
export const RevenueOverviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RevenueOverview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revenueOverview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revenue"}},{"kind":"Field","name":{"kind":"Name","value":"spent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<RevenueOverviewQuery, RevenueOverviewQueryVariables>;
export const TotalMemberCountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TotalMemberCounts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PeriodStatsArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalMemberCounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"baseDate"}},{"kind":"Field","name":{"kind":"Name","value":"minerCount"}}]}}]}}]} as unknown as DocumentNode<TotalMemberCountsQuery, TotalMemberCountsQueryVariables>;
export const TxcSharesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TxcShares"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PeriodStatsArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"txcShares"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"baseDate"}},{"kind":"Field","name":{"kind":"Name","value":"txc"}}]}}]}}]} as unknown as DocumentNode<TxcSharesQuery, TxcSharesQueryVariables>;
export const LatestStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LatestStatistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latestStatistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"newBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalMembers"}},{"kind":"Field","name":{"kind":"Name","value":"txcShared"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}}]}}]}}]} as unknown as DocumentNode<LatestStatisticsQuery, LatestStatisticsQueryVariables>;
export const TopEarnersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TopEarners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topEarners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"earned"}}]}}]}}]} as unknown as DocumentNode<TopEarnersQuery, TopEarnersQueryVariables>;
export const TopRecruitersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TopRecruiters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topRecruiters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}}]}}]}}]} as unknown as DocumentNode<TopRecruitersQuery, TopRecruitersQueryVariables>;