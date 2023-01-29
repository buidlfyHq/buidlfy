export interface User {
  _id: string;
  address: string;
  walletName: string;
  handle?: string;
  verified?: boolean;
  whitelisted?: boolean;
}
