export type Sale = {
  username: string;
  productName: string;
  paymentMethod: string;
  amount: number;
  hashPower: number;
};

export type Prepaid = {
  value: string;
  address: string;
  transaction: string;
};
