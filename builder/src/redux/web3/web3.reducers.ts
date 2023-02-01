import { createSlice } from '@reduxjs/toolkit';
import { connectWalletAsync, fetchTokenBalanceAsync } from './web3.thunk-actions';
import { IWeb3State } from './web3.interfaces';

const initialState: IWeb3State = {
  currentAccount: '',
  connectWalletLoading: false,
  currentAccountBalance: 0,
};

const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(connectWalletAsync.pending, state => {
      state.connectWalletLoading = true;
    });
    builder.addCase(connectWalletAsync.fulfilled, (state, action) => {
      state.connectWalletLoading = false;
      state.currentAccount = action.payload;
    });
    builder.addCase(connectWalletAsync.rejected, state => {
      state.connectWalletLoading = false;
    });
    builder.addCase(fetchTokenBalanceAsync.fulfilled, (state, action) => {
      state.currentAccountBalance = action.payload;
    });
  },
});

export default web3Slice.reducer;
