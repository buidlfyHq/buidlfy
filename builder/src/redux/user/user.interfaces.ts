export interface IUserState {
  step: number;
  data: IUserData;
  signinLoading: boolean;
  verificationError: string;
  verifying: boolean;
}

export interface ISession {
  cookie: ICookie;
  data: IUserData;
  nonce: string;
  siwe: ISiwe;
}

export interface ICookie {
  expires: string;
  httpOnly: boolean;
  originalMaxAge: number;
  path: string;
  sameSite: boolean;
  secure: boolean;
}

export interface IUserData {
  address: string;
  walletName: string;
  handle: string;
  verified: boolean;
  whitelisted: boolean;
}

export interface ISiwe {
  address: string;
  chainId: number;
  domain: string;
  issuedAt: string;
  nonce: string;
  statement: string;
  uri: string;
  version: string;
}
