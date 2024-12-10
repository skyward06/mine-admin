// AUTH TOKEN KEY
export const STORAGE_TOKEN_KEY = 'token';

// EXPLORER URL
export const EXPLORER_PATH = 'https://explorer.texitcoin.org/tx/';

export const PLACEMENTTREE_NODE_WIDTH = 200;
export const PLACEMENTTREE_NODE_HEIGHT = 135;
export const PLACEMENTTREE_NODE_X_SPACE = 15;
export const PLACEMENTTREE_NODE_Y_SPACE = 60;

export const COMMISSION_NODE_HEIGHT = 105;

export const SPONSORTREE_NODE_HEIGHT = 95;
export const WEEKLY_PLACEMENT_INITIAL_DEPTH = 3;

export const FREE_SHARE_ID_1 = 'c62357db-0572-4600-98dc-43d92621cfa5';
export const FREE_SHARE_ID_2 = 'aa8604b3-3f2a-4f9c-9ee5-1c9d1d76d726';
export const NO_PRODUCT = '916170a2-6b73-450d-9c2a-6ee9cceab30a';

export const ROOT_ID = 'affe34e8-891b-41c2-8405-d31df4dadb8c';

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
  { label: 'Commission', value: 'Commission' },
];

export const PREPAYMRENT_TYPE = [
  { label: 'BTC', value: 'btc' },
  { label: 'CASH', value: 'cash' },
  { label: 'TEXITCOIN', value: 'texitcoin' },
];

export const PREPAID_TYPE = ['BOGO', 'BTC', 'CASH', 'TEXITCOIN', 'OTHER'];

export const TXC_WALLET = [
  { id: 'b3ed0e78-6cc8-465c-9454-0576534f06f2', method: 'TXC-HOT' },
  { id: '6f7681f0-9ccf-4a79-b1cb-f87e56cf7e8a', method: 'TXC-COLD' },
];

export const OTHER_WALLET = [
  { id: '69f1351c-e7c8-4c98-9030-2f0469f86b76', method: 'ETH' },
  { id: 'fc6302d9-7819-4cd6-a1a4-68b03286c86f', method: 'BTC' },
  { id: 'f8717a04-6203-482a-bed0-58bfb9c6f7e0', method: 'USDT' },
  { id: 'ac26f196-d377-4846-8b86-7a7dda622d01', method: 'OTHER' },
];

export const PROOF_TYPE = {
  ADMINISTRATIONSALARY: 'Administration Salary',
  COMMISSION: 'Commission',
  DEVELOPERSAPPS: 'Developers Apps',
  DEVELOPERSINTEGRATIONS: 'Developers Integrations',
  DEVELOPERSPROTOCOL: 'Developers Protocol',
  DEVELOPERSWEB: 'Developers Web',
  EXCHANGEFEE: 'Exchange Fee',
  INFRASTRUCTURE: 'Infrastructure',
  MARKETINGMINETXCPROMOTION: 'Marketing MineTXC Promotion',
  MARKETINGTXCPROMOTION: 'Marketing TXC Promotion',
  MINEELECTRICITY: 'Mine Electricity',
  MINEFACILITYRENTMORTAGE: 'Mine Facility Rent Mortage',
  MINEMAINTAINANCE: 'Mine maintainance',
  MINENEWEQUIPMENT: 'Mine New Equipment',
  OVERHEAD: 'Overhead',
  PREPAY: 'Prepay',
  PROFIT: 'Profit',
  PROMOTION: 'Promotion',
  SALE: 'Sale',
};

export enum State {
  Approved = 'Approved',
  Draft = 'Draft',
  NeedApproval = 'NeedApproval',
  NeedRevision = 'NeedRevision',
  Printed = 'Printed',
  Voided = 'Voided',
}
