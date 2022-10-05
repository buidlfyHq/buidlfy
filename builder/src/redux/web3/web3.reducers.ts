import { createSlice } from "@reduxjs/toolkit";
import { IWalletPayload, IWeb3State } from "./web3.interfaces";

const initialState: IWeb3State = {
  currentAccount: "",
  connectWalletLoading: false,
  signer: null,
  currentAccountBalance: 0,
  walletBalanceLoading: false,
  walletBalanceLoaded: false,
};

const web3Slice = createSlice({
  name: "web3",
  initialState,
  reducers: {
    walletConnected(state, action: { payload: IWalletPayload }) {
      state.currentAccount = action.payload.address;
      state.signer = action.payload.signer;
      state.connectWalletLoading = false;
    },
    walletBalanceFetched(state, action: { payload: number }) {
      state.currentAccountBalance = action.payload;
      state.walletBalanceLoading = false;
      state.walletBalanceLoaded = true;
    },
    toggleConnectWalletLoading(state, action: { payload: boolean }) {
      state.connectWalletLoading = action.payload;
    },
  },
});

export const {
  walletConnected,
  walletBalanceFetched,
  toggleConnectWalletLoading,
} = web3Slice.actions;
export default web3Slice.reducer;
