import { createSlice } from "@reduxjs/toolkit";
import { IWeb3State } from "./web3.interfaces";

const initialState: IWeb3State = {
  currentAccount: "",
  connectWalletLoading: false,
};

const web3Slice = createSlice({
  name: "web3",
  initialState,
  reducers: {
    walletConnected(state, action: { payload: string }) {
      state.currentAccount = action.payload;
      state.connectWalletLoading = false;
    },
    toggleConnectWalletLoading(state, action: { payload: boolean }) {
      state.connectWalletLoading = action.payload;
    },
  },
});

export const { walletConnected, toggleConnectWalletLoading } =
  web3Slice.actions;
export default web3Slice.reducer;
