import { Signer } from "ethers";

export interface IWeb3State {
  currentAccount: string;
  connectWalletLoading: boolean;
  signer: Signer;
  currentAccountBalance: number;
  walletBalanceLoading: boolean;
  walletBalanceLoaded: boolean;
}

export interface IWalletPayload {
  address: string;
  signer: Signer;
}
