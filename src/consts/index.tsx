export * from './resource';

// AUTH TOKEN KEY
export const STORAGE_TOKEN_KEY = 'token';

// EXPLORER URL
export const EXPLORER_PATH = 'https://explorer.texitcoin.org/tx/';

// ASSET INFO URL
export const ASSET_INFO_PATH = 'https://api.blockchainmint.com/api/v2/asset-info?public_key=';

export const PLACEMENTTREE_NODE_WIDTH = 200;
export const PLACEMENTTREE_NODE_HEIGHT = 135;
export const PLACEMENTTREE_NODE_X_SPACE = 15;
export const PLACEMENTTREE_NODE_Y_SPACE = 60;

export const COMMISSION_NODE_HEIGHT = 105;

export const SPONSORTREE_NODE_HEIGHT = 98;
export const WEEKLY_PLACEMENT_INITIAL_DEPTH = 3;

export const FREE_SHARE_ID_1 = '1176da92-477a-46c3-8a63-e8e22042197f';
export const FREE_SHARE_ID_2 = 'aa8604b3-3f2a-4f9c-9ee5-1c9d1d76d726';
export const NO_PRODUCT = '916170a2-6b73-450d-9c2a-6ee9cceab30a';

export const ROOT_ID = 'affe34e8-891b-41c2-8405-d31df4dadb8c';

export const LAUNCH_GROUP = 'c3bca349-972c-485b-bbd6-4241c58b815c';

export const PEER = 'Peer';

export const COMMISSION_TYPE = {
  PREVIEW: { label: 'PREVIEW', value: 'Preview' },
  PENDING: { label: 'PENDING', value: 'Pending' },
  APPROVED: { label: 'APPROVED', value: 'Approved' },
  PAID: { label: 'PAID', value: 'Paid' },
  DECLINED: { label: 'DECLINED', value: 'Declined' },
  NONE: { label: 'NONE', value: 'None' },
};

export const CONTACT = [
  { label: 'INSTAGRAM', value: 'Instagram' },
  { label: 'FACEBOOK', value: 'Facebook' },
  { label: 'SNAPCHAT', value: 'Snapchat' },
  { label: 'TELEGRAM', value: 'Telegram' },
  { label: 'SMSTEXT', value: 'SMS Text' },
  { label: 'EMAIL', value: 'Email' },
  { label: 'TIKTOK', value: 'Tiktok' },
  { label: 'WHATSAPP', value: 'WhatsApp' },
  { label: 'OTHER', value: 'Other' },
];

export const PAYMENT_TYPE = [
  { label: 'CREDIT_CARD', value: 'Credit Card' },
  { label: 'ZELLE', value: 'Zelle' },
  { label: 'CASH_APP', value: 'CsahApp' },
  { label: 'VENMO', value: 'Venmo' },
  { label: 'PAPER_CHECK', value: 'Paper Check' },
  { label: 'CASH', value: 'Cash' },
  { label: 'KILO_OF_SILVER', value: 'Kilo of Silver' },
  { label: 'CRYPTO', value: 'Crypto' },
  { label: 'COMMISSION', value: 'Commission' },
];

export const PREPAYMRENT_TYPE = [
  { label: 'BTC', value: 'btc' },
  { label: 'CASH', value: 'cash' },
  { label: 'TEXITCOIN', value: 'texitcoin' },
];

export const PREPAID_TYPE = ['Hash', 'CASH', 'TXC', 'BTC', 'ETH', 'TRN', 'OTHER'];

export const TXC_WALLET = [
  { id: 'b3ed0e78-6cc8-465c-9454-0576534f06f2', method: 'TXC-HOT' },
  { id: '6f7681f0-9ccf-4a79-b1cb-f87e56cf7e8a', method: 'TXC-COLD' },
];

export const OTHER_WALLET = [
  { id: '69f1351c-e7c8-4c98-9030-2f0469f86b76', method: 'ETH' },
  { id: 'fc6302d9-7819-4cd6-a1a4-68b03286c86f', method: 'BTC' },
  { id: 'f8717a04-6203-482a-bed0-58bfb9c6f7e0', method: 'USDT' },
  { id: '770344a4-dd50-4d03-baab-825648962a37', method: 'USDC' },
  { id: 'ac26f196-d377-4846-8b86-7a7dda622d01', method: 'OTHER' },
];

