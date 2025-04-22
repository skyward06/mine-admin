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
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any; }
};

export type AccessTokenResponse = {
  __typename?: 'AccessTokenResponse';
  accessToken: Scalars['String']['output'];
};

export type Admin = {
  __typename?: 'Admin';
  OTPEnabled: Scalars['Boolean']['output'];
  adminNotes?: Maybe<Array<AdminNotes>>;
  avatar: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  email: Scalars['String']['output'];
  frontActions?: Maybe<Array<FrontAction>>;
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  role?: Maybe<Role>;
  roleId: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  username: Scalars['String']['output'];
};

export type AdminLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type AdminNotes = {
  __typename?: 'AdminNotes';
  admin?: Maybe<Admin>;
  adminId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  frontActions?: Maybe<Array<FrontAction>>;
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

export type ApproveCommissionWithTxId = {
  ids: Array<Scalars['ID']['input']>;
  txID: Scalars['ID']['input'];
};

export type ApproveCommissionWithTxIdInput = {
  txData: Array<ApproveCommissionWithTxId>;
};

export type AverageMinerRewardStatsResponse = {
  __typename?: 'AverageMinerRewardStatsResponse';
  base: Scalars['String']['output'];
  baseDate: Scalars['DateTimeISO']['output'];
  reward: Scalars['Float']['output'];
};

export type BasicGroupSetting = {
  __typename?: 'BasicGroupSetting';
  commissionDefaults: Array<CommissionDefaultEnum>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type BasicListMember = {
  __typename?: 'BasicListMember';
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  mobile: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type BasicSale = {
  __typename?: 'BasicSale';
  ID: Scalars['Int']['output'];
  amount: Scalars['Float']['output'];
  assetId: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isMetal: Scalars['Boolean']['output'];
  memberId: Scalars['String']['output'];
  orderedAt: Scalars['DateTimeISO']['output'];
  paymentMethod: Scalars['String']['output'];
  point: Scalars['Float']['output'];
  productName: Scalars['String']['output'];
  sponsorCnt: Scalars['Float']['output'];
  status: Scalars['Boolean']['output'];
  toEmail?: Maybe<Scalars['String']['output']>;
  toFullName?: Maybe<Scalars['String']['output']>;
  toMemberId?: Maybe<Scalars['String']['output']>;
  toUsername?: Maybe<Scalars['String']['output']>;
  token: Scalars['Float']['output'];
  username: Scalars['String']['output'];
};

export type BasicSalesResponse = {
  __typename?: 'BasicSalesResponse';
  sales?: Maybe<Array<BasicSale>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type BasicWeeklyCommission = {
  __typename?: 'BasicWeeklyCommission';
  ID: Scalars['Int']['output'];
  begL: Scalars['Int']['output'];
  begR: Scalars['Int']['output'];
  cash: Scalars['Int']['output'];
  commission: Scalars['Int']['output'];
  commissionDefault: CommissionDefaultEnum;
  createdAt: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  endL: Scalars['Int']['output'];
  endR: Scalars['Int']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  invoice?: Maybe<Invoice>;
  isTexitRanger: Scalars['Boolean']['output'];
  maxL: Scalars['Int']['output'];
  maxR: Scalars['Int']['output'];
  memberId: Scalars['ID']['output'];
  newL: Scalars['Int']['output'];
  newR: Scalars['Int']['output'];
  note?: Maybe<Scalars['String']['output']>;
  pkgL: Scalars['Int']['output'];
  pkgR: Scalars['Int']['output'];
  qualified: Scalars['Boolean']['output'];
  shortNote?: Maybe<Scalars['String']['output']>;
  status: ConfirmationStatus;
  username: Scalars['String']['output'];
  weekStartDate: Scalars['Date']['output'];
};

export type BasicWeeklyCommissionResponse = {
  __typename?: 'BasicWeeklyCommissionResponse';
  total?: Maybe<Scalars['Int']['output']>;
  weeklyCommissions?: Maybe<Array<BasicWeeklyCommission>>;
};

export type Block = {
  __typename?: 'Block';
  blockNo: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  difficulty: Scalars['Float']['output'];
  frontActions?: Maybe<Array<FrontAction>>;
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
  soldHashPower: Scalars['Float']['output'];
};

export type BlocksResponse = {
  __typename?: 'BlocksResponse';
  blocks?: Maybe<Array<Block>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type Campaign = {
  __typename?: 'Campaign';
  body: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  frontActions?: Maybe<Array<FrontAction>>;
  id: Scalars['ID']['output'];
  listExtra?: Maybe<Scalars['JSON']['output']>;
  listType: CampaignListType;
  recipients?: Maybe<Array<CampaignMember>>;
  sender: Scalars['String']['output'];
  subject: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export enum CampaignListType {
  All = 'ALL',
  Custom = 'CUSTOM',
  Group = 'GROUP',
  PendingManualCommission = 'PENDING_MANUAL_COMMISSION',
  WeeklySponsor = 'WEEKLY_SPONSOR'
}

export type CampaignMember = {
  __typename?: 'CampaignMember';
  body?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  open: Scalars['Boolean']['output'];
  openTime?: Maybe<Scalars['DateTimeISO']['output']>;
  sender: Scalars['String']['output'];
  sent: Scalars['Boolean']['output'];
  sentTime?: Maybe<Scalars['DateTimeISO']['output']>;
  subject?: Maybe<Scalars['String']['output']>;
};

export type CampaignResponse = {
  __typename?: 'CampaignResponse';
  campaigns?: Maybe<Array<Campaign>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export enum CommissionDefaultEnum {
  Bogo = 'BOGO',
  CashCrypto = 'CASH_CRYPTO',
  Hash = 'HASH',
  Manual = 'MANUAL',
  Txc = 'TXC'
}

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

export type CommissionSendmany = {
  __typename?: 'CommissionSendmany';
  command: Scalars['String']['output'];
  ids: Array<Scalars['ID']['output']>;
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
  fullName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  roleId?: InputMaybe<Scalars['String']['input']>;
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

export type CreateCampaignInput = {
  body: Scalars['String']['input'];
  listExtra?: InputMaybe<Scalars['String']['input']>;
  listType: CampaignListType;
  sender: Scalars['String']['input'];
  subject: Scalars['String']['input'];
};

export type CreateEmailTemplateInput = {
  body: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  subject: Scalars['String']['input'];
};

export type CreateGroupSettingCommissionBonusInput = {
  commission: Scalars['Int']['input'];
  lPoint: Scalars['Int']['input'];
  qPackageId: Scalars['ID']['input'];
  rPoint: Scalars['Int']['input'];
  uPackageId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateGroupSettingInput = {
  commissionDefaults: Array<CommissionDefaultEnum>;
  groupSettingCommissionBonuses: Array<CreateGroupSettingCommissionBonusInput>;
  limitDate: Scalars['DateTimeISO']['input'];
  name: Scalars['String']['input'];
  rollSponsorBonusPackageId?: InputMaybe<Scalars['ID']['input']>;
  sponsorBonusPackageId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateInvoiceInput = {
  amount: Scalars['Float']['input'];
  amountInCents: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  dueDate: Scalars['Date']['input'];
  fileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  reflinks?: InputMaybe<Array<LinkInput>>;
  status: InvoiceStatusEnum;
};

export type CreateManyMemberStatisticsInput = {
  memberStatistics: Array<CreateMemberStatisticsInput>;
};

export type CreateManyStatisticsSaleInput = {
  statisticsSales: Array<CreateStatisticsSaleInput>;
};

export type CreateMemberInput = {
  assetId: Scalars['String']['input'];
  avatar?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  commissionDefault?: InputMaybe<CommissionDefaultEnum>;
  country?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  isTexitRanger?: InputMaybe<Scalars['Boolean']['input']>;
  mobile: Scalars['String']['input'];
  placementParentId?: InputMaybe<Scalars['ID']['input']>;
  placementPosition?: InputMaybe<PlacementPosition>;
  preferredContact?: InputMaybe<Scalars['String']['input']>;
  preferredContactDetail?: InputMaybe<Scalars['String']['input']>;
  primaryAddress: Scalars['String']['input'];
  promoCode?: InputMaybe<Scalars['String']['input']>;
  secondaryAddress?: InputMaybe<Scalars['String']['input']>;
  sponsorId: Scalars['ID']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
  syncWithSendy?: InputMaybe<Scalars['Boolean']['input']>;
  teamReport?: InputMaybe<Array<TeamReport>>;
  teamStrategy?: InputMaybe<TeamStrategy>;
  username: Scalars['String']['input'];
  wallets: Array<MemberWalletDataInput>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type CreateMemberListInput = {
  emails: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
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

export type CreatePromoInput = {
  code: Scalars['String']['input'];
  description: Scalars['String']['input'];
  endDate: Scalars['Date']['input'];
  startDate: Scalars['Date']['input'];
  status?: InputMaybe<Scalars['Boolean']['input']>;
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
  vendor?: InputMaybe<Scalars['String']['input']>;
};

export type CreateRoleInput = {
  commission: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  role: Scalars['Int']['input'];
  sale: Scalars['Int']['input'];
};

export type CreateSaleInput = {
  fileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  isMetal?: InputMaybe<Scalars['Boolean']['input']>;
  memberId: Scalars['ID']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  orderedAt: Scalars['DateTimeISO']['input'];
  packageId: Scalars['ID']['input'];
  paymentMethod: Scalars['String']['input'];
  reflinks?: InputMaybe<Array<LinkInput>>;
  sponsorCnt?: InputMaybe<Scalars['Float']['input']>;
  status: Scalars['Boolean']['input'];
  toMemberId?: InputMaybe<Scalars['ID']['input']>;
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

export type Email = {
  __typename?: 'Email';
  body: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  files?: Maybe<Array<PFile>>;
  frontActions?: Maybe<Array<FrontAction>>;
  id: Scalars['ID']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isDraft: Scalars['Boolean']['output'];
  recipients?: Maybe<Array<Recipient>>;
  repliedEmails?: Maybe<Array<Email>>;
  replyFrom?: Maybe<Email>;
  replyFromId?: Maybe<Scalars['String']['output']>;
  sender?: Maybe<Member>;
  senderId: Scalars['String']['output'];
  subject: Scalars['String']['output'];
  to: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type EmailInput = {
  email: Scalars['String']['input'];
};

export type EmailResponse = {
  __typename?: 'EmailResponse';
  emails?: Maybe<Array<Email>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type EmailStatusInput = {
  id: Scalars['ID']['input'];
  isDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  isStarred?: InputMaybe<Scalars['Boolean']['input']>;
};

export type EmailTemplate = {
  __typename?: 'EmailTemplate';
  body: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  frontActions?: Maybe<Array<FrontAction>>;
  id: Scalars['ID']['output'];
  subject: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type EmailTemplateResponse = {
  __typename?: 'EmailTemplateResponse';
  templates?: Maybe<Array<EmailTemplate>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type EmailVerifyResult = {
  __typename?: 'EmailVerifyResult';
  message?: Maybe<Scalars['String']['output']>;
  packageID?: Maybe<Scalars['Int']['output']>;
  paymentMethod?: Maybe<Scalars['String']['output']>;
  result: SuccessResult;
};

export type EntityLog = {
  __typename?: 'EntityLog';
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

export type EntityStats = {
  __typename?: 'EntityStats';
  dailyData: Array<DailyStats>;
  meta?: Maybe<Scalars['Float']['output']>;
  total: Scalars['Float']['output'];
};

export type FrontAction = {
  __typename?: 'FrontAction';
  action: FrontActionEnum;
  extra?: Maybe<FrontActionExtra>;
  message: Scalars['String']['output'];
};

export type FrontActionCreate12FreeBonusSale = {
  __typename?: 'FrontActionCreate12FreeBonusSale';
  fullName: Scalars['String']['output'];
  isWithinSponsorRollDuration: Scalars['Boolean']['output'];
  memberId: Scalars['ID']['output'];
  packageId: Scalars['ID']['output'];
  packageName: Scalars['String']['output'];
  paymentMethod: Scalars['String']['output'];
  sponsorCnt: Scalars['Int']['output'];
  type: FrontActionEnum;
  username: Scalars['String']['output'];
};

export enum FrontActionEnum {
  Create12Freebonussale = 'CREATE12FREEBONUSSALE',
  Remove12Freebonussale = 'REMOVE12FREEBONUSSALE',
  Update12Freebonussale = 'UPDATE12FREEBONUSSALE'
}

export type FrontActionExtra = FrontActionCreate12FreeBonusSale | FrontActionRemove12FreeBonusSale | FrontActionUpdate12FreeBonusSale;

export type FrontActionRemove12FreeBonusSale = {
  __typename?: 'FrontActionRemove12FreeBonusSale';
  ID: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  type: FrontActionEnum;
};

export type FrontActionUpdate12FreeBonusSale = {
  __typename?: 'FrontActionUpdate12FreeBonusSale';
  ID: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  newPackageId: Scalars['ID']['output'];
  newPackageName: Scalars['String']['output'];
  oldPackageId: Scalars['ID']['output'];
  oldPackageName: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
  type: FrontActionEnum;
};

export type GenerateWeeklyReportInput = {
  all: Scalars['Boolean']['input'];
};

export type GroupSetting = {
  __typename?: 'GroupSetting';
  commissionDefaults: Array<CommissionDefaultEnum>;
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  frontActions?: Maybe<Array<FrontAction>>;
  groupSettingCommissionBonuses: Array<GroupSettingCommissionBonus>;
  id: Scalars['ID']['output'];
  limitDate: Scalars['DateTimeISO']['output'];
  name: Scalars['String']['output'];
  rollSponsorBonusPackage?: Maybe<Package>;
  rollSponsorBonusPackageId?: Maybe<Scalars['String']['output']>;
  sponsorBonusPackage?: Maybe<Package>;
  sponsorBonusPackageId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type GroupSettingCommissionBonus = {
  __typename?: 'GroupSettingCommissionBonus';
  commission: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  frontActions?: Maybe<Array<FrontAction>>;
  lPoint: Scalars['Int']['output'];
  qPackageId: Scalars['ID']['output'];
  rPoint: Scalars['Int']['output'];
  uPackageId?: Maybe<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type GroupSettingResponse = {
  __typename?: 'GroupSettingResponse';
  groupSettings?: Maybe<Array<GroupSetting>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type HashPowerResponse = {
  __typename?: 'HashPowerResponse';
  actualHashPower: Scalars['Float']['output'];
  soldHashPower: Scalars['Float']['output'];
};

export type IdInput = {
  id: Scalars['ID']['input'];
};

export type IdnInput = {
  ID: Scalars['Int']['input'];
};

export type IDsInput = {
  ids: Array<Scalars['ID']['input']>;
};

export type IndividualMember = {
  __typename?: 'IndividualMember';
  createdAt: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  sponsorFullname?: Maybe<Scalars['String']['output']>;
  sponsorId?: Maybe<Scalars['String']['output']>;
  sponsorUsername?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type Introducer = {
  __typename?: 'Introducer';
  ID: Scalars['Int']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  mobile: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type IntroducersResponse = {
  __typename?: 'IntroducersResponse';
  introducers?: Maybe<Array<Introducer>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type Invoice = {
  __typename?: 'Invoice';
  amountInCents: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  description: Scalars['String']['output'];
  dueDate: Scalars['Date']['output'];
  frontActions?: Maybe<Array<FrontAction>>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  proof?: Maybe<Proof>;
  status: InvoiceStatusEnum;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type InvoiceResponse = {
  __typename?: 'InvoiceResponse';
  invoices?: Maybe<Array<Invoice>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export enum InvoiceStatusEnum {
  Paid = 'PAID',
  Pending = 'PENDING'
}

export type InvoiceWeekInput = {
  weekStartDate: Scalars['Date']['input'];
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

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String']['output'];
  status: LoginResult;
};

export enum LoginResult {
  Otp = 'otp',
  Success = 'success'
}

export type ManySuccessResponse = {
  __typename?: 'ManySuccessResponse';
  count: Scalars['Float']['output'];
};

export type Member = {
  __typename?: 'Member';
  ID?: Maybe<Scalars['Int']['output']>;
  OTPEnabled: Scalars['Boolean']['output'];
  adminNotes?: Maybe<Array<AdminNotes>>;
  allowState: MemberState;
  assetId?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  cmnCalculatedWeeks: Scalars['Int']['output'];
  commission?: Maybe<CommissionStatus>;
  commissionDefault: CommissionDefaultEnum;
  communications?: Maybe<Array<CampaignMember>>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  frontActions?: Maybe<Array<FrontAction>>;
  fullName: Scalars['String']['output'];
  groupSetting?: Maybe<BasicGroupSetting>;
  id: Scalars['ID']['output'];
  introduceMembers?: Maybe<Array<Member>>;
  isTexitRanger: Scalars['Boolean']['output'];
  logs?: Maybe<Array<EntityLog>>;
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
  promoCode?: Maybe<Scalars['String']['output']>;
  sales?: Maybe<Array<Sale>>;
  secondaryAddress?: Maybe<Scalars['String']['output']>;
  setting?: Maybe<Setting>;
  signupFormRequest?: Maybe<Scalars['JSONObject']['output']>;
  sponsor?: Maybe<Member>;
  sponsorId?: Maybe<Scalars['ID']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  statistics?: Maybe<Array<MemberStatistics>>;
  status: Scalars['Boolean']['output'];
  syncWithSendy: Scalars['Boolean']['output'];
  teamReport: Array<TeamReport>;
  teamStrategy: TeamStrategy;
  totalIntroducers: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  username: Scalars['String']['output'];
  weekIntroducers?: Maybe<Scalars['Int']['output']>;
  weeklyCommissions?: Maybe<Array<WeeklyCommission>>;
  zipCode?: Maybe<Scalars['String']['output']>;
};


export type MemberLogsArgs = {
  logsize?: Scalars['Float']['input'];
};


export type MemberWeekIntroducersArgs = {
  week: Scalars['Date']['input'];
};

export type MemberInOutRevenue = {
  __typename?: 'MemberInOutRevenue';
  amount: Scalars['Int']['output'];
  cashCommissionPotential: Scalars['Float']['output'];
  commission: Scalars['Int']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  percent?: Maybe<Scalars['Float']['output']>;
  username: Scalars['String']['output'];
};

export type MemberInOutRevenueResponse = {
  __typename?: 'MemberInOutRevenueResponse';
  inOuts?: Maybe<Array<MemberInOutRevenue>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type MemberList = {
  __typename?: 'MemberList';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  emails: Array<Scalars['String']['output']>;
  frontActions?: Maybe<Array<FrontAction>>;
  id: Scalars['ID']['output'];
  members: Array<BasicListMember>;
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type MemberListResponse = {
  __typename?: 'MemberListResponse';
  memberLists?: Maybe<Array<MemberList>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type MemberLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MemberOverview = {
  __typename?: 'MemberOverview';
  cashCommissionPotential: Scalars['Int']['output'];
  currentHashPower: Scalars['Float']['output'];
  isTexitRanger: Scalars['Boolean']['output'];
  joinDate: Scalars['DateTimeISO']['output'];
  point: Scalars['Float']['output'];
  totalTXCShared: Scalars['BigInt']['output'];
};

export enum MemberState {
  Approved = 'APPROVED',
  Blocked = 'BLOCKED',
  Graveyard = 'GRAVEYARD',
  Paid = 'PAID',
  Pending = 'PENDING'
}

export type MemberStatistics = {
  __typename?: 'MemberStatistics';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  frontActions?: Maybe<Array<FrontAction>>;
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
  frontActions?: Maybe<Array<FrontAction>>;
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
  frontActions?: Maybe<Array<FrontAction>>;
  id: Scalars['ID']['output'];
  isDefault: Scalars['Boolean']['output'];
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
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  payoutId: Scalars['String']['input'];
  percent: Scalars['Float']['input'];
};

export type MemberWalletResponse = {
  __typename?: 'MemberWalletResponse';
  MemberWallets?: Maybe<Array<MemberWallet>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type MembersByCountryItem = {
  __typename?: 'MembersByCountryItem';
  country: Scalars['String']['output'];
  memberCount: Scalars['Int']['output'];
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
  adminLogin: LoginResponse;
  adminResetPasswordByToken: SuccessResponse;
  adminResetPasswordRequest: SuccessResponse;
  adminResetTokenVerify: VerifyTokenResponse;
  approveCommissionWithTransactionIds: SuccessResponse;
  approveMember: SuccessResponse;
  calculateCommissions: SuccessResponse;
  calculatePreviewCommissions: SuccessResponse;
  confirmStatistics: Statistics;
  createAdmin: Admin;
  createAdminNote: AdminNotes;
  createAndSendCampaign: Campaign;
  createBlock: Block;
  createEmailTemplate: EmailTemplate;
  createGroupSetting: GroupSetting;
  createInvoice: Invoice;
  createManyMemberStatistics: ManySuccessResponse;
  createManyStatisticsSales: ManySuccessResponse;
  createMember: Member;
  createMemberList: MemberList;
  createMemberStatistics: MemberStatistics;
  createPackage: Package;
  createPaymentMethod: PaymentMethod;
  createPayout: Payout;
  createPromo: Promo;
  createProof: Proof;
  createRole: Role;
  createSale: Sale;
  createStatistics: Statistics;
  createStatisticsSale: StatisticsSale;
  disable2FA: AccessTokenResponse;
  duplicateMember: Member;
  emailVerify: EmailVerifyResult;
  forceMemberLogout: SuccessResponse;
  generateWeekP2PInvoice: SuccessResponse;
  generateWeeklyReport: SuccessResponse;
  memberLogin: LoginResponse;
  moveEmailToTrash: Email;
  moveInvoicePaid: SuccessResponse;
  moveToBlocked: SuccessResponse;
  moveToGraveyard: SuccessResponse;
  moveToPaid: SuccessResponse;
  moveToPending: SuccessResponse;
  regenerateInvoiceById: SuccessResponse;
  removeAdminNote: SuccessResponse;
  removeAdmins: ManySuccessResponse;
  removeCompleteMemberPlacement: SuccessResponse;
  removeEmail: Email;
  removeGroupSetting: GroupSetting;
  removeInvoice: Invoice;
  removeManyMemberStatistics: ManySuccessResponse;
  removeManyStatistics: ManySuccessResponse;
  removeManyStatisticsSales: ManySuccessResponse;
  removeMember: SuccessResponse;
  removeMemberFromPlacementTree: SuccessResponse;
  removeMemberList: SuccessResponse;
  removeMemberStatisticsByStaitisId: ManySuccessResponse;
  removePackage: SuccessResponse;
  removePaymentMethod: SuccessResponse;
  removePromo: SuccessResponse;
  removeProof: SuccessResponse;
  removeRecipient: Recipient;
  removeRole: SuccessResponse;
  removeSale: SuccessResponse;
  removeStatisticsSalesByStaitisId: ManySuccessResponse;
  resetBonusClock: SuccessResponse;
  resetPasswordByToken: SuccessResponse;
  resetPasswordRequest: SuccessResponse;
  resetTokenVerify: VerifyTokenResponse;
  restoreEmailFromTrash: Email;
  sendEmail: SuccessResponse;
  sendEmailVerification: SuccessResponse;
  sendWelcomeEmail: SuccessResponse;
  setReadAllNotifications: ManySuccessResponse;
  setReadNotification: SuccessResponse;
  setRecipientStatus: Recipient;
  signUpMember: Member;
  updateAdmin: Admin;
  updateAdminNote: AdminNotes;
  updateCommission: WeeklyCommission;
  updateCommissionShortNote: WeeklyCommission;
  updateCommissionsStatus: SuccessResponse;
  updateEmailTemplate: EmailTemplate;
  updateGroupSetting: GroupSetting;
  updateInvoice: Invoice;
  updateMember: Member;
  updateMemberList: MemberList;
  updateMemberWallet: SuccessResponse;
  updatePackage: Package;
  updatePasswordAdmin: SuccessResponse;
  updatePasswordAdminById: Admin;
  updatePasswordMember: SuccessResponse;
  updatePasswordMemberById: Member;
  updatePaymentMethod: PaymentMethod;
  updatePromo: Promo;
  updateProof: Proof;
  updateRole: Role;
  updateSale: Sale;
  updateStatistics: Statistics;
  upsertEmail: Email;
  upsertSettingByMemberId: Setting;
  verify2FAAndEnable: AccessTokenResponse;
  verify2FAToken: LoginResponse;
  verifyMemberEmail: SuccessResponse;
};


export type MutationAdminLoginArgs = {
  data: AdminLoginInput;
};


export type MutationAdminResetPasswordByTokenArgs = {
  data: ResetPasswordTokenInput;
};


export type MutationAdminResetPasswordRequestArgs = {
  data: EmailInput;
};


export type MutationAdminResetTokenVerifyArgs = {
  data: TokenInput;
};


export type MutationApproveCommissionWithTransactionIdsArgs = {
  data: ApproveCommissionWithTxIdInput;
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


export type MutationCreateAndSendCampaignArgs = {
  data: CreateCampaignInput;
};


export type MutationCreateBlockArgs = {
  data: CreateBlockInput;
};


export type MutationCreateEmailTemplateArgs = {
  data: CreateEmailTemplateInput;
};


export type MutationCreateGroupSettingArgs = {
  data: CreateGroupSettingInput;
};


export type MutationCreateInvoiceArgs = {
  data: CreateInvoiceInput;
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


export type MutationCreateMemberListArgs = {
  data: CreateMemberListInput;
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


export type MutationCreatePromoArgs = {
  data: CreatePromoInput;
};


export type MutationCreateProofArgs = {
  data: CreateProofInput;
};


export type MutationCreateRoleArgs = {
  data: CreateRoleInput;
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


export type MutationDuplicateMemberArgs = {
  data: IdInput;
};


export type MutationEmailVerifyArgs = {
  data: TokenInput;
};


export type MutationForceMemberLogoutArgs = {
  data: IdInput;
};


export type MutationGenerateWeekP2PInvoiceArgs = {
  data: InvoiceWeekInput;
};


export type MutationGenerateWeeklyReportArgs = {
  data: GenerateWeeklyReportInput;
};


export type MutationMemberLoginArgs = {
  data: MemberLoginInput;
};


export type MutationMoveEmailToTrashArgs = {
  data: IdInput;
};


export type MutationMoveInvoicePaidArgs = {
  data: IdnInput;
};


export type MutationMoveToBlockedArgs = {
  data: IdInput;
};


export type MutationMoveToGraveyardArgs = {
  data: IdInput;
};


export type MutationMoveToPaidArgs = {
  data: IdInput;
};


export type MutationMoveToPendingArgs = {
  data: IdInput;
};


export type MutationRegenerateInvoiceByIdArgs = {
  data: IdnInput;
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


export type MutationRemoveEmailArgs = {
  data: IdInput;
};


export type MutationRemoveGroupSettingArgs = {
  data: IdInput;
};


export type MutationRemoveInvoiceArgs = {
  data: IdnInput;
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


export type MutationRemoveMemberFromPlacementTreeArgs = {
  data: IdInput;
};


export type MutationRemoveMemberListArgs = {
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


export type MutationRemovePromoArgs = {
  data: IdInput;
};


export type MutationRemoveProofArgs = {
  data: IdInput;
};


export type MutationRemoveRecipientArgs = {
  data: IdInput;
};


export type MutationRemoveRoleArgs = {
  data: IdInput;
};


export type MutationRemoveSaleArgs = {
  data: IdInput;
};


export type MutationRemoveStatisticsSalesByStaitisIdArgs = {
  data: IdInput;
};


export type MutationResetBonusClockArgs = {
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


export type MutationRestoreEmailFromTrashArgs = {
  data: IdInput;
};


export type MutationSendEmailArgs = {
  data: IdInput;
};


export type MutationSendEmailVerificationArgs = {
  data: EmailInput;
};


export type MutationSendWelcomeEmailArgs = {
  data: EmailInput;
};


export type MutationSetReadNotificationArgs = {
  data: IdInput;
};


export type MutationSetRecipientStatusArgs = {
  data: EmailStatusInput;
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


export type MutationUpdateEmailTemplateArgs = {
  data: UpdateEmailTemplateInput;
};


export type MutationUpdateGroupSettingArgs = {
  data: UpdateGroupSettingInput;
};


export type MutationUpdateInvoiceArgs = {
  data: UpdateInvoiceInput;
};


export type MutationUpdateMemberArgs = {
  data: UpdateMemberInput;
};


export type MutationUpdateMemberListArgs = {
  data: UpdateMemberListInput;
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


export type MutationUpdatePromoArgs = {
  data: UpdatePromoInput;
};


export type MutationUpdateProofArgs = {
  data: UpdateProofByIdInput;
};


export type MutationUpdateRoleArgs = {
  data: UpdateRoleInput;
};


export type MutationUpdateSaleArgs = {
  data: UpdateSaleInput;
};


export type MutationUpdateStatisticsArgs = {
  data: UpdateStatisticsInput;
};


export type MutationUpsertEmailArgs = {
  data: UpsertEmailInput;
};


export type MutationUpsertSettingByMemberIdArgs = {
  data: UpsertSettingInput;
};


export type MutationVerify2FaAndEnableArgs = {
  data: Verify2FaInput;
};


export type MutationVerify2FaTokenArgs = {
  data: TokenInput;
};


export type MutationVerifyMemberEmailArgs = {
  data: IdInput;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  frontActions?: Maybe<Array<FrontAction>>;
  id: Scalars['ID']['output'];
  level: NotificationLevel;
  message: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type NotificationClient = {
  __typename?: 'NotificationClient';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  frontActions?: Maybe<Array<FrontAction>>;
  id: Scalars['ID']['output'];
  level: NotificationLevel;
  message: Scalars['String']['output'];
  read: Scalars['Boolean']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export enum NotificationLevel {
  Admin = 'ADMIN',
  All = 'ALL',
  Individual = 'INDIVIDUAL',
  Teamleader = 'TEAMLEADER'
}

export type NotificationResponse = {
  __typename?: 'NotificationResponse';
  notifications?: Maybe<Array<NotificationClient>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type PFile = {
  __typename?: 'PFile';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  frontActions?: Maybe<Array<FrontAction>>;
  id: Scalars['ID']['output'];
  mimeType: Scalars['String']['output'];
  originalName: Scalars['String']['output'];
  size: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  url: Scalars['String']['output'];
};

export type Package = {
  __typename?: 'Package';
  ID: Scalars['Int']['output'];
  amount: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  date: Scalars['DateTimeISO']['output'];
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  enrollVisibility: Scalars['Boolean']['output'];
  freeShare: Scalars['Boolean']['output'];
  frontActions?: Maybe<Array<FrontAction>>;
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
  frontActions?: Maybe<Array<FrontAction>>;
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
  frontActions?: Maybe<Array<FrontAction>>;
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
  frontActions?: Maybe<Array<FrontAction>>;
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

export type PlacementMember = {
  __typename?: 'PlacementMember';
  cmnCalculatedWeeks: Scalars['Int']['output'];
  commission: CommissionStatus;
  createdAt: Scalars['DateTimeISO']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  placementParentId: Scalars['ID']['output'];
  placementPosition: PlacementPosition;
  teamStrategy: TeamStrategy;
  username: Scalars['String']['output'];
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

export type Promo = {
  __typename?: 'Promo';
  code: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  description: Scalars['String']['output'];
  endDate: Scalars['Date']['output'];
  frontActions?: Maybe<Array<FrontAction>>;
  id: Scalars['ID']['output'];
  startDate: Scalars['Date']['output'];
  status: Scalars['Boolean']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type PromoResponse = {
  __typename?: 'PromoResponse';
  promos?: Maybe<Array<Promo>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type Proof = {
  __typename?: 'Proof';
  amount: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  files?: Maybe<Array<PFile>>;
  frontActions?: Maybe<Array<FrontAction>>;
  id: Scalars['ID']['output'];
  mineLocation?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  orderedAt: Scalars['DateTimeISO']['output'];
  refId: Scalars['ID']['output'];
  reflinks?: Maybe<Array<RefLink>>;
  type: ProofType;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  vendor?: Maybe<Scalars['String']['output']>;
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
  Invoice = 'INVOICE',
  Liquidity = 'LIQUIDITY',
  Marketingminetxcpromotion = 'MARKETINGMINETXCPROMOTION',
  Marketingtxcpromotion = 'MARKETINGTXCPROMOTION',
  Mineelectricity = 'MINEELECTRICITY',
  Minefacilityrentmortage = 'MINEFACILITYRENTMORTAGE',
  Minemaintainance = 'MINEMAINTAINANCE',
  Minenewequipment = 'MINENEWEQUIPMENT',
  Overhead = 'OVERHEAD',
  Profit = 'PROFIT',
  Promotion = 'PROMOTION',
  Sale = 'SALE',
  Transactionprocessing = 'TRANSACTIONPROCESSING'
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
  campaignById: Campaign;
  campaigns: CampaignResponse;
  commissionByMemberIDAndWeek: WeeklyCommission;
  commissionByPeriod: Array<CommissionPeriodResponse>;
  commissionsByWeek: CommissionOverviewResponse;
  countBelowMembers: PlacementPositionCountResponse;
  countLeftMembers: CountResponse;
  countRightMembers: CountResponse;
  dailyRewards: DailyRewards;
  emailById: Email;
  emailTemplateById: EmailTemplate;
  emailTemplates: EmailTemplateResponse;
  emails: EmailResponse;
  generate2FA: Scalars['String']['output'];
  generateCommissionSendmany: Array<CommissionSendmany>;
  generateReferenceLink: ReferenceLink;
  groupSettings: GroupSettingResponse;
  hashPowerResponse: HashPowerResponse;
  individualMembers: Array<IndividualMember>;
  introducers: IntroducersResponse;
  invoiceById: Invoice;
  invoices: InvoiceResponse;
  latestStatistics: Array<LatestStatistics>;
  liveBlockStats: EntityStats;
  liveMiningStats: EntityStats;
  liveUserStats: EntityStats;
  memberById: Member;
  memberInOutRevenues: MemberInOutRevenueResponse;
  memberListById: MemberList;
  memberMe: Member;
  memberOverview: MemberOverview;
  memberStatistics: MemberStatisticsResponse;
  memberStatisticsWallets: MemberStatisticsWalletResponse;
  memberWallets: MemberWalletResponse;
  memberlists: MemberListResponse;
  members: MembersResponse;
  membersByCountry: Array<MembersByCountryItem>;
  newMemberCounts: Array<MinerCountStatsResponse>;
  notifications: NotificationResponse;
  onepointAwayMembers: MembersResponse;
  packages: PackageResponse;
  paymentMethodLinks: PaymentMethodLinkResponse;
  paymentMethods: PaymentMethodResponse;
  payouts: PayoutResponse;
  placementMembers: Array<PlacementMember>;
  placementMembersForWeek: Array<WeekPlacementMember>;
  promos: PromoResponse;
  proofById: Proof;
  proofs: ProofResponse;
  recipientById: Recipient;
  recipients: RecipientResponse;
  revenueOverview: RevenueOverviewResponse;
  rewardsByWallets: RewardsByWallets;
  roleById: Role;
  roles: RoleResponse;
  saleById: Sale;
  saleBySID: Sale;
  sales: BasicSalesResponse;
  settingByMemberId: Setting;
  statistics: StatisticsResponse;
  statisticsSales: StatisticsSaleResponse;
  teamCommissions: BasicWeeklyCommissionResponse;
  teamMembers: Array<Member>;
  topEarners: Array<TopEarnersResponse>;
  topRecruiters: Array<TopRecruitersResponse>;
  totalMemberCounts: Array<MinerCountStatsResponse>;
  txcShares: Array<TxcSharedResponse>;
  weeklyCommissionById: WeeklyCommission;
  weeklyCommissions: BasicWeeklyCommissionResponse;
  weeklyReports: WeeklyReportResponse;
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


export type QueryCampaignByIdArgs = {
  data: IdInput;
};


export type QueryCampaignsArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
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


export type QueryEmailByIdArgs = {
  data: IdInput;
};


export type QueryEmailTemplateByIdArgs = {
  data: IdInput;
};


export type QueryEmailTemplatesArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEmailsArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGenerateCommissionSendmanyArgs = {
  data: TxcPriceInput;
};


export type QueryGroupSettingsArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryIntroducersArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryInvoiceByIdArgs = {
  data: IdnInput;
};


export type QueryInvoicesArgs = {
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


export type QueryMemberByIdArgs = {
  data: IdInput;
};


export type QueryMemberInOutRevenuesArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMemberListByIdArgs = {
  data: IdInput;
};


export type QueryMemberOverviewArgs = {
  data: IdInput;
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


export type QueryMemberlistsArgs = {
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


export type QueryNotificationsArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
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


export type QueryPlacementMembersForWeekArgs = {
  data: WeekStartDateInput;
};


export type QueryPromosArgs = {
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


export type QueryRecipientByIdArgs = {
  data: IdInput;
};


export type QueryRecipientsArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryRewardsByWalletsArgs = {
  from: Scalars['DateTimeISO']['input'];
  memberId?: InputMaybe<Scalars['ID']['input']>;
  to: Scalars['DateTimeISO']['input'];
};


export type QueryRoleByIdArgs = {
  data: IdInput;
};


export type QueryRolesArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySaleByIdArgs = {
  data: IdInput;
};


export type QuerySaleBySidArgs = {
  data: IdnInput;
};


export type QuerySalesArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySettingByMemberIdArgs = {
  data: IdInput;
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


export type QueryTeamCommissionsArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  teamReport: TeamReportSection;
};


export type QueryTotalMemberCountsArgs = {
  data: PeriodStatsArgs;
};


export type QueryTxcSharesArgs = {
  data: PeriodStatsArgs;
};


export type QueryWeeklyCommissionByIdArgs = {
  data: IdInput;
};


export type QueryWeeklyCommissionsArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryWeeklyReportsArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};

export type Recipient = {
  __typename?: 'Recipient';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  email?: Maybe<Email>;
  emailId: Scalars['ID']['output'];
  frontActions?: Maybe<Array<FrontAction>>;
  id: Scalars['ID']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isRead: Scalars['Boolean']['output'];
  isStarred: Scalars['Boolean']['output'];
  recipient?: Maybe<Member>;
  recipientId: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type RecipientResponse = {
  __typename?: 'RecipientResponse';
  recipients?: Maybe<Array<Recipient>>;
  total?: Maybe<Scalars['Int']['output']>;
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

export type Role = {
  __typename?: 'Role';
  commission: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  description: Scalars['String']['output'];
  frontActions?: Maybe<Array<FrontAction>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  role: Scalars['Int']['output'];
  sale: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type RoleResponse = {
  __typename?: 'RoleResponse';
  roles?: Maybe<Array<Role>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type Sale = {
  __typename?: 'Sale';
  ID: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  frontActions?: Maybe<Array<FrontAction>>;
  id: Scalars['ID']['output'];
  invoice?: Maybe<Invoice>;
  isMetal: Scalars['Boolean']['output'];
  logs?: Maybe<Array<EntityLog>>;
  member?: Maybe<Member>;
  memberId: Scalars['ID']['output'];
  orderedAt: Scalars['DateTimeISO']['output'];
  package?: Maybe<Package>;
  packageId: Scalars['ID']['output'];
  paymentMethod: Scalars['String']['output'];
  proof?: Maybe<Proof>;
  sponsorCnt: Scalars['Float']['output'];
  statisticsSales?: Maybe<Array<StatisticsSale>>;
  status: Scalars['Boolean']['output'];
  toMember?: Maybe<Member>;
  toMemberId?: Maybe<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};


export type SaleLogsArgs = {
  logsize?: Scalars['Float']['input'];
};

export type Setting = {
  __typename?: 'Setting';
  communication: Scalars['Boolean']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  frontActions?: Maybe<Array<FrontAction>>;
  id: Scalars['ID']['output'];
  memberId: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type SignupFormInput = {
  assetId?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  mobile: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  packageId: Scalars['ID']['input'];
  password: Scalars['String']['input'];
  paymentMethod: Scalars['String']['input'];
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
  frontActions?: Maybe<Array<FrontAction>>;
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
  frontActions?: Maybe<Array<FrontAction>>;
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

export type Subscription = {
  __typename?: 'Subscription';
  newEmailReceived: Email;
  newNotification: Notification;
};

export type SuccessResponse = {
  __typename?: 'SuccessResponse';
  frontActions?: Maybe<Array<FrontAction>>;
  message?: Maybe<Scalars['String']['output']>;
  result: SuccessResult;
};

export enum SuccessResult {
  Failed = 'failed',
  Success = 'success'
}

export type TxcPriceInput = {
  txcPrice: Scalars['Float']['input'];
};

export type TxcSharedResponse = {
  __typename?: 'TXCSharedResponse';
  base: Scalars['String']['output'];
  baseDate: Scalars['DateTimeISO']['output'];
  txc: Scalars['Float']['output'];
};

export enum TeamReport {
  Credentials = 'CREDENTIALS',
  Left = 'LEFT',
  Referral = 'REFERRAL',
  Right = 'RIGHT'
}

export enum TeamReportSection {
  Left = 'LEFT',
  Referral = 'REFERRAL',
  Right = 'RIGHT'
}

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
  avatar?: Maybe<Scalars['String']['output']>;
  earned: Scalars['Float']['output'];
  fullName: Scalars['String']['output'];
};

export type TopRecruitersResponse = {
  __typename?: 'TopRecruitersResponse';
  avatar?: Maybe<Scalars['String']['output']>;
  fullName: Scalars['String']['output'];
  totalIntroducers: Scalars['Float']['output'];
};

export type UpdateAdminInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  roleId?: InputMaybe<Scalars['String']['input']>;
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

export type UpdateEmailTemplateInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  subject?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateGroupSettingInput = {
  commissionDefaults?: InputMaybe<Array<CommissionDefaultEnum>>;
  groupSettingCommissionBonuses?: InputMaybe<Array<CreateGroupSettingCommissionBonusInput>>;
  id: Scalars['ID']['input'];
  limitDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rollSponsorBonusPackageId?: InputMaybe<Scalars['ID']['input']>;
  sponsorBonusPackageId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateInvoiceInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  amountInCents?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['Date']['input']>;
  fileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  reflinks?: InputMaybe<Array<LinkInput>>;
  status?: InputMaybe<InvoiceStatusEnum>;
};

export type UpdateMemberInput = {
  assetId?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  commissionDefault?: InputMaybe<CommissionDefaultEnum>;
  country?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isTexitRanger?: InputMaybe<Scalars['Boolean']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  placementParentId?: InputMaybe<Scalars['ID']['input']>;
  placementPosition?: InputMaybe<PlacementPosition>;
  preferredContact?: InputMaybe<Scalars['String']['input']>;
  preferredContactDetail?: InputMaybe<Scalars['String']['input']>;
  primaryAddress?: InputMaybe<Scalars['String']['input']>;
  promoCode?: InputMaybe<Scalars['String']['input']>;
  secondaryAddress?: InputMaybe<Scalars['String']['input']>;
  sponsorId?: InputMaybe<Scalars['ID']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  syncWithSendy?: InputMaybe<Scalars['Boolean']['input']>;
  teamReport?: InputMaybe<Array<TeamReport>>;
  teamStrategy?: InputMaybe<TeamStrategy>;
  username?: InputMaybe<Scalars['String']['input']>;
  wallets?: InputMaybe<Array<MemberWalletDataInput>>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMemberListInput = {
  emails?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
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

export type UpdatePromoInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  id: Scalars['ID']['input'];
  startDate?: InputMaybe<Scalars['Date']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
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
  vendor?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRoleInput = {
  commission?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['Int']['input']>;
  sale?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateSaleInput = {
  fileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  id: Scalars['ID']['input'];
  isMetal?: InputMaybe<Scalars['Boolean']['input']>;
  memberId?: InputMaybe<Scalars['ID']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  orderedAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  packageId?: InputMaybe<Scalars['ID']['input']>;
  paymentMethod?: InputMaybe<Scalars['String']['input']>;
  reflinks?: InputMaybe<Array<LinkInput>>;
  sponsorCnt?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
  toMemberId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateStatisticsInput = {
  id: Scalars['ID']['input'];
  status?: InputMaybe<Scalars['Boolean']['input']>;
  transactionId?: InputMaybe<Scalars['ID']['input']>;
  txcShared?: InputMaybe<Scalars['Float']['input']>;
};

export type UpsertEmailInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  fileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  id: Scalars['ID']['input'];
  subject?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};

export type UpsertSettingInput = {
  communication?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Verify2FaInput = {
  token: Scalars['String']['input'];
  uri: Scalars['String']['input'];
};

export type VerifyTokenResponse = {
  __typename?: 'VerifyTokenResponse';
  email: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type WeekPlacementMember = {
  __typename?: 'WeekPlacementMember';
  commission: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  maxL: Scalars['Int']['output'];
  maxR: Scalars['Int']['output'];
  pkgL: Scalars['Int']['output'];
  pkgR: Scalars['Int']['output'];
  placementParentId: Scalars['ID']['output'];
  placementPosition: PlacementPosition;
  username: Scalars['String']['output'];
};

export type WeekStartDateInput = {
  weekStartDate: Scalars['Date']['input'];
};

export type WeeklyCommission = {
  __typename?: 'WeeklyCommission';
  ID: Scalars['Int']['output'];
  begL: Scalars['Float']['output'];
  begR: Scalars['Float']['output'];
  cash: Scalars['Int']['output'];
  commission: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  endL: Scalars['Float']['output'];
  endR: Scalars['Float']['output'];
  frontActions?: Maybe<Array<FrontAction>>;
  id: Scalars['ID']['output'];
  invoice?: Maybe<Invoice>;
  maxL: Scalars['Float']['output'];
  maxR: Scalars['Float']['output'];
  member?: Maybe<Member>;
  memberId: Scalars['ID']['output'];
  newL: Scalars['Float']['output'];
  newR: Scalars['Float']['output'];
  pkgL: Scalars['Float']['output'];
  pkgR: Scalars['Float']['output'];
  proof?: Maybe<Proof>;
  qualified: Scalars['Boolean']['output'];
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

export type WeeklyCommissionUpdateInput = {
  autoCreate?: InputMaybe<Scalars['Boolean']['input']>;
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

export type WeeklyReport = {
  __typename?: 'WeeklyReport';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  file: PFile;
  fileId: Scalars['String']['output'];
  frontActions?: Maybe<Array<FrontAction>>;
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  weekStartDate: Scalars['DateTimeISO']['output'];
};

export type WeeklyReportResponse = {
  __typename?: 'WeeklyReportResponse';
  total?: Maybe<Scalars['Int']['output']>;
  weeklyReports?: Maybe<Array<WeeklyReport>>;
};

export type FetchMeQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchMeQuery = { __typename?: 'Query', adminMe: { __typename?: 'Admin', id: string, email: string, avatar: string, roleId: string, username: string, fullName: string, OTPEnabled: boolean, role?: { __typename?: 'Role', id: string, name: string, sale: number, role: number, commission: number, description: string } | null } };

export type AdminResetTokenVerifyMutationVariables = Exact<{
  data: TokenInput;
}>;


export type AdminResetTokenVerifyMutation = { __typename?: 'Mutation', adminResetTokenVerify: { __typename?: 'VerifyTokenResponse', email: string, token: string } };

export type CalculateProfitabilityQueryVariables = Exact<{
  data: ProfitabilityCalculationInput;
}>;


export type CalculateProfitabilityQuery = { __typename?: 'Query', calculateProfitability: { __typename?: 'ProfitabilityCalculationResponse', startDate: any, target: number, init: number, period: number, txc: number, txcCost: number, extraTXC: number, endDate: any, txcPrice: number } };

export type WeeklyCommissionsQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type WeeklyCommissionsQuery = { __typename?: 'Query', weeklyCommissions: { __typename?: 'BasicWeeklyCommissionResponse', total?: number | null, weeklyCommissions?: Array<{ __typename?: 'BasicWeeklyCommission', id: string, ID: number, begL: number, begR: number, newL: number, newR: number, maxL: number, maxR: number, endL: number, endR: number, pkgL: number, pkgR: number, cash: number, note?: string | null, email: string, status: ConfirmationStatus, username: string, fullName: string, memberId: string, createdAt: any, qualified: boolean, shortNote?: string | null, commission: number, isTexitRanger: boolean, weekStartDate: any, commissionDefault: CommissionDefaultEnum, invoice?: { __typename?: 'Invoice', id: number, proof?: { __typename?: 'Proof', files?: Array<{ __typename?: 'PFile', id: string, url: string, size: number, mimeType: string, originalName: string }> | null } | null } | null }> | null } };

export type WeeklyCommissionByIdQueryVariables = Exact<{
  data: IdInput;
}>;


export type WeeklyCommissionByIdQuery = { __typename?: 'Query', weeklyCommissionById: { __typename?: 'WeeklyCommission', id: string, ID: number, cash: number, begL: number, begR: number, newL: number, newR: number, maxL: number, maxR: number, endL: number, endR: number, pkgL: number, pkgR: number, status: ConfirmationStatus, memberId: string, shortNote?: string | null, commission: number, weekStartDate: any, member?: { __typename?: 'Member', username: string, fullName: string, updatedAt?: any | null } | null, proof?: { __typename?: 'Proof', note?: string | null, reflinks?: Array<{ __typename?: 'RefLink', link: string, linkType: string }> | null, files?: Array<{ __typename?: 'PFile', id: string, url: string, size: number, mimeType: string, originalName: string }> | null } | null } };

export type FetchCommissionStatsQueryVariables = Exact<{
  allFilter?: InputMaybe<Scalars['JSONObject']['input']>;
  pendingFilter?: InputMaybe<Scalars['JSONObject']['input']>;
  declinedFilter?: InputMaybe<Scalars['JSONObject']['input']>;
  approvedFilter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type FetchCommissionStatsQuery = { __typename?: 'Query', all: { __typename?: 'BasicWeeklyCommissionResponse', total?: number | null }, pending: { __typename?: 'BasicWeeklyCommissionResponse', total?: number | null }, declined: { __typename?: 'BasicWeeklyCommissionResponse', total?: number | null }, approved: { __typename?: 'BasicWeeklyCommissionResponse', total?: number | null } };

export type CommissionsByWeekQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  weekStartDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
}>;


export type CommissionsByWeekQuery = { __typename?: 'Query', commissionsByWeek: { __typename?: 'CommissionOverviewResponse', total?: number | null, commissions?: Array<{ __typename?: 'CommissionOverview', weekStartDate: any, totalSale: number, totalRevenue: number, totalMember: number, totalAmount: number }> | null } };

export type GenerateCommissionSendmanyQueryVariables = Exact<{
  data: TxcPriceInput;
}>;


export type GenerateCommissionSendmanyQuery = { __typename?: 'Query', generateCommissionSendmany: Array<{ __typename?: 'CommissionSendmany', ids: Array<string>, command: string }> };

export type ApproveCommissionWithTransactionIdsMutationVariables = Exact<{
  data: ApproveCommissionWithTxIdInput;
}>;


export type ApproveCommissionWithTransactionIdsMutation = { __typename?: 'Mutation', approveCommissionWithTransactionIds: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type UpdateCommissionMutationVariables = Exact<{
  data: WeeklyCommissionUpdateInput;
}>;


export type UpdateCommissionMutation = { __typename?: 'Mutation', updateCommission: { __typename?: 'WeeklyCommission', ID: number, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type UpdateCommissionsStatusMutationVariables = Exact<{
  data: WeeklyCommissionsStatusUpdateInput;
}>;


export type UpdateCommissionsStatusMutation = { __typename?: 'Mutation', updateCommissionsStatus: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type CalculateCommissionsMutationVariables = Exact<{ [key: string]: never; }>;


export type CalculateCommissionsMutation = { __typename?: 'Mutation', calculateCommissions: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type CalculatePreviewCommissionsMutationVariables = Exact<{ [key: string]: never; }>;


export type CalculatePreviewCommissionsMutation = { __typename?: 'Mutation', calculatePreviewCommissions: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type UpdateCommissionShortNoteMutationVariables = Exact<{
  data: WeeklyCommissionNoteInput;
}>;


export type UpdateCommissionShortNoteMutation = { __typename?: 'Mutation', updateCommissionShortNote: { __typename?: 'WeeklyCommission', ID: number, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type WeeklyMembersQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type WeeklyMembersQuery = { __typename?: 'Query', weeklyCommissions: { __typename?: 'BasicWeeklyCommissionResponse', total?: number | null, weeklyCommissions?: Array<{ __typename?: 'BasicWeeklyCommission', email: string, memberId: string, username: string, fullName: string }> | null } };

export type MembersQueryVariables = Exact<{
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type MembersQuery = { __typename?: 'Query', members: { __typename?: 'MembersResponse', members?: Array<{ __typename?: 'Member', email: string, username: string }> | null } };

export type MemberlistsQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type MemberlistsQuery = { __typename?: 'Query', memberlists: { __typename?: 'MemberListResponse', total?: number | null, memberLists?: Array<{ __typename?: 'MemberList', id: string, name: string, emails: Array<string>, createdAt?: any | null, members: Array<{ __typename?: 'BasicListMember', id: string, email: string, mobile: string, username: string, fullName: string }> }> | null } };

export type MemberListByIdQueryVariables = Exact<{
  data: IdInput;
}>;


export type MemberListByIdQuery = { __typename?: 'Query', memberListById: { __typename?: 'MemberList', id: string, name: string, emails: Array<string>, members: Array<{ __typename?: 'BasicListMember', id: string, email: string, mobile: string, username: string, fullName: string }> } };

export type EmailTemplatesQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type EmailTemplatesQuery = { __typename?: 'Query', emailTemplates: { __typename?: 'EmailTemplateResponse', total?: number | null, templates?: Array<{ __typename?: 'EmailTemplate', id: string, body: string, subject: string, description?: string | null }> | null } };

export type EmailTemplateByIdQueryVariables = Exact<{
  data: IdInput;
}>;


export type EmailTemplateByIdQuery = { __typename?: 'Query', emailTemplateById: { __typename?: 'EmailTemplate', id: string, body: string, subject: string, createdAt?: any | null, description?: string | null } };

export type CampaignsQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type CampaignsQuery = { __typename?: 'Query', campaigns: { __typename?: 'CampaignResponse', total?: number | null, campaigns?: Array<{ __typename?: 'Campaign', id: string, body: string, subject: string, listType: CampaignListType, listExtra?: any | null, recipients?: Array<{ __typename?: 'CampaignMember', open: boolean, sent: boolean, email: string, sender: string, sentTime?: any | null, openTime?: any | null }> | null }> | null } };

export type CampaignByIdQueryVariables = Exact<{
  data: IdInput;
}>;


export type CampaignByIdQuery = { __typename?: 'Query', campaignById: { __typename?: 'Campaign', id: string, body: string, sender: string, subject: string, listType: CampaignListType, listExtra?: any | null, recipients?: Array<{ __typename?: 'CampaignMember', open: boolean, sent: boolean, body?: string | null, email: string, sender: string, sentTime?: any | null, openTime?: any | null }> | null } };

export type CreateAndSendCampaignMutationVariables = Exact<{
  data: CreateCampaignInput;
}>;


export type CreateAndSendCampaignMutation = { __typename?: 'Mutation', createAndSendCampaign: { __typename?: 'Campaign', id: string } };

export type CreateMemberListMutationVariables = Exact<{
  data: CreateMemberListInput;
}>;


export type CreateMemberListMutation = { __typename?: 'Mutation', createMemberList: { __typename?: 'MemberList', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type CreateEmailTemplateMutationVariables = Exact<{
  data: CreateEmailTemplateInput;
}>;


export type CreateEmailTemplateMutation = { __typename?: 'Mutation', createEmailTemplate: { __typename?: 'EmailTemplate', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type UpdateEmailTemplateMutationVariables = Exact<{
  data: UpdateEmailTemplateInput;
}>;


export type UpdateEmailTemplateMutation = { __typename?: 'Mutation', updateEmailTemplate: { __typename?: 'EmailTemplate', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type RemoveMemberListMutationVariables = Exact<{
  data: IdInput;
}>;


export type RemoveMemberListMutation = { __typename?: 'Mutation', removeMemberList: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type GroupSettingsQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type GroupSettingsQuery = { __typename?: 'Query', groupSettings: { __typename?: 'GroupSettingResponse', total?: number | null, groupSettings?: Array<{ __typename?: 'GroupSetting', createdAt?: any | null, id: string, name: string, limitDate: any, commissionDefaults: Array<CommissionDefaultEnum>, sponsorBonusPackageId?: string | null, rollSponsorBonusPackageId?: string | null, groupSettingCommissionBonuses: Array<{ __typename?: 'GroupSettingCommissionBonus', lPoint: number, rPoint: number, commission: number, qPackageId: string, uPackageId?: string | null }>, sponsorBonusPackage?: { __typename?: 'Package', id: string, ID: number, date: any, token: number, point: number, amount: number, status: boolean, freeShare: boolean, productName: string, enrollVisibility: boolean } | null }> | null } };

export type CreateGroupSettingMutationVariables = Exact<{
  data: CreateGroupSettingInput;
}>;


export type CreateGroupSettingMutation = { __typename?: 'Mutation', createGroupSetting: { __typename?: 'GroupSetting', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type UpdateGroupSettingMutationVariables = Exact<{
  data: UpdateGroupSettingInput;
}>;


export type UpdateGroupSettingMutation = { __typename?: 'Mutation', updateGroupSetting: { __typename?: 'GroupSetting', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type RemoveGroupSettingMutationVariables = Exact<{
  data: IdInput;
}>;


export type RemoveGroupSettingMutation = { __typename?: 'Mutation', removeGroupSetting: { __typename?: 'GroupSetting', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type InvoicesQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type InvoicesQuery = { __typename?: 'Query', invoices: { __typename?: 'InvoiceResponse', total?: number | null, invoices?: Array<{ __typename?: 'Invoice', id: number, name: string, status: InvoiceStatusEnum, dueDate: any, createdAt?: any | null, description: string, amountInCents: number, proof?: { __typename?: 'Proof', id: string, type: ProofType, note?: string | null, refId: string, amount: number, orderedAt: any, files?: Array<{ __typename?: 'PFile', id: string, url: string, size: number, mimeType: string, originalName: string }> | null, reflinks?: Array<{ __typename?: 'RefLink', link: string, linkType: string }> | null } | null }> | null } };

export type InvoiceByIdQueryVariables = Exact<{
  data: IdnInput;
}>;


export type InvoiceByIdQuery = { __typename?: 'Query', invoiceById: { __typename?: 'Invoice', id: number, name: string, status: InvoiceStatusEnum, dueDate: any, createdAt?: any | null, description: string, amountInCents: number, proof?: { __typename?: 'Proof', id: string, type: ProofType, note?: string | null, refId: string, amount: number, orderedAt: any, files?: Array<{ __typename?: 'PFile', id: string, url: string, size: number, mimeType: string, originalName: string }> | null, reflinks?: Array<{ __typename?: 'RefLink', link: string, linkType: string }> | null } | null } };

export type MoveInvoicePaidMutationVariables = Exact<{
  data: IdnInput;
}>;


export type MoveInvoicePaidMutation = { __typename?: 'Mutation', moveInvoicePaid: { __typename?: 'SuccessResponse', result: SuccessResult, message?: string | null, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type UpdateInvoiceMutationVariables = Exact<{
  data: UpdateInvoiceInput;
}>;


export type UpdateInvoiceMutation = { __typename?: 'Mutation', updateInvoice: { __typename?: 'Invoice', id: number, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type GenerateWeekP2PInvoiceMutationVariables = Exact<{
  data: InvoiceWeekInput;
}>;


export type GenerateWeekP2PInvoiceMutation = { __typename?: 'Mutation', generateWeekP2PInvoice: { __typename?: 'SuccessResponse', result: SuccessResult, message?: string | null, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type RegenerateInvoiceByIdMutationVariables = Exact<{
  data: IdnInput;
}>;


export type RegenerateInvoiceByIdMutation = { __typename?: 'Mutation', regenerateInvoiceById: { __typename?: 'SuccessResponse', result: SuccessResult, message?: string | null, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type AdminNotesQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type AdminNotesQuery = { __typename?: 'Query', adminNotes: { __typename?: 'AdminNotesResponse', total?: number | null, adminNotes?: Array<{ __typename?: 'AdminNotes', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, memberId: string, adminId: string, description?: string | null, member?: { __typename?: 'Member', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, username: string, fullName: string, sponsorId?: string | null, email: string, mobile: string, assetId?: string | null, primaryAddress: string, secondaryAddress?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, placementParentId?: string | null, placementPosition: PlacementPosition, point: number, emailVerified: boolean, status: boolean, totalIntroducers: number, syncWithSendy: boolean, preferredContact?: string | null, preferredContactDetail?: string | null, commission?: { __typename?: 'CommissionStatus', begL: number, begR: number, newL: number, newR: number } | null } | null, admin?: { __typename?: 'Admin', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, username: string, email: string, avatar: string } | null }> | null } };

export type CreateAdminNoteMutationVariables = Exact<{
  data: CreateAdminNotesInput;
}>;


export type CreateAdminNoteMutation = { __typename?: 'Mutation', createAdminNote: { __typename?: 'AdminNotes', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type UpdateAdminNoteMutationVariables = Exact<{
  data: UpdateAdminNotesInput;
}>;


export type UpdateAdminNoteMutation = { __typename?: 'Mutation', updateAdminNote: { __typename?: 'AdminNotes', admin?: { __typename?: 'Admin', id: string, frontActions?: Array<(
        { __typename?: 'FrontAction' }
        & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
      )> | null } | null } };

export type RemoveAdminNoteMutationVariables = Exact<{
  data: IdInput;
}>;


export type RemoveAdminNoteMutation = { __typename?: 'Mutation', removeAdminNote: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type FetchMemberStatsQueryVariables = Exact<{
  approveFilter?: InputMaybe<Scalars['JSONObject']['input']>;
  pendingFilter?: InputMaybe<Scalars['JSONObject']['input']>;
  graveyardFilter?: InputMaybe<Scalars['JSONObject']['input']>;
  paidFilter?: InputMaybe<Scalars['JSONObject']['input']>;
  blockFilter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type FetchMemberStatsQuery = { __typename?: 'Query', APPROVED: { __typename?: 'MembersResponse', total?: number | null }, PENDING: { __typename?: 'MembersResponse', total?: number | null }, GRAVEYARD: { __typename?: 'MembersResponse', total?: number | null }, PAID: { __typename?: 'MembersResponse', total?: number | null }, BLOCKED: { __typename?: 'MembersResponse', total?: number | null } };

export type FetchMembersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type FetchMembersQuery = { __typename?: 'Query', members: { __typename?: 'MembersResponse', total?: number | null, members?: Array<{ __typename?: 'Member', id: string, ID?: number | null, city?: string | null, email: string, point: number, state?: string | null, status: boolean, avatar?: string | null, mobile: string, assetId?: string | null, country?: string | null, zipCode?: string | null, username: string, fullName: string, sponsorId?: string | null, promoCode?: string | null, allowState: MemberState, OTPEnabled: boolean, teamReport: Array<TeamReport>, teamStrategy: TeamStrategy, isTexitRanger: boolean, emailVerified: boolean, syncWithSendy: boolean, primaryAddress: string, preferredContact?: string | null, secondaryAddress?: string | null, totalIntroducers: number, commissionDefault: CommissionDefaultEnum, placementPosition: PlacementPosition, placementParentId?: string | null, signupFormRequest?: any | null, cmnCalculatedWeeks: number, preferredContactDetail?: string | null, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, adminNotes?: Array<{ __typename?: 'AdminNotes', id: string, adminId: string, memberId: string, createdAt?: any | null, updatedAt?: any | null, description?: string | null, admin?: { __typename?: 'Admin', id: string, email: string, avatar: string, roleId: string, username: string, fullName: string, OTPEnabled: boolean } | null }> | null }> | null } };

export type MemberByIdQueryVariables = Exact<{
  data: IdInput;
  logsize: Scalars['Float']['input'];
}>;


export type MemberByIdQuery = { __typename?: 'Query', memberById: { __typename?: 'Member', id: string, ID?: number | null, city?: string | null, email: string, point: number, state?: string | null, status: boolean, avatar?: string | null, mobile: string, assetId?: string | null, country?: string | null, zipCode?: string | null, username: string, fullName: string, sponsorId?: string | null, promoCode?: string | null, allowState: MemberState, OTPEnabled: boolean, teamReport: Array<TeamReport>, teamStrategy: TeamStrategy, isTexitRanger: boolean, emailVerified: boolean, syncWithSendy: boolean, primaryAddress: string, preferredContact?: string | null, secondaryAddress?: string | null, totalIntroducers: number, commissionDefault: CommissionDefaultEnum, placementPosition: PlacementPosition, signupFormRequest?: any | null, cmnCalculatedWeeks: number, preferredContactDetail?: string | null, placementParentId?: string | null, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, groupSetting?: { __typename?: 'BasicGroupSetting', id: string, name: string, commissionDefaults: Array<CommissionDefaultEnum> } | null, commission?: { __typename?: 'CommissionStatus', begL: number, begR: number, newL: number, newR: number } | null, sponsor?: { __typename?: 'Member', id: string, email: string, point: number, mobile: string, status: boolean, username: string, fullName: string, allowState: MemberState, teamReport: Array<TeamReport>, OTPEnabled: boolean, teamStrategy: TeamStrategy, isTexitRanger: boolean, syncWithSendy: boolean, emailVerified: boolean, primaryAddress: string, totalIntroducers: number, placementPosition: PlacementPosition, commissionDefault: CommissionDefaultEnum, cmnCalculatedWeeks: number } | null, placementParent?: { __typename?: 'Member', id: string, email: string, point: number, mobile: string, status: boolean, username: string, fullName: string, allowState: MemberState, teamReport: Array<TeamReport>, OTPEnabled: boolean, teamStrategy: TeamStrategy, isTexitRanger: boolean, syncWithSendy: boolean, emailVerified: boolean, primaryAddress: string, totalIntroducers: number, placementPosition: PlacementPosition, commissionDefault: CommissionDefaultEnum, cmnCalculatedWeeks: number } | null, placementChildren?: Array<{ __typename?: 'Member', id: string, email: string, point: number, mobile: string, status: boolean, username: string, fullName: string, allowState: MemberState, teamReport: Array<TeamReport>, OTPEnabled: boolean, teamStrategy: TeamStrategy, isTexitRanger: boolean, syncWithSendy: boolean, emailVerified: boolean, primaryAddress: string, totalIntroducers: number, placementPosition: PlacementPosition, commissionDefault: CommissionDefaultEnum, cmnCalculatedWeeks: number }> | null, sales?: Array<{ __typename?: 'Sale', id: string, ID: number, isMetal: boolean, memberId: string, packageId: string, paymentMethod: string, sponsorCnt: number, status: boolean, orderedAt: any, proof?: { __typename?: 'Proof', id: string, type: ProofType, note?: string | null, refId: string, amount: number, orderedAt: any, files?: Array<{ __typename?: 'PFile', id: string, url: string, size: number, mimeType: string, originalName: string }> | null, reflinks?: Array<{ __typename?: 'RefLink', link: string, linkType: string }> | null } | null }> | null, memberWallets?: Array<{ __typename?: 'MemberWallet', id: string, note?: string | null, address: string, percent: number, memberId: string, payoutId: string, isDefault: boolean, payout?: { __typename?: 'Payout', id: string, name: string, method: string, status: boolean, display: string } | null }> | null, logs?: Array<{ __typename?: 'EntityLog', id: string, who: string, role: string, when: any, after?: any | null, entity: string, action: string, status: string, before?: any | null }> | null, adminNotes?: Array<{ __typename?: 'AdminNotes', id: string, adminId: string, memberId: string, createdAt?: any | null, updatedAt?: any | null, description?: string | null, admin?: { __typename?: 'Admin', id: string, email: string, avatar: string, roleId: string, username: string, fullName: string, OTPEnabled: boolean } | null }> | null, communications?: Array<{ __typename?: 'CampaignMember', open: boolean, sent: boolean, body?: string | null, email: string, sender: string, subject?: string | null, openTime?: any | null, sentTime?: any | null }> | null, setting?: { __typename?: 'Setting', id: string, memberId: string, communication: boolean } | null } };

export type SearchMembersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchMembersQuery = { __typename?: 'Query', members: { __typename?: 'MembersResponse', members?: Array<{ __typename?: 'Member', id: string, email: string, username: string, fullName: string, teamStrategy: TeamStrategy }> | null } };

export type IndividualMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type IndividualMembersQuery = { __typename?: 'Query', individualMembers: Array<{ __typename?: 'IndividualMember', id: string, email: string, username: string, fullName: string, createdAt: any, sponsorId?: string | null, sponsorUsername?: string | null, sponsorFullname?: string | null }> };

export type CreateMemberMutationVariables = Exact<{
  data: CreateMemberInput;
}>;


export type CreateMemberMutation = { __typename?: 'Mutation', createMember: { __typename?: 'Member', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type UpdateMemberMutationVariables = Exact<{
  data: UpdateMemberInput;
}>;


export type UpdateMemberMutation = { __typename?: 'Mutation', updateMember: { __typename?: 'Member', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type MemberOverviewQueryVariables = Exact<{
  data: IdInput;
}>;


export type MemberOverviewQuery = { __typename?: 'Query', memberOverview: { __typename?: 'MemberOverview', point: number, joinDate: any, totalTXCShared: any, currentHashPower: number, cashCommissionPotential: number } };

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


export type UpdatePasswordMemberByIdMutation = { __typename?: 'Mutation', updatePasswordMemberById: { __typename?: 'Member', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type RemoveMemberMutationVariables = Exact<{
  data: IdInput;
}>;


export type RemoveMemberMutation = { __typename?: 'Mutation', removeMember: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type RemoveCompleteMemberPlacementMutationVariables = Exact<{
  data: IdInput;
}>;


export type RemoveCompleteMemberPlacementMutation = { __typename?: 'Mutation', removeCompleteMemberPlacement: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type ApproveMemberMutationVariables = Exact<{
  data: IdInput;
}>;


export type ApproveMemberMutation = { __typename?: 'Mutation', approveMember: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type SendWelcomeEmailMutationVariables = Exact<{
  data: EmailInput;
}>;


export type SendWelcomeEmailMutation = { __typename?: 'Mutation', sendWelcomeEmail: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type MoveToGraveyardMutationVariables = Exact<{
  data: IdInput;
}>;


export type MoveToGraveyardMutation = { __typename?: 'Mutation', moveToGraveyard: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type MoveToPaidMutationVariables = Exact<{
  data: IdInput;
}>;


export type MoveToPaidMutation = { __typename?: 'Mutation', moveToPaid: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type MoveToPendingMutationVariables = Exact<{
  data: IdInput;
}>;


export type MoveToPendingMutation = { __typename?: 'Mutation', moveToPending: { __typename?: 'SuccessResponse', result: SuccessResult, message?: string | null, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type VerifyMemberEmailMutationVariables = Exact<{
  data: IdInput;
}>;


export type VerifyMemberEmailMutation = { __typename?: 'Mutation', verifyMemberEmail: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type DuplicateMemberMutationVariables = Exact<{
  data: IdInput;
}>;


export type DuplicateMemberMutation = { __typename?: 'Mutation', duplicateMember: { __typename?: 'Member', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type ResetBonusClockMutationVariables = Exact<{
  data: IdInput;
}>;


export type ResetBonusClockMutation = { __typename?: 'Mutation', resetBonusClock: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult } };

export type MoveToBlockedMutationVariables = Exact<{
  data: IdInput;
}>;


export type MoveToBlockedMutation = { __typename?: 'Mutation', moveToBlocked: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type ForceMemberLogoutMutationVariables = Exact<{
  data: IdInput;
}>;


export type ForceMemberLogoutMutation = { __typename?: 'Mutation', forceMemberLogout: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type NotificationsQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type NotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'NotificationResponse', total?: number | null, notifications?: Array<{ __typename?: 'NotificationClient', id: string, read: boolean, level: NotificationLevel, message: string, createdAt?: any | null, updatedAt?: any | null }> | null } };

export type SetReadNotificationMutationVariables = Exact<{
  data: IdInput;
}>;


export type SetReadNotificationMutation = { __typename?: 'Mutation', setReadNotification: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type SetReadAllNotificationsMutationVariables = Exact<{ [key: string]: never; }>;


export type SetReadAllNotificationsMutation = { __typename?: 'Mutation', setReadAllNotifications: { __typename?: 'ManySuccessResponse', count: number } };

export type NewNotificationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewNotificationSubscription = { __typename?: 'Subscription', newNotification: { __typename?: 'Notification', id: string, level: NotificationLevel, message: string, createdAt?: any | null, updatedAt?: any | null } };

export type PaymentMethodsQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type PaymentMethodsQuery = { __typename?: 'Query', paymentMethods: { __typename?: 'PaymentMethodResponse', total?: number | null, paymentMethods?: Array<{ __typename?: 'PaymentMethod', id: string, name: string, visible: boolean, createdAt?: any | null, defaultLink?: string | null, paymentMethodLinks?: Array<{ __typename?: 'PaymentMethodLink', id: string, link: string, packageId: string, paymentMethodId: string }> | null }> | null } };

export type CreatePaymentMethodMutationVariables = Exact<{
  data: CreatePaymentMethodInput;
}>;


export type CreatePaymentMethodMutation = { __typename?: 'Mutation', createPaymentMethod: { __typename?: 'PaymentMethod', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type UpdatePaymentMethodMutationVariables = Exact<{
  data: UpdatePaymentMethodInput;
}>;


export type UpdatePaymentMethodMutation = { __typename?: 'Mutation', updatePaymentMethod: { __typename?: 'PaymentMethod', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type RemovePaymentMethodMutationVariables = Exact<{
  data: IdInput;
}>;


export type RemovePaymentMethodMutation = { __typename?: 'Mutation', removePaymentMethod: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type RemoveMemberFromPlacementTreeMutationVariables = Exact<{
  data: IdInput;
}>;


export type RemoveMemberFromPlacementTreeMutation = { __typename?: 'Mutation', removeMemberFromPlacementTree: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type SponsorMembersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type SponsorMembersQuery = { __typename?: 'Query', members: { __typename?: 'MembersResponse', total?: number | null, members?: Array<{ __typename?: 'Member', id: string, username: string, fullName: string, createdAt?: any | null, sponsor?: { __typename?: 'Member', id: string } | null }> | null } };

export type FetchPlacementMembersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type FetchPlacementMembersQuery = { __typename?: 'Query', members: { __typename?: 'MembersResponse', total?: number | null, members?: Array<{ __typename?: 'Member', id: string, email: string, status: boolean, fullName: string, username: string, sponsorId?: string | null, allowState: MemberState, teamReport: Array<TeamReport>, OTPEnabled: boolean, teamStrategy: TeamStrategy, placementParentId?: string | null, placementPosition: PlacementPosition, cmnCalculatedWeeks: number, createdAt?: any | null, placementParent?: { __typename?: 'Member', id: string, username: string, fullName: string } | null, sponsor?: { __typename?: 'Member', username: string } | null, commission?: { __typename?: 'CommissionStatus', begL: number, begR: number, newL: number, newR: number } | null }> | null } };

export type PlacementMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type PlacementMembersQuery = { __typename?: 'Query', placementMembers: Array<{ __typename?: 'PlacementMember', id: string, username: string, fullName: string, createdAt: any, placementPosition: PlacementPosition, placementParentId: string, cmnCalculatedWeeks: number, teamStrategy: TeamStrategy, commission: { __typename?: 'CommissionStatus', begL: number, begR: number, newL: number, newR: number } }> };

export type PlacementMembersForWeekQueryVariables = Exact<{
  data: WeekStartDateInput;
}>;


export type PlacementMembersForWeekQuery = { __typename?: 'Query', placementMembersForWeek: Array<{ __typename?: 'WeekPlacementMember', id: string, maxL: number, maxR: number, pkgL: number, pkgR: number, username: string, fullName: string, createdAt: any, commission: number, placementPosition: PlacementPosition, placementParentId: string }> };

export type PackagesQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type PackagesQuery = { __typename?: 'Query', packages: { __typename?: 'PackageResponse', total?: number | null, packages?: Array<{ __typename?: 'Package', id: string, ID: number, date: any, point: number, token: number, amount: number, status: boolean, freeShare: boolean, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, productName: string, enrollVisibility: boolean, sales?: Array<{ __typename?: 'Sale', id: string, ID: number, status: boolean, memberId: string, isMetal: boolean, orderedAt: any, packageId: string, paymentMethod: string, sponsorCnt: number, proof?: { __typename?: 'Proof', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, refId: string, type: ProofType, amount: number, orderedAt: any, note?: string | null, files?: Array<{ __typename?: 'PFile', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, url: string, originalName: string, mimeType: string, size: number }> | null, reflinks?: Array<{ __typename?: 'RefLink', linkType: string, link: string }> | null } | null }> | null }> | null } };

export type FetchPackageStatsQueryVariables = Exact<{
  allFilter?: InputMaybe<Scalars['JSONObject']['input']>;
  inactiveFilter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type FetchPackageStatsQuery = { __typename?: 'Query', all: { __typename?: 'PackageResponse', total?: number | null }, inactive: { __typename?: 'PackageResponse', total?: number | null } };

export type CreatePackageMutationVariables = Exact<{
  data: CreatePackageInput;
}>;


export type CreatePackageMutation = { __typename?: 'Mutation', createPackage: { __typename?: 'Package', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type UpdatePackageMutationVariables = Exact<{
  data: UpdatePackageInput;
}>;


export type UpdatePackageMutation = { __typename?: 'Mutation', updatePackage: { __typename?: 'Package', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type RemovePackageMutationVariables = Exact<{
  data: IdInput;
}>;


export type RemovePackageMutation = { __typename?: 'Mutation', removePackage: { __typename?: 'SuccessResponse', result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type UpdatePasswordAdminMutationVariables = Exact<{
  data: UpdateAdminPasswordInput;
}>;


export type UpdatePasswordAdminMutation = { __typename?: 'Mutation', updatePasswordAdmin: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type PromosQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type PromosQuery = { __typename?: 'Query', promos: { __typename?: 'PromoResponse', total?: number | null, promos?: Array<{ __typename?: 'Promo', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, code: string, description: string, status: boolean, startDate: any, endDate: any }> | null } };

export type CreatePromoMutationVariables = Exact<{
  data: CreatePromoInput;
}>;


export type CreatePromoMutation = { __typename?: 'Mutation', createPromo: { __typename?: 'Promo', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type UpdatePromoMutationVariables = Exact<{
  data: UpdatePromoInput;
}>;


export type UpdatePromoMutation = { __typename?: 'Mutation', updatePromo: { __typename?: 'Promo', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type RemovePromoMutationVariables = Exact<{
  data: IdInput;
}>;


export type RemovePromoMutation = { __typename?: 'Mutation', removePromo: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type ProofsQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type ProofsQuery = { __typename?: 'Query', proofs: { __typename?: 'ProofResponse', total?: number | null, proofs?: Array<{ __typename?: 'Proof', id: string, note?: string | null, type: ProofType, refId: string, amount: number, vendor?: string | null, createdAt?: any | null, orderedAt: any, mineLocation?: string | null, files?: Array<{ __typename?: 'PFile', id: string, url: string, size: number, mimeType: string, originalName: string }> | null, reflinks?: Array<{ __typename?: 'RefLink', link: string, linkType: string }> | null }> | null } };

export type CreateProofMutationVariables = Exact<{
  data: CreateProofInput;
}>;


export type CreateProofMutation = { __typename?: 'Mutation', createProof: { __typename?: 'Proof', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type UpdateProofMutationVariables = Exact<{
  data: UpdateProofByIdInput;
}>;


export type UpdateProofMutation = { __typename?: 'Mutation', updateProof: { __typename?: 'Proof', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type RemoveProofMutationVariables = Exact<{
  data: IdInput;
}>;


export type RemoveProofMutation = { __typename?: 'Mutation', removeProof: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type FetchOnepointAwayMembersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type FetchOnepointAwayMembersQuery = { __typename?: 'Query', onepointAwayMembers: { __typename?: 'MembersResponse', total?: number | null, members?: Array<{ __typename?: 'Member', id: string, email: string, mobile: string, assetId?: string | null, username: string, fullName: string, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, totalIntroducers: number }> | null } };

export type MemberInOutRevenuesQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type MemberInOutRevenuesQuery = { __typename?: 'Query', memberInOutRevenues: { __typename?: 'MemberInOutRevenueResponse', total?: number | null, inOuts?: Array<{ __typename?: 'MemberInOutRevenue', id: string, amount: number, percent?: number | null, username: string, fullName: string, commission: number, cashCommissionPotential: number }> | null } };

export type WeeklyReportsQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type WeeklyReportsQuery = { __typename?: 'Query', weeklyReports: { __typename?: 'WeeklyReportResponse', total?: number | null, weeklyReports?: Array<{ __typename?: 'WeeklyReport', id: string, fileId: string, createdAt?: any | null, weekStartDate: any, file: { __typename?: 'PFile', id: string, url: string, size: number, mimeType: string, originalName: string } }> | null } };

export type SponsorsQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  week: Scalars['Date']['input'];
}>;


export type SponsorsQuery = { __typename?: 'Query', members: { __typename?: 'MembersResponse', total?: number | null, members?: Array<{ __typename?: 'Member', id: string, ID?: number | null, email: string, point: number, avatar?: string | null, mobile: string, status: boolean, username: string, fullName: string, allowState: MemberState, teamReport: Array<TeamReport>, OTPEnabled: boolean, teamStrategy: TeamStrategy, syncWithSendy: boolean, emailVerified: boolean, primaryAddress: string, weekIntroducers?: number | null, totalIntroducers: number, placementPosition: PlacementPosition, commissionDefault: CommissionDefaultEnum, cmnCalculatedWeeks: number }> | null } };

export type GenerateWeeklyReportMutationVariables = Exact<{
  data: GenerateWeeklyReportInput;
}>;


export type GenerateWeeklyReportMutation = { __typename?: 'Mutation', generateWeeklyReport: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type AdminResetPasswordRequestMutationVariables = Exact<{
  data: EmailInput;
}>;


export type AdminResetPasswordRequestMutation = { __typename?: 'Mutation', adminResetPasswordRequest: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type AdminResetPasswordByTokenMutationVariables = Exact<{
  data: ResetPasswordTokenInput;
}>;


export type AdminResetPasswordByTokenMutation = { __typename?: 'Mutation', adminResetPasswordByToken: { __typename?: 'SuccessResponse', message?: string | null, result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type RewardQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type RewardQuery = { __typename?: 'Query', statistics: { __typename?: 'StatisticsResponse', total?: number | null, statistics?: Array<{ __typename?: 'Statistics', id: string, to: any, from: any, status: boolean, issuedAt: any, txcShared: any, newBlocks: number, totalBlocks: number, totalMembers: number, transactionId?: string | null, totalHashPower: number, statisticsSales?: Array<{ __typename?: 'StatisticsSale', id: string, saleId: string, issuedAt: any }> | null }> | null } };

export type FetchMemberStatisticsQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type FetchMemberStatisticsQuery = { __typename?: 'Query', memberStatistics: { __typename?: 'MemberStatisticsResponse', total?: number | null, memberStatistics?: Array<{ __typename?: 'MemberStatistics', id: string, percent: number, memberId: string, issuedAt: any, txcShared: any, hashPower: number, createdAt?: any | null, updatedAt?: any | null, statisticsId: string, member?: { __typename?: 'Member', id: string, email: string, point: number, mobile: string, status: boolean, username: string, fullName: string, allowState: MemberState, teamReport: Array<TeamReport>, OTPEnabled: boolean, teamStrategy: TeamStrategy, isTexitRanger: boolean, syncWithSendy: boolean, emailVerified: boolean, primaryAddress: string, totalIntroducers: number, placementPosition: PlacementPosition, commissionDefault: CommissionDefaultEnum, cmnCalculatedWeeks: number, commission?: { __typename?: 'CommissionStatus', begL: number, begR: number, newL: number, newR: number } | null, memberWallets?: Array<{ __typename?: 'MemberWallet', id: string, percent: number, address: string, memberId: string, payoutId: string, isDefault: boolean, payout?: { __typename?: 'Payout', id: string, name: string, method: string, status: boolean, display: string } | null }> | null } | null, statistics?: { __typename?: 'Statistics', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, transactionId?: string | null, newBlocks: number, totalBlocks: number, totalHashPower: number, totalMembers: number, status: boolean, txcShared: any, issuedAt: any, from: any, to: any } | null }> | null } };

export type ConfirmStatisticsMutationVariables = Exact<{
  data: ConfirmStatistics;
}>;


export type ConfirmStatisticsMutation = { __typename?: 'Mutation', confirmStatistics: { __typename?: 'Statistics', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type CreateStatisticsMutationVariables = Exact<{
  data: CreateStatisticsInput;
}>;


export type CreateStatisticsMutation = { __typename?: 'Mutation', createStatistics: { __typename?: 'Statistics', id: string, newBlocks: number, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type CreateManyMemberStatisticsMutationVariables = Exact<{
  data: CreateManyMemberStatisticsInput;
}>;


export type CreateManyMemberStatisticsMutation = { __typename?: 'Mutation', createManyMemberStatistics: { __typename?: 'ManySuccessResponse', count: number } };

export type UpdateStatisticsMutationVariables = Exact<{
  data: UpdateStatisticsInput;
}>;


export type UpdateStatisticsMutation = { __typename?: 'Mutation', updateStatistics: { __typename?: 'Statistics', status: boolean, txcShared: any, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type RemoveMemberStatisticsByStaitisIdMutationVariables = Exact<{
  data: IdInput;
}>;


export type RemoveMemberStatisticsByStaitisIdMutation = { __typename?: 'Mutation', removeMemberStatisticsByStaitisId: { __typename?: 'ManySuccessResponse', count: number } };

export type RemoveManyStatisticsMutationVariables = Exact<{
  data: IDsInput;
}>;


export type RemoveManyStatisticsMutation = { __typename?: 'Mutation', removeManyStatistics: { __typename?: 'ManySuccessResponse', count: number } };

export type RolesQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type RolesQuery = { __typename?: 'Query', roles: { __typename?: 'RoleResponse', total?: number | null, roles?: Array<{ __typename?: 'Role', id: string, name: string, sale: number, role: number, commission: number, description: string }> | null } };

export type RoleByIdQueryVariables = Exact<{
  data: IdInput;
}>;


export type RoleByIdQuery = { __typename?: 'Query', roleById: { __typename?: 'Role', id: string, name: string, sale: number, role: number, commission: number, description: string } };

export type CreateRoleMutationVariables = Exact<{
  data: CreateRoleInput;
}>;


export type CreateRoleMutation = { __typename?: 'Mutation', createRole: { __typename?: 'Role', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type UpdateRoleMutationVariables = Exact<{
  data: UpdateRoleInput;
}>;


export type UpdateRoleMutation = { __typename?: 'Mutation', updateRole: { __typename?: 'Role', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type RemoveRoleMutationVariables = Exact<{
  data: IdInput;
}>;


export type RemoveRoleMutation = { __typename?: 'Mutation', removeRole: { __typename?: 'SuccessResponse', result: SuccessResult, message?: string | null, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type SalesQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type SalesQuery = { __typename?: 'Query', sales: { __typename?: 'BasicSalesResponse', total?: number | null, sales?: Array<{ __typename?: 'BasicSale', id: string, ID: number, email: string, token: number, point: number, amount: number, status: boolean, isMetal: boolean, toEmail?: string | null, assetId: string, memberId: string, username: string, fullName: string, orderedAt: any, createdAt: any, sponsorCnt: number, toMemberId?: string | null, toUsername?: string | null, toFullName?: string | null, productName: string, paymentMethod: string }> | null } };

export type SaleByIdQueryVariables = Exact<{
  data: IdInput;
  logsize: Scalars['Float']['input'];
}>;


export type SaleByIdQuery = { __typename?: 'Query', saleById: { __typename?: 'Sale', id: string, ID: number, status: boolean, isMetal: boolean, memberId: string, orderedAt: any, packageId: string, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, sponsorCnt: number, toMemberId?: string | null, paymentMethod: string, statisticsSales?: Array<{ __typename?: 'StatisticsSale', id: string, saleId: string, issuedAt: any, statisticsId: string }> | null, package?: { __typename?: 'Package', id: string, date: any, token: number, point: number, amount: number, status: boolean, freeShare: boolean, productName: string, enrollVisibility: boolean } | null, logs?: Array<{ __typename?: 'EntityLog', id: string, who: string, role: string, when: any, after?: any | null, action: string, before?: any | null, entity: string, status: string }> | null, proof?: { __typename?: 'Proof', id: string, note?: string | null, type: ProofType, refId: string, amount: number, orderedAt: any, files?: Array<{ __typename?: 'PFile', id: string, url: string, size: number, mimeType: string, originalName: string }> | null, reflinks?: Array<{ __typename?: 'RefLink', link: string, linkType: string }> | null } | null, member?: { __typename?: 'Member', id: string, ID?: number | null, email: string, point: number, mobile: string, status: boolean, assetId?: string | null, username: string, fullName: string, createdAt?: any | null, allowState: MemberState, teamReport: Array<TeamReport>, OTPEnabled: boolean, teamStrategy: TeamStrategy, syncWithSendy: boolean, emailVerified: boolean, primaryAddress: string, secondaryAddress?: string | null, totalIntroducers: number, preferredContact?: string | null, placementPosition: PlacementPosition, commissionDefault: CommissionDefaultEnum, cmnCalculatedWeeks: number, preferredContactDetail?: string | null, commission?: { __typename?: 'CommissionStatus', begL: number, begR: number, newL: number, newR: number } | null } | null, toMember?: { __typename?: 'Member', id: string, ID?: number | null, email: string, point: number, mobile: string, status: boolean, assetId?: string | null, username: string, fullName: string, createdAt?: any | null, allowState: MemberState, teamReport: Array<TeamReport>, OTPEnabled: boolean, teamStrategy: TeamStrategy, syncWithSendy: boolean, emailVerified: boolean, primaryAddress: string, secondaryAddress?: string | null, totalIntroducers: number, preferredContact?: string | null, placementPosition: PlacementPosition, commissionDefault: CommissionDefaultEnum, cmnCalculatedWeeks: number, preferredContactDetail?: string | null, commission?: { __typename?: 'CommissionStatus', begL: number, begR: number, newL: number, newR: number } | null } | null, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type SaleBySidQueryVariables = Exact<{
  data: IdnInput;
}>;


export type SaleBySidQuery = { __typename?: 'Query', saleBySID: { __typename?: 'Sale', id: string, ID: number, status: boolean, isMetal: boolean, memberId: string, orderedAt: any, packageId: string, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, sponsorCnt: number, toMemberId?: string | null, paymentMethod: string, statisticsSales?: Array<{ __typename?: 'StatisticsSale', id: string, saleId: string, issuedAt: any, statisticsId: string }> | null, package?: { __typename?: 'Package', id: string, date: any, token: number, point: number, amount: number, status: boolean, freeShare: boolean, productName: string, enrollVisibility: boolean } | null, proof?: { __typename?: 'Proof', id: string, note?: string | null, type: ProofType, refId: string, amount: number, orderedAt: any, files?: Array<{ __typename?: 'PFile', id: string, url: string, size: number, mimeType: string, originalName: string }> | null, reflinks?: Array<{ __typename?: 'RefLink', link: string, linkType: string }> | null } | null, member?: { __typename?: 'Member', id: string, ID?: number | null, email: string, point: number, mobile: string, status: boolean, assetId?: string | null, username: string, fullName: string, createdAt?: any | null, allowState: MemberState, teamReport: Array<TeamReport>, OTPEnabled: boolean, teamStrategy: TeamStrategy, syncWithSendy: boolean, emailVerified: boolean, primaryAddress: string, secondaryAddress?: string | null, totalIntroducers: number, preferredContact?: string | null, placementPosition: PlacementPosition, commissionDefault: CommissionDefaultEnum, cmnCalculatedWeeks: number, preferredContactDetail?: string | null, commission?: { __typename?: 'CommissionStatus', begL: number, begR: number, newL: number, newR: number } | null } | null, toMember?: { __typename?: 'Member', id: string, ID?: number | null, email: string, point: number, mobile: string, status: boolean, assetId?: string | null, username: string, fullName: string, createdAt?: any | null, allowState: MemberState, teamReport: Array<TeamReport>, OTPEnabled: boolean, teamStrategy: TeamStrategy, syncWithSendy: boolean, emailVerified: boolean, primaryAddress: string, secondaryAddress?: string | null, totalIntroducers: number, preferredContact?: string | null, placementPosition: PlacementPosition, commissionDefault: CommissionDefaultEnum, cmnCalculatedWeeks: number, preferredContactDetail?: string | null, commission?: { __typename?: 'CommissionStatus', begL: number, begR: number, newL: number, newR: number } | null } | null, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type FetchSaleStatsQueryVariables = Exact<{
  allFilter?: InputMaybe<Scalars['JSONObject']['input']>;
  inactiveFilter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type FetchSaleStatsQuery = { __typename?: 'Query', all: { __typename?: 'BasicSalesResponse', total?: number | null }, inactive: { __typename?: 'BasicSalesResponse', total?: number | null } };

export type CreateSaleMutationVariables = Exact<{
  data: CreateSaleInput;
}>;


export type CreateSaleMutation = { __typename?: 'Mutation', createSale: { __typename?: 'Sale', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type UpdateSaleMutationVariables = Exact<{
  data: UpdateSaleInput;
}>;


export type UpdateSaleMutation = { __typename?: 'Mutation', updateSale: { __typename?: 'Sale', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type RemoveSaleMutationVariables = Exact<{
  data: IdInput;
}>;


export type RemoveSaleMutation = { __typename?: 'Mutation', removeSale: { __typename?: 'SuccessResponse', result: SuccessResult, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type LoginMutationVariables = Exact<{
  data: AdminLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', adminLogin: { __typename?: 'LoginResponse', accessToken: string, status: LoginResult } };

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

export type MembersByCountryQueryVariables = Exact<{ [key: string]: never; }>;


export type MembersByCountryQuery = { __typename?: 'Query', membersByCountry: Array<{ __typename?: 'MembersByCountryItem', country: string, memberCount: number }> };

export type CreateAdminMutationVariables = Exact<{
  data: CreateAdminInput;
}>;


export type CreateAdminMutation = { __typename?: 'Mutation', createAdmin: { __typename?: 'Admin', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type UpdateAdminMutationVariables = Exact<{
  data: UpdateAdminInput;
}>;


export type UpdateAdminMutation = { __typename?: 'Mutation', updateAdmin: { __typename?: 'Admin', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type FetchUserQueryVariables = Exact<{
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type FetchUserQuery = { __typename?: 'Query', admins: { __typename?: 'AdminsResponse', admins?: Array<{ __typename?: 'Admin', id: string, email: string, avatar: string, roleId: string, username: string, fullName: string, deletedAt?: any | null, OTPEnabled: boolean, role?: { __typename?: 'Role', id: string, name: string, role: number, sale: number, commission: number, description: string } | null }> | null } };

export type GenerateQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GenerateQueryQuery = { __typename?: 'Query', generate2FA: string };

export type Verify2FaAndEnableMutationVariables = Exact<{
  data: Verify2FaInput;
}>;


export type Verify2FaAndEnableMutation = { __typename?: 'Mutation', verify2FAAndEnable: { __typename?: 'AccessTokenResponse', accessToken: string } };

export type Verify2FaTokenMutationVariables = Exact<{
  data: TokenInput;
}>;


export type Verify2FaTokenMutation = { __typename?: 'Mutation', verify2FAToken: { __typename?: 'LoginResponse', accessToken: string, status: LoginResult } };

export type Disable2FaMutationVariables = Exact<{ [key: string]: never; }>;


export type Disable2FaMutation = { __typename?: 'Mutation', disable2FA: { __typename?: 'AccessTokenResponse', accessToken: string } };

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


export type FetchUsersQuery = { __typename?: 'Query', admins: { __typename?: 'AdminsResponse', total?: number | null, admins?: Array<{ __typename?: 'Admin', id: string, email: string, avatar: string, roleId: string, username: string, fullName: string, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, OTPEnabled: boolean, role?: { __typename?: 'Role', id: string, name: string, role: number, sale: number, commission: number, description: string } | null }> | null } };

export type RemoveAdminsMutationVariables = Exact<{
  data: IDsInput;
}>;


export type RemoveAdminsMutation = { __typename?: 'Mutation', removeAdmins: { __typename?: 'ManySuccessResponse', count: number } };

export type UpdatePasswordAdminByIdMutationVariables = Exact<{
  data: UpdateAdminPasswordByIdInput;
}>;


export type UpdatePasswordAdminByIdMutation = { __typename?: 'Mutation', updatePasswordAdminById: { __typename?: 'Admin', id: string, frontActions?: Array<(
      { __typename?: 'FrontAction' }
      & { ' $fragmentRefs'?: { 'FrontActionFieldsFragment': FrontActionFieldsFragment } }
    )> | null } };

export type HistoryStatisticsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type HistoryStatisticsQuery = { __typename?: 'Query', statistics: { __typename?: 'StatisticsResponse', total?: number | null, statistics?: Array<{ __typename?: 'Statistics', id: string, totalHashPower: number, newBlocks: number, totalBlocks: number, totalMembers: number, txcShared: any, issuedAt: any, from: any, to: any, status: boolean, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null }> | null } };

export type BlocksDataQueryVariables = Exact<{
  data: PeriodStatsArgs;
}>;


export type BlocksDataQuery = { __typename?: 'Query', blocksData: Array<{ __typename?: 'BlockStatsResponse', hashRate: number, difficulty: number, base: string, baseDate?: any | null, soldHashPower: number }> };

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


export type TopEarnersQuery = { __typename?: 'Query', topEarners: Array<{ __typename?: 'TopEarnersResponse', avatar?: string | null, earned: number, fullName: string }> };

export type TopRecruitersQueryVariables = Exact<{ [key: string]: never; }>;


export type TopRecruitersQuery = { __typename?: 'Query', topRecruiters: Array<{ __typename?: 'TopRecruitersResponse', avatar?: string | null, fullName: string, totalIntroducers: number }> };

export type FrontActionFieldsFragment = { __typename?: 'FrontAction', action: FrontActionEnum, message: string, extra?: { __typename?: 'FrontActionCreate12FreeBonusSale', username: string, fullName: string, memberId: string, packageId: string, sponsorCnt: number, packageName: string, paymentMethod: string, isWithinSponsorRollDuration: boolean } | { __typename?: 'FrontActionRemove12FreeBonusSale', id: string } | { __typename?: 'FrontActionUpdate12FreeBonusSale', id: string, oldPackageId: string, newPackageId: string, oldPackageName: string, newPackageName: string, status: boolean } | null } & { ' $fragmentName'?: 'FrontActionFieldsFragment' };

export type PayoutFieldsFragment = { __typename?: 'Payout', id: string, method: string, display: string, name: string, status: boolean, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null } & { ' $fragmentName'?: 'PayoutFieldsFragment' };

export type PackageFieldsFragment = { __typename?: 'Package', id: string, date: any, token: number, point: number, amount: number, status: boolean, freeShare: boolean, productName: string, enrollVisibility: boolean } & { ' $fragmentName'?: 'PackageFieldsFragment' };

export const FrontActionFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<FrontActionFieldsFragment, unknown>;
export const PayoutFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PayoutFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Payout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"display"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]} as unknown as DocumentNode<PayoutFieldsFragment, unknown>;
export const PackageFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PackageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"freeShare"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"enrollVisibility"}}]}}]} as unknown as DocumentNode<PackageFieldsFragment, unknown>;
export const FetchMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"roleId"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sale"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"commission"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"OTPEnabled"}}]}}]}}]} as unknown as DocumentNode<FetchMeQuery, FetchMeQueryVariables>;
export const AdminResetTokenVerifyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"adminResetTokenVerify"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminResetTokenVerify"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<AdminResetTokenVerifyMutation, AdminResetTokenVerifyMutationVariables>;
export const CalculateProfitabilityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CalculateProfitability"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProfitabilityCalculationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"calculateProfitability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"target"}},{"kind":"Field","name":{"kind":"Name","value":"init"}},{"kind":"Field","name":{"kind":"Name","value":"period"}},{"kind":"Field","name":{"kind":"Name","value":"txc"}},{"kind":"Field","name":{"kind":"Name","value":"txcCost"}},{"kind":"Field","name":{"kind":"Name","value":"extraTXC"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"txcPrice"}}]}}]}}]} as unknown as DocumentNode<CalculateProfitabilityQuery, CalculateProfitabilityQueryVariables>;
export const WeeklyCommissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WeeklyCommissions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weeklyCommissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weeklyCommissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"begL"}},{"kind":"Field","name":{"kind":"Name","value":"begR"}},{"kind":"Field","name":{"kind":"Name","value":"newL"}},{"kind":"Field","name":{"kind":"Name","value":"newR"}},{"kind":"Field","name":{"kind":"Name","value":"maxL"}},{"kind":"Field","name":{"kind":"Name","value":"maxR"}},{"kind":"Field","name":{"kind":"Name","value":"endL"}},{"kind":"Field","name":{"kind":"Name","value":"endR"}},{"kind":"Field","name":{"kind":"Name","value":"pkgL"}},{"kind":"Field","name":{"kind":"Name","value":"pkgR"}},{"kind":"Field","name":{"kind":"Name","value":"cash"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"qualified"}},{"kind":"Field","name":{"kind":"Name","value":"shortNote"}},{"kind":"Field","name":{"kind":"Name","value":"commission"}},{"kind":"Field","name":{"kind":"Name","value":"isTexitRanger"}},{"kind":"Field","name":{"kind":"Name","value":"weekStartDate"}},{"kind":"Field","name":{"kind":"Name","value":"commissionDefault"}},{"kind":"Field","name":{"kind":"Name","value":"invoice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"proof"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<WeeklyCommissionsQuery, WeeklyCommissionsQueryVariables>;
export const WeeklyCommissionByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WeeklyCommissionById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weeklyCommissionById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"cash"}},{"kind":"Field","name":{"kind":"Name","value":"begL"}},{"kind":"Field","name":{"kind":"Name","value":"begR"}},{"kind":"Field","name":{"kind":"Name","value":"newL"}},{"kind":"Field","name":{"kind":"Name","value":"newR"}},{"kind":"Field","name":{"kind":"Name","value":"maxL"}},{"kind":"Field","name":{"kind":"Name","value":"maxR"}},{"kind":"Field","name":{"kind":"Name","value":"endL"}},{"kind":"Field","name":{"kind":"Name","value":"endR"}},{"kind":"Field","name":{"kind":"Name","value":"pkgL"}},{"kind":"Field","name":{"kind":"Name","value":"pkgR"}},{"kind":"Field","name":{"kind":"Name","value":"cash"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"shortNote"}},{"kind":"Field","name":{"kind":"Name","value":"commission"}},{"kind":"Field","name":{"kind":"Name","value":"weekStartDate"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"proof"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"reflinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"linkType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<WeeklyCommissionByIdQuery, WeeklyCommissionByIdQueryVariables>;
export const FetchCommissionStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchCommissionStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"allFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pendingFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"declinedFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"approvedFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"all"},"name":{"kind":"Name","value":"weeklyCommissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"allFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"pending"},"name":{"kind":"Name","value":"weeklyCommissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pendingFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"declined"},"name":{"kind":"Name","value":"weeklyCommissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"declinedFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"approved"},"name":{"kind":"Name","value":"weeklyCommissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"approvedFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FetchCommissionStatsQuery, FetchCommissionStatsQueryVariables>;
export const CommissionsByWeekDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommissionsByWeek"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"weekStartDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTimeISO"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commissionsByWeek"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"weekStartDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"weekStartDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weekStartDate"}},{"kind":"Field","name":{"kind":"Name","value":"totalSale"}},{"kind":"Field","name":{"kind":"Name","value":"totalRevenue"}},{"kind":"Field","name":{"kind":"Name","value":"totalMember"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<CommissionsByWeekQuery, CommissionsByWeekQueryVariables>;
export const GenerateCommissionSendmanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GenerateCommissionSendmany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TXCPriceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateCommissionSendmany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ids"}},{"kind":"Field","name":{"kind":"Name","value":"command"}}]}}]}}]} as unknown as DocumentNode<GenerateCommissionSendmanyQuery, GenerateCommissionSendmanyQueryVariables>;
export const ApproveCommissionWithTransactionIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApproveCommissionWithTransactionIds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ApproveCommissionWithTxIDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approveCommissionWithTransactionIds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<ApproveCommissionWithTransactionIdsMutation, ApproveCommissionWithTransactionIdsMutationVariables>;
export const UpdateCommissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateCommission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WeeklyCommissionUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCommission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCommissionMutation, UpdateCommissionMutationVariables>;
export const UpdateCommissionsStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateCommissionsStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WeeklyCommissionsStatusUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCommissionsStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCommissionsStatusMutation, UpdateCommissionsStatusMutationVariables>;
export const CalculateCommissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CalculateCommissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"calculateCommissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CalculateCommissionsMutation, CalculateCommissionsMutationVariables>;
export const CalculatePreviewCommissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CalculatePreviewCommissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"calculatePreviewCommissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CalculatePreviewCommissionsMutation, CalculatePreviewCommissionsMutationVariables>;
export const UpdateCommissionShortNoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateCommissionShortNote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WeeklyCommissionNoteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCommissionShortNote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCommissionShortNoteMutation, UpdateCommissionShortNoteMutationVariables>;
export const WeeklyMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WeeklyMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weeklyCommissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weeklyCommissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<WeeklyMembersQuery, WeeklyMembersQueryVariables>;
export const MembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Members"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<MembersQuery, MembersQueryVariables>;
export const MemberlistsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Memberlists"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberlists"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberLists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"emails"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<MemberlistsQuery, MemberlistsQueryVariables>;
export const MemberListByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MemberListById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberListById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"emails"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}}]}}]} as unknown as DocumentNode<MemberListByIdQuery, MemberListByIdQueryVariables>;
export const EmailTemplatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EmailTemplates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"emailTemplates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"templates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<EmailTemplatesQuery, EmailTemplatesQueryVariables>;
export const EmailTemplateByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EmailTemplateById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"emailTemplateById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<EmailTemplateByIdQuery, EmailTemplateByIdQueryVariables>;
export const CampaignsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Campaigns"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaigns"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaigns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"listType"}},{"kind":"Field","name":{"kind":"Name","value":"listExtra"}},{"kind":"Field","name":{"kind":"Name","value":"recipients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"sent"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"sentTime"}},{"kind":"Field","name":{"kind":"Name","value":"openTime"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<CampaignsQuery, CampaignsQueryVariables>;
export const CampaignByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CampaignById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaignById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"listType"}},{"kind":"Field","name":{"kind":"Name","value":"listExtra"}},{"kind":"Field","name":{"kind":"Name","value":"recipients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"sent"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"sentTime"}},{"kind":"Field","name":{"kind":"Name","value":"openTime"}}]}}]}}]}}]} as unknown as DocumentNode<CampaignByIdQuery, CampaignByIdQueryVariables>;
export const CreateAndSendCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAndSendCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCampaignInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAndSendCampaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateAndSendCampaignMutation, CreateAndSendCampaignMutationVariables>;
export const CreateMemberListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMemberList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMemberListInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMemberList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateMemberListMutation, CreateMemberListMutationVariables>;
export const CreateEmailTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEmailTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateEmailTemplateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEmailTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateEmailTemplateMutation, CreateEmailTemplateMutationVariables>;
export const UpdateEmailTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEmailTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateEmailTemplateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEmailTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateEmailTemplateMutation, UpdateEmailTemplateMutationVariables>;
export const RemoveMemberListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveMemberList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeMemberList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveMemberListMutation, RemoveMemberListMutationVariables>;
export const GroupSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GroupSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groupSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groupSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"limitDate"}},{"kind":"Field","name":{"kind":"Name","value":"commissionDefaults"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorBonusPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"rollSponsorBonusPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"groupSettingCommissionBonuses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lPoint"}},{"kind":"Field","name":{"kind":"Name","value":"rPoint"}},{"kind":"Field","name":{"kind":"Name","value":"commission"}},{"kind":"Field","name":{"kind":"Name","value":"qPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"uPackageId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sponsorBonusPackage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"freeShare"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"enrollVisibility"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<GroupSettingsQuery, GroupSettingsQueryVariables>;
export const CreateGroupSettingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createGroupSetting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGroupSettingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGroupSetting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateGroupSettingMutation, CreateGroupSettingMutationVariables>;
export const UpdateGroupSettingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateGroupSetting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGroupSettingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGroupSetting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateGroupSettingMutation, UpdateGroupSettingMutationVariables>;
export const RemoveGroupSettingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeGroupSetting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeGroupSetting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveGroupSettingMutation, RemoveGroupSettingMutationVariables>;
export const InvoicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Invoices"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invoices"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invoices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amountInCents"}},{"kind":"Field","name":{"kind":"Name","value":"proof"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"refId"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reflinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"linkType"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<InvoicesQuery, InvoicesQueryVariables>;
export const InvoiceByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"InvoiceById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDNInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invoiceById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amountInCents"}},{"kind":"Field","name":{"kind":"Name","value":"proof"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"refId"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reflinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"linkType"}}]}}]}}]}}]}}]} as unknown as DocumentNode<InvoiceByIdQuery, InvoiceByIdQueryVariables>;
export const MoveInvoicePaidDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MoveInvoicePaid"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDNInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moveInvoicePaid"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<MoveInvoicePaidMutation, MoveInvoicePaidMutationVariables>;
export const UpdateInvoiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateInvoice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateInvoiceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateInvoice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateInvoiceMutation, UpdateInvoiceMutationVariables>;
export const GenerateWeekP2PInvoiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateWeekP2PInvoice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InvoiceWeekInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateWeekP2PInvoice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GenerateWeekP2PInvoiceMutation, GenerateWeekP2PInvoiceMutationVariables>;
export const RegenerateInvoiceByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegenerateInvoiceById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDNInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"regenerateInvoiceById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<RegenerateInvoiceByIdMutation, RegenerateInvoiceByIdMutationVariables>;
export const AdminNotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminNotes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminNotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminNotes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"adminId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}},{"kind":"Field","name":{"kind":"Name","value":"placementParentId"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}},{"kind":"Field","name":{"kind":"Name","value":"syncWithSendy"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContact"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContactDetail"}},{"kind":"Field","name":{"kind":"Name","value":"commission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"begL"}},{"kind":"Field","name":{"kind":"Name","value":"begR"}},{"kind":"Field","name":{"kind":"Name","value":"newL"}},{"kind":"Field","name":{"kind":"Name","value":"newR"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<AdminNotesQuery, AdminNotesQueryVariables>;
export const CreateAdminNoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createAdminNote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAdminNotesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAdminNote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateAdminNoteMutation, CreateAdminNoteMutationVariables>;
export const UpdateAdminNoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateAdminNote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAdminNotesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAdminNote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateAdminNoteMutation, UpdateAdminNoteMutationVariables>;
export const RemoveAdminNoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeAdminNote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeAdminNote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveAdminNoteMutation, RemoveAdminNoteMutationVariables>;
export const FetchMemberStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchMemberStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"approveFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pendingFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"graveyardFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paidFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"blockFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"APPROVED"},"name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"approveFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"PENDING"},"name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pendingFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"GRAVEYARD"},"name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"graveyardFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"PAID"},"name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paidFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"BLOCKED"},"name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"blockFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FetchMemberStatsQuery, FetchMemberStatsQueryVariables>;
export const FetchMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorId"}},{"kind":"Field","name":{"kind":"Name","value":"promoCode"}},{"kind":"Field","name":{"kind":"Name","value":"allowState"}},{"kind":"Field","name":{"kind":"Name","value":"OTPEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"teamReport"}},{"kind":"Field","name":{"kind":"Name","value":"teamStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"isTexitRanger"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"syncWithSendy"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContact"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}},{"kind":"Field","name":{"kind":"Name","value":"commissionDefault"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"placementParentId"}},{"kind":"Field","name":{"kind":"Name","value":"signupFormRequest"}},{"kind":"Field","name":{"kind":"Name","value":"cmnCalculatedWeeks"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContactDetail"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"adminNotes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"adminId"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"roleId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"OTPEnabled"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FetchMembersQuery, FetchMembersQueryVariables>;
export const MemberByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MemberById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"logsize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorId"}},{"kind":"Field","name":{"kind":"Name","value":"promoCode"}},{"kind":"Field","name":{"kind":"Name","value":"allowState"}},{"kind":"Field","name":{"kind":"Name","value":"OTPEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"teamReport"}},{"kind":"Field","name":{"kind":"Name","value":"teamStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"isTexitRanger"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"syncWithSendy"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContact"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}},{"kind":"Field","name":{"kind":"Name","value":"commissionDefault"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"signupFormRequest"}},{"kind":"Field","name":{"kind":"Name","value":"cmnCalculatedWeeks"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContactDetail"}},{"kind":"Field","name":{"kind":"Name","value":"groupSetting"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"commissionDefaults"}}]}},{"kind":"Field","name":{"kind":"Name","value":"commission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"begL"}},{"kind":"Field","name":{"kind":"Name","value":"begR"}},{"kind":"Field","name":{"kind":"Name","value":"newL"}},{"kind":"Field","name":{"kind":"Name","value":"newR"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sponsor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"allowState"}},{"kind":"Field","name":{"kind":"Name","value":"teamReport"}},{"kind":"Field","name":{"kind":"Name","value":"OTPEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"teamStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"isTexitRanger"}},{"kind":"Field","name":{"kind":"Name","value":"syncWithSendy"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"commissionDefault"}},{"kind":"Field","name":{"kind":"Name","value":"cmnCalculatedWeeks"}}]}},{"kind":"Field","name":{"kind":"Name","value":"placementParentId"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"placementParent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"allowState"}},{"kind":"Field","name":{"kind":"Name","value":"teamReport"}},{"kind":"Field","name":{"kind":"Name","value":"OTPEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"teamStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"isTexitRanger"}},{"kind":"Field","name":{"kind":"Name","value":"syncWithSendy"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"commissionDefault"}},{"kind":"Field","name":{"kind":"Name","value":"cmnCalculatedWeeks"}}]}},{"kind":"Field","name":{"kind":"Name","value":"placementChildren"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"allowState"}},{"kind":"Field","name":{"kind":"Name","value":"teamReport"}},{"kind":"Field","name":{"kind":"Name","value":"OTPEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"teamStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"isTexitRanger"}},{"kind":"Field","name":{"kind":"Name","value":"syncWithSendy"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"commissionDefault"}},{"kind":"Field","name":{"kind":"Name","value":"cmnCalculatedWeeks"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sales"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"isMetal"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"proof"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"refId"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reflinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"linkType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"memberWallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"percent"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"payoutId"}},{"kind":"Field","name":{"kind":"Name","value":"isDefault"}},{"kind":"Field","name":{"kind":"Name","value":"payout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"display"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"logsize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"logsize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"who"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"when"}},{"kind":"Field","name":{"kind":"Name","value":"after"}},{"kind":"Field","name":{"kind":"Name","value":"entity"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"before"}}]}},{"kind":"Field","name":{"kind":"Name","value":"adminNotes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"adminId"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"roleId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"OTPEnabled"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"communications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"sent"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"openTime"}},{"kind":"Field","name":{"kind":"Name","value":"sentTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"setting"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"communication"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]}}]} as unknown as DocumentNode<MemberByIdQuery, MemberByIdQueryVariables>;
export const SearchMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"teamStrategy"}}]}}]}}]}}]} as unknown as DocumentNode<SearchMembersQuery, SearchMembersQueryVariables>;
export const IndividualMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IndividualMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"individualMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorUsername"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorFullname"}}]}}]}}]} as unknown as DocumentNode<IndividualMembersQuery, IndividualMembersQueryVariables>;
export const CreateMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMemberInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateMemberMutation, CreateMemberMutationVariables>;
export const UpdateMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMemberInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateMemberMutation, UpdateMemberMutationVariables>;
export const MemberOverviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MemberOverview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberOverview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"joinDate"}},{"kind":"Field","name":{"kind":"Name","value":"totalTXCShared"}},{"kind":"Field","name":{"kind":"Name","value":"currentHashPower"}},{"kind":"Field","name":{"kind":"Name","value":"cashCommissionPotential"}}]}}]}}]} as unknown as DocumentNode<MemberOverviewQuery, MemberOverviewQueryVariables>;
export const MemberStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MemberStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberStatistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"hashPower"}},{"kind":"Field","name":{"kind":"Name","value":"txcShared"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<MemberStatisticsQuery, MemberStatisticsQueryVariables>;
export const PayoutsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Payouts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payouts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payouts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"display"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<PayoutsQuery, PayoutsQueryVariables>;
export const UpdatePasswordMemberByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePasswordMemberById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMemberPasswordInputById"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePasswordMemberById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdatePasswordMemberByIdMutation, UpdatePasswordMemberByIdMutationVariables>;
export const RemoveMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveMemberMutation, RemoveMemberMutationVariables>;
export const RemoveCompleteMemberPlacementDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeCompleteMemberPlacement"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeCompleteMemberPlacement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveCompleteMemberPlacementMutation, RemoveCompleteMemberPlacementMutationVariables>;
export const ApproveMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"approveMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approveMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<ApproveMemberMutation, ApproveMemberMutationVariables>;
export const SendWelcomeEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendWelcomeEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendWelcomeEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<SendWelcomeEmailMutation, SendWelcomeEmailMutationVariables>;
export const MoveToGraveyardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"moveToGraveyard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moveToGraveyard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<MoveToGraveyardMutation, MoveToGraveyardMutationVariables>;
export const MoveToPaidDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MoveToPaid"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moveToPaid"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<MoveToPaidMutation, MoveToPaidMutationVariables>;
export const MoveToPendingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MoveToPending"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moveToPending"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<MoveToPendingMutation, MoveToPendingMutationVariables>;
export const VerifyMemberEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"verifyMemberEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyMemberEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<VerifyMemberEmailMutation, VerifyMemberEmailMutationVariables>;
export const DuplicateMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DuplicateMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duplicateMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DuplicateMemberMutation, DuplicateMemberMutationVariables>;
export const ResetBonusClockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetBonusClock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetBonusClock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}}]} as unknown as DocumentNode<ResetBonusClockMutation, ResetBonusClockMutationVariables>;
export const MoveToBlockedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MoveToBlocked"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moveToBlocked"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<MoveToBlockedMutation, MoveToBlockedMutationVariables>;
export const ForceMemberLogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ForceMemberLogout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forceMemberLogout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<ForceMemberLogoutMutation, ForceMemberLogoutMutationVariables>;
export const NotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Notifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<NotificationsQuery, NotificationsQueryVariables>;
export const SetReadNotificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setReadNotification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setReadNotification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<SetReadNotificationMutation, SetReadNotificationMutationVariables>;
export const SetReadAllNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setReadAllNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setReadAllNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<SetReadAllNotificationsMutation, SetReadAllNotificationsMutationVariables>;
export const NewNotificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"NewNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<NewNotificationSubscription, NewNotificationSubscriptionVariables>;
export const PaymentMethodsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaymentMethods"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paymentMethods"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paymentMethods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"defaultLink"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethodLinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethodId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<PaymentMethodsQuery, PaymentMethodsQueryVariables>;
export const CreatePaymentMethodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPaymentMethod"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePaymentMethodInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPaymentMethod"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreatePaymentMethodMutation, CreatePaymentMethodMutationVariables>;
export const UpdatePaymentMethodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePaymentMethod"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePaymentMethodInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePaymentMethod"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdatePaymentMethodMutation, UpdatePaymentMethodMutationVariables>;
export const RemovePaymentMethodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removePaymentMethod"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removePaymentMethod"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<RemovePaymentMethodMutation, RemovePaymentMethodMutationVariables>;
export const RemoveMemberFromPlacementTreeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveMemberFromPlacementTree"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeMemberFromPlacementTree"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveMemberFromPlacementTreeMutation, RemoveMemberFromPlacementTreeMutationVariables>;
export const SponsorMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SponsorMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"sponsor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<SponsorMembersQuery, SponsorMembersQueryVariables>;
export const FetchPlacementMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchPlacementMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorId"}},{"kind":"Field","name":{"kind":"Name","value":"allowState"}},{"kind":"Field","name":{"kind":"Name","value":"teamReport"}},{"kind":"Field","name":{"kind":"Name","value":"OTPEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"teamStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"placementParentId"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"cmnCalculatedWeeks"}},{"kind":"Field","name":{"kind":"Name","value":"placementParent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sponsor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"commission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"begL"}},{"kind":"Field","name":{"kind":"Name","value":"begR"}},{"kind":"Field","name":{"kind":"Name","value":"newL"}},{"kind":"Field","name":{"kind":"Name","value":"newR"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FetchPlacementMembersQuery, FetchPlacementMembersQueryVariables>;
export const PlacementMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlacementMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"placementMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"commission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"begL"}},{"kind":"Field","name":{"kind":"Name","value":"begR"}},{"kind":"Field","name":{"kind":"Name","value":"newL"}},{"kind":"Field","name":{"kind":"Name","value":"newR"}}]}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"placementParentId"}},{"kind":"Field","name":{"kind":"Name","value":"cmnCalculatedWeeks"}},{"kind":"Field","name":{"kind":"Name","value":"teamStrategy"}}]}}]}}]} as unknown as DocumentNode<PlacementMembersQuery, PlacementMembersQueryVariables>;
export const PlacementMembersForWeekDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlacementMembersForWeek"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WeekStartDateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"placementMembersForWeek"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maxL"}},{"kind":"Field","name":{"kind":"Name","value":"maxR"}},{"kind":"Field","name":{"kind":"Name","value":"pkgL"}},{"kind":"Field","name":{"kind":"Name","value":"pkgR"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"commission"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"placementParentId"}}]}}]}}]} as unknown as DocumentNode<PlacementMembersForWeekQuery, PlacementMembersForWeekQueryVariables>;
export const PackagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Packages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"freeShare"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"enrollVisibility"}},{"kind":"Field","name":{"kind":"Name","value":"sales"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"isMetal"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"proof"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"refId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reflinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"linkType"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<PackagesQuery, PackagesQueryVariables>;
export const FetchPackageStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchPackageStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"allFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inactiveFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"all"},"name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"allFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"inactive"},"name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inactiveFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FetchPackageStatsQuery, FetchPackageStatsQueryVariables>;
export const CreatePackageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPackage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePackageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreatePackageMutation, CreatePackageMutationVariables>;
export const UpdatePackageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePackage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePackageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdatePackageMutation, UpdatePackageMutationVariables>;
export const RemovePackageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removePackage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removePackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<RemovePackageMutation, RemovePackageMutationVariables>;
export const UpdatePasswordAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePasswordAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAdminPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePasswordAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdatePasswordAdminMutation, UpdatePasswordAdminMutationVariables>;
export const PromosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Promos"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"promos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"promos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<PromosQuery, PromosQueryVariables>;
export const CreatePromoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPromo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePromoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPromo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreatePromoMutation, CreatePromoMutationVariables>;
export const UpdatePromoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePromo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePromoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePromo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdatePromoMutation, UpdatePromoMutationVariables>;
export const RemovePromoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removePromo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removePromo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<RemovePromoMutation, RemovePromoMutationVariables>;
export const ProofsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Proofs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proofs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proofs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"refId"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"vendor"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}},{"kind":"Field","name":{"kind":"Name","value":"mineLocation"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reflinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"linkType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<ProofsQuery, ProofsQueryVariables>;
export const CreateProofDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProof"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProofInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProof"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateProofMutation, CreateProofMutationVariables>;
export const UpdateProofDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProof"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProofByIDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProof"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateProofMutation, UpdateProofMutationVariables>;
export const RemoveProofDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeProof"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProof"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveProofMutation, RemoveProofMutationVariables>;
export const FetchOnepointAwayMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchOnepointAwayMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onepointAwayMembers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FetchOnepointAwayMembersQuery, FetchOnepointAwayMembersQueryVariables>;
export const MemberInOutRevenuesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MemberInOutRevenues"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberInOutRevenues"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inOuts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"percent"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"commission"}},{"kind":"Field","name":{"kind":"Name","value":"cashCommissionPotential"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<MemberInOutRevenuesQuery, MemberInOutRevenuesQueryVariables>;
export const WeeklyReportsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WeeklyReports"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weeklyReports"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weeklyReports"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"weekStartDate"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<WeeklyReportsQuery, WeeklyReportsQueryVariables>;
export const SponsorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Sponsors"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"week"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"allowState"}},{"kind":"Field","name":{"kind":"Name","value":"teamReport"}},{"kind":"Field","name":{"kind":"Name","value":"OTPEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"teamStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"syncWithSendy"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"weekIntroducers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"week"},"value":{"kind":"Variable","name":{"kind":"Name","value":"week"}}}]},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"commissionDefault"}},{"kind":"Field","name":{"kind":"Name","value":"cmnCalculatedWeeks"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<SponsorsQuery, SponsorsQueryVariables>;
export const GenerateWeeklyReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"generateWeeklyReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GenerateWeeklyReportInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateWeeklyReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GenerateWeeklyReportMutation, GenerateWeeklyReportMutationVariables>;
export const AdminResetPasswordRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"adminResetPasswordRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminResetPasswordRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AdminResetPasswordRequestMutation, AdminResetPasswordRequestMutationVariables>;
export const AdminResetPasswordByTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"adminResetPasswordByToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminResetPasswordByToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AdminResetPasswordByTokenMutation, AdminResetPasswordByTokenMutationVariables>;
export const RewardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Reward"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"txcShared"}},{"kind":"Field","name":{"kind":"Name","value":"newBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalMembers"}},{"kind":"Field","name":{"kind":"Name","value":"transactionId"}},{"kind":"Field","name":{"kind":"Name","value":"totalHashPower"}},{"kind":"Field","name":{"kind":"Name","value":"statisticsSales"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"saleId"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<RewardQuery, RewardQueryVariables>;
export const FetchMemberStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchMemberStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberStatistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"percent"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"txcShared"}},{"kind":"Field","name":{"kind":"Name","value":"hashPower"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"statisticsId"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"allowState"}},{"kind":"Field","name":{"kind":"Name","value":"teamReport"}},{"kind":"Field","name":{"kind":"Name","value":"OTPEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"teamStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"isTexitRanger"}},{"kind":"Field","name":{"kind":"Name","value":"syncWithSendy"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"commissionDefault"}},{"kind":"Field","name":{"kind":"Name","value":"cmnCalculatedWeeks"}},{"kind":"Field","name":{"kind":"Name","value":"commission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"begL"}},{"kind":"Field","name":{"kind":"Name","value":"begR"}},{"kind":"Field","name":{"kind":"Name","value":"newL"}},{"kind":"Field","name":{"kind":"Name","value":"newR"}}]}},{"kind":"Field","name":{"kind":"Name","value":"memberWallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"percent"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"payoutId"}},{"kind":"Field","name":{"kind":"Name","value":"isDefault"}},{"kind":"Field","name":{"kind":"Name","value":"payout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"display"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"transactionId"}},{"kind":"Field","name":{"kind":"Name","value":"newBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalHashPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalMembers"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"txcShared"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FetchMemberStatisticsQuery, FetchMemberStatisticsQueryVariables>;
export const ConfirmStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"confirmStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ConfirmStatistics"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<ConfirmStatisticsMutation, ConfirmStatisticsMutationVariables>;
export const CreateStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateStatisticsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"newBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateStatisticsMutation, CreateStatisticsMutationVariables>;
export const CreateManyMemberStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createManyMemberStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateManyMemberStatisticsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createManyMemberStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<CreateManyMemberStatisticsMutation, CreateManyMemberStatisticsMutationVariables>;
export const UpdateStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateStatisticsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"txcShared"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateStatisticsMutation, UpdateStatisticsMutationVariables>;
export const RemoveMemberStatisticsByStaitisIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeMemberStatisticsByStaitisId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeMemberStatisticsByStaitisId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<RemoveMemberStatisticsByStaitisIdMutation, RemoveMemberStatisticsByStaitisIdMutationVariables>;
export const RemoveManyStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeManyStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeManyStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<RemoveManyStatisticsMutation, RemoveManyStatisticsMutationVariables>;
export const RolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Roles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sale"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"commission"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<RolesQuery, RolesQueryVariables>;
export const RoleByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RoleById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roleById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sale"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"commission"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<RoleByIdQuery, RoleByIdQueryVariables>;
export const CreateRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRoleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateRoleMutation, CreateRoleMutationVariables>;
export const UpdateRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRoleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateRoleMutation, UpdateRoleMutationVariables>;
export const RemoveRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveRoleMutation, RemoveRoleMutationVariables>;
export const SalesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Sales"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sales"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sales"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"isMetal"}},{"kind":"Field","name":{"kind":"Name","value":"toEmail"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"toMemberId"}},{"kind":"Field","name":{"kind":"Name","value":"toUsername"}},{"kind":"Field","name":{"kind":"Name","value":"toFullName"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<SalesQuery, SalesQueryVariables>;
export const SaleByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SaleById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"logsize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saleById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"isMetal"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"toMemberId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"statisticsSales"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"saleId"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"statisticsId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"freeShare"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"enrollVisibility"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"logsize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"logsize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"who"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"when"}},{"kind":"Field","name":{"kind":"Name","value":"after"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"before"}},{"kind":"Field","name":{"kind":"Name","value":"entity"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"proof"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"refId"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reflinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"linkType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"allowState"}},{"kind":"Field","name":{"kind":"Name","value":"teamReport"}},{"kind":"Field","name":{"kind":"Name","value":"OTPEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"teamStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"syncWithSendy"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContact"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"commissionDefault"}},{"kind":"Field","name":{"kind":"Name","value":"cmnCalculatedWeeks"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContactDetail"}},{"kind":"Field","name":{"kind":"Name","value":"commission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"begL"}},{"kind":"Field","name":{"kind":"Name","value":"begR"}},{"kind":"Field","name":{"kind":"Name","value":"newL"}},{"kind":"Field","name":{"kind":"Name","value":"newR"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"toMember"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"allowState"}},{"kind":"Field","name":{"kind":"Name","value":"teamReport"}},{"kind":"Field","name":{"kind":"Name","value":"OTPEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"teamStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"syncWithSendy"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContact"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"commissionDefault"}},{"kind":"Field","name":{"kind":"Name","value":"cmnCalculatedWeeks"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContactDetail"}},{"kind":"Field","name":{"kind":"Name","value":"commission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"begL"}},{"kind":"Field","name":{"kind":"Name","value":"begR"}},{"kind":"Field","name":{"kind":"Name","value":"newL"}},{"kind":"Field","name":{"kind":"Name","value":"newR"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<SaleByIdQuery, SaleByIdQueryVariables>;
export const SaleBySidDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SaleBySID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDNInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saleBySID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"isMetal"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"toMemberId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"statisticsSales"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"saleId"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"statisticsId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"freeShare"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"enrollVisibility"}}]}},{"kind":"Field","name":{"kind":"Name","value":"proof"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"refId"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reflinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"linkType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"allowState"}},{"kind":"Field","name":{"kind":"Name","value":"teamReport"}},{"kind":"Field","name":{"kind":"Name","value":"OTPEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"teamStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"syncWithSendy"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContact"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"commissionDefault"}},{"kind":"Field","name":{"kind":"Name","value":"cmnCalculatedWeeks"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContactDetail"}},{"kind":"Field","name":{"kind":"Name","value":"commission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"begL"}},{"kind":"Field","name":{"kind":"Name","value":"begR"}},{"kind":"Field","name":{"kind":"Name","value":"newL"}},{"kind":"Field","name":{"kind":"Name","value":"newR"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"toMember"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"allowState"}},{"kind":"Field","name":{"kind":"Name","value":"teamReport"}},{"kind":"Field","name":{"kind":"Name","value":"OTPEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"teamStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"syncWithSendy"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContact"}},{"kind":"Field","name":{"kind":"Name","value":"placementPosition"}},{"kind":"Field","name":{"kind":"Name","value":"commissionDefault"}},{"kind":"Field","name":{"kind":"Name","value":"cmnCalculatedWeeks"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContactDetail"}},{"kind":"Field","name":{"kind":"Name","value":"commission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"begL"}},{"kind":"Field","name":{"kind":"Name","value":"begR"}},{"kind":"Field","name":{"kind":"Name","value":"newL"}},{"kind":"Field","name":{"kind":"Name","value":"newR"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<SaleBySidQuery, SaleBySidQueryVariables>;
export const FetchSaleStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchSaleStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"allFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inactiveFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"all"},"name":{"kind":"Name","value":"sales"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"allFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"inactive"},"name":{"kind":"Name","value":"sales"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inactiveFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FetchSaleStatsQuery, FetchSaleStatsQueryVariables>;
export const CreateSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createSale"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSaleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSale"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateSaleMutation, CreateSaleMutationVariables>;
export const UpdateSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateSale"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSaleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSale"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateSaleMutation, UpdateSaleMutationVariables>;
export const RemoveSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeSale"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSale"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveSaleMutation, RemoveSaleMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminLoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LiveStatsArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"liveBlockStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dailyData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"field"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"liveMiningStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dailyData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"field"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"liveUserStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dailyData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"field"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const BlocksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Blocks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"blockNo"}},{"kind":"Field","name":{"kind":"Name","value":"hashRate"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<BlocksQuery, BlocksQueryVariables>;
export const StatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Statistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalHashPower"}},{"kind":"Field","name":{"kind":"Name","value":"newBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalMembers"}},{"kind":"Field","name":{"kind":"Name","value":"txcShared"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<StatisticsQuery, StatisticsQueryVariables>;
export const TxcMemberStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TXCMemberStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberStatistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hashPower"}},{"kind":"Field","name":{"kind":"Name","value":"txcShared"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"percent"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<TxcMemberStatisticsQuery, TxcMemberStatisticsQueryVariables>;
export const MembersByCountryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MembersByCountry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"membersByCountry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"memberCount"}}]}}]}}]} as unknown as DocumentNode<MembersByCountryQuery, MembersByCountryQueryVariables>;
export const CreateAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAdminInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateAdminMutation, CreateAdminMutationVariables>;
export const UpdateAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAdminInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateAdminMutation, UpdateAdminMutationVariables>;
export const FetchUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admins"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admins"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"roleId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"OTPEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"sale"}},{"kind":"Field","name":{"kind":"Name","value":"commission"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FetchUserQuery, FetchUserQueryVariables>;
export const GenerateQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"generateQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generate2FA"}}]}}]} as unknown as DocumentNode<GenerateQueryQuery, GenerateQueryQueryVariables>;
export const Verify2FaAndEnableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Verify2FAAndEnable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Verify2FAInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verify2FAAndEnable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<Verify2FaAndEnableMutation, Verify2FaAndEnableMutationVariables>;
export const Verify2FaTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Verify2FAToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verify2FAToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<Verify2FaTokenMutation, Verify2FaTokenMutationVariables>;
export const Disable2FaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Disable2FA"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"disable2FA"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<Disable2FaMutation, Disable2FaMutationVariables>;
export const FetchUserStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchUserStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"adminFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"apFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inactiveFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"all"},"name":{"kind":"Name","value":"admins"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"admin"},"name":{"kind":"Name","value":"admins"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"adminFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"admins"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"apFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"inactive"},"name":{"kind":"Name","value":"admins"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inactiveFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FetchUserStatsQuery, FetchUserStatsQueryVariables>;
export const FetchUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admins"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admins"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"roleId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"OTPEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"sale"}},{"kind":"Field","name":{"kind":"Name","value":"commission"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FetchUsersQuery, FetchUsersQueryVariables>;
export const RemoveAdminsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveAdmins"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeAdmins"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<RemoveAdminsMutation, RemoveAdminsMutationVariables>;
export const UpdatePasswordAdminByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePasswordAdminById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAdminPasswordByIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePasswordAdminById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"frontActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontActionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"extra"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionCreate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"sponsorCnt"}},{"kind":"Field","name":{"kind":"Name","value":"packageName"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"isWithinSponsorRollDuration"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionUpdate12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageId"}},{"kind":"Field","name":{"kind":"Name","value":"oldPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"newPackageName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontActionRemove12FreeBonusSale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdatePasswordAdminByIdMutation, UpdatePasswordAdminByIdMutationVariables>;
export const HistoryStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HistoryStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalHashPower"}},{"kind":"Field","name":{"kind":"Name","value":"newBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalMembers"}},{"kind":"Field","name":{"kind":"Name","value":"txcShared"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<HistoryStatisticsQuery, HistoryStatisticsQueryVariables>;
export const BlocksDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BlocksData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PeriodStatsArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blocksData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hashRate"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"baseDate"}},{"kind":"Field","name":{"kind":"Name","value":"soldHashPower"}}]}}]}}]} as unknown as DocumentNode<BlocksDataQuery, BlocksDataQueryVariables>;
export const NewMemberCountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NewMemberCounts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PeriodStatsArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newMemberCounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"baseDate"}},{"kind":"Field","name":{"kind":"Name","value":"minerCount"}}]}}]}}]} as unknown as DocumentNode<NewMemberCountsQuery, NewMemberCountsQueryVariables>;
export const AverageMemberRewardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AverageMemberReward"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PeriodStatsArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageMemberReward"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"baseDate"}},{"kind":"Field","name":{"kind":"Name","value":"reward"}}]}}]}}]} as unknown as DocumentNode<AverageMemberRewardQuery, AverageMemberRewardQueryVariables>;
export const CommissionByPeriodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommissionByPeriod"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PeriodStatsArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commissionByPeriod"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"baseDate"}},{"kind":"Field","name":{"kind":"Name","value":"commission"}},{"kind":"Field","name":{"kind":"Name","value":"revenue"}}]}}]}}]} as unknown as DocumentNode<CommissionByPeriodQuery, CommissionByPeriodQueryVariables>;
export const RevenueOverviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RevenueOverview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revenueOverview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revenue"}},{"kind":"Field","name":{"kind":"Name","value":"spent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<RevenueOverviewQuery, RevenueOverviewQueryVariables>;
export const TotalMemberCountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TotalMemberCounts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PeriodStatsArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalMemberCounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"baseDate"}},{"kind":"Field","name":{"kind":"Name","value":"minerCount"}}]}}]}}]} as unknown as DocumentNode<TotalMemberCountsQuery, TotalMemberCountsQueryVariables>;
export const TxcSharesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TxcShares"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PeriodStatsArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"txcShares"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"baseDate"}},{"kind":"Field","name":{"kind":"Name","value":"txc"}}]}}]}}]} as unknown as DocumentNode<TxcSharesQuery, TxcSharesQueryVariables>;
export const LatestStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LatestStatistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latestStatistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"newBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalMembers"}},{"kind":"Field","name":{"kind":"Name","value":"txcShared"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}}]}}]}}]} as unknown as DocumentNode<LatestStatisticsQuery, LatestStatisticsQueryVariables>;
export const TopEarnersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TopEarners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topEarners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"earned"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}}]} as unknown as DocumentNode<TopEarnersQuery, TopEarnersQueryVariables>;
export const TopRecruitersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TopRecruiters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topRecruiters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"totalIntroducers"}}]}}]}}]} as unknown as DocumentNode<TopRecruitersQuery, TopRecruitersQueryVariables>;