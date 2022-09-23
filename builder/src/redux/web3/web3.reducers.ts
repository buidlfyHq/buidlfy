import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAccount: "",
  connectWalletLoading: false,
};

const web3Slice = createSlice({
  name: "web3",
  initialState,
  reducers: {
    walletConnected(state, action) {
      state.currentAccount = action.payload;
      state.connectWalletLoading = false;
    },
    toggleConnectWalletLoading(state, action) {
      state.connectWalletLoading = action.payload;
    },
  },
});

export const { walletConnected, toggleConnectWalletLoading } =
  web3Slice.actions;
export default web3Slice.reducer;
