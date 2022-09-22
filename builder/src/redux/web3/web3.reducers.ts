import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAccount: "",
  selectedNetwork: null,
  selectedToken: null,
  selectedWallet: "",
  selectedTokenBalance: 0,
  selectedTokenAllowance: 0,
  signature: "",
  walletLoading: false,
  tokenBalanceLoading: false,
  tokenBalanceLoaded: false,
  tokenAllowanceLoaded: false,
  tokenAllowanceLoading: false,
  switchNetworkLoading: false,
  approveLoading: false,
  connectWalletLoading: false,
  disconnectWalletLoading: false,
  ensContentHashLoading: false,
  createRegistryLoading: false,
  addDomainRegistryLoading: false,
  addRegistryUpdaterLoading: false,
  removeRegistryUpdaterLoading: false,
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

export const { walletConnected, toggleConnectWalletLoading } = web3Slice.actions;
export default web3Slice.reducer;