export const PROOF_TYPE = {
  SALE: 'Sale',
  PREPAY: 'Prepay',
  PROFIT: 'Profit',
  INVOICE: 'Invoice',
  OVERHEAD: 'Overhead',
  PROMOTION: 'Promotion',
  LIQUIDITY: 'Liquidity',
  COMMISSION: 'Commission',
  EXCHANGEFEE: 'Exchange Fee',
  DEVELOPERSWEB: 'Developers Web',
  INFRASTRUCTURE: 'Infrastructure',
  DEVELOPERSAPPS: 'Developers Apps',
  MINEELECTRICITY: 'Mine Electricity',
  MINEMAINTAINANCE: 'Mine maintainance',
  MINENEWEQUIPMENT: 'Mine New Equipment',
  DEVELOPERSPROTOCOL: 'Developers Protocol',
  ADMINISTRATIONSALARY: 'Administration Salary',
  TRANSACTIONPROCESSING: 'Transaction Processing',
  MARKETINGTXCPROMOTION: 'Marketing TXC Promotion',
  DEVELOPERSINTEGRATIONS: 'Developers Integrations',
  MINEFACILITYRENTMORTAGE: 'Mine Facility Rent Mortage',
  MARKETINGMINETXCPROMOTION: 'Marketing MineTXC Promotion',
};

export const CAMPAIGN_LIST_TYPE = {
  ALL: 'All',
  GROUP: 'Group',
  CUSTOM: 'Custom',
  WEEKLY_SPONSOR: 'Weekly Sponsor',
  PENDING_MANUAL_COMMISSION: 'Pending Manual Commission',
};

export const INVOICE_TYPE = {
  PAID: 'Paid',
  PENDING: 'Pending',
};

export const TARGET = [
  { label: '100, 000', value: 100000 },
  { label: '250, 000', value: 250000 },
  { label: '500, 000', value: 500000 },
  { label: '1, 000, 000', value: 1000000 },
  { label: '5, 000, 000', value: 5000000 },
];

export const NOTIFICATION_LEVEL = {
  ALL: 'All',
  ADMIN: 'Admin',
  INDIVIDUAL: 'Individual',
  TEAMLEADER: 'Team Leader',
};

export const COMMISSION_WAY = [
  { label: 'BOGO', value: 'Bogo' },
  { label: 'CASH', value: 'Cash' },
];

export const BALANCE_TYPE = ['Payment', 'Commission'];

export enum State {
  Approved = 'Approved',
  Draft = 'Draft',
  NeedApproval = 'NeedApproval',
  NeedRevision = 'NeedRevision',
  Printed = 'Printed',
  Voided = 'Voided',
}

export const ROLE_TYPE = [
  { name: 'role', label: 'Role' },
  { name: 'sale', label: 'Sale' },
  { name: 'commission', label: 'Commission' },
  // { name: 'proof', label: 'Proof' },
  // { name: 'member', label: 'Member' },
  // { name: 'balance', label: 'Balance' },
  // { name: 'additions', label: 'Additions' },
];

export const PERMISSIONS = {
  NONE_PERMISSION: { label: 'None', value: 0, hex: 0x0 },
  EDITOR_PERMISSION: { label: 'Editor', value: 3, hex: 0x2 },
  VIEWER_PERMISSION: { label: 'View Only', value: 1, hex: 0x1 },
  PAST_EDIT_PERMISSION: { label: 'Past Editor', value: 5, hex: 0x4 },
  COMMISSOIN_CALCULATION_PERMISSION: {
    label: 'Commission Calculation',
    value: 4,
    hex: 0x4,
  },
  ASSIGN_ROLE_PERMISSION: { label: 'Assign Role', value: 4, hex: 0x4 },
};

export const VIEW_ROLE_ID = '82bf6179-48e3-4b5b-847d-a9f8741934aa';

export const SAMPLE_VARS = {
  FNAME: 'fName',
  LNAME: 'lName',
  FULLNAME: 'toMember.fullName',
  USERNAME: 'toMember.username',
};

export const CASH_POTENTIAL_URL = 'https://help.minetxc.com/understanding-cash-potential/';
