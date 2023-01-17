import { createSlice } from '@reduxjs/toolkit';
import { signInWithEthereumAsync, verifyTwitterAsync } from './user.thunk-actions';
import { IUserState } from './user.interfaces';

const initialState: IUserState = {
  step: 1,
  data: {
    address: '',
    walletName: '',
    handle: '',
    verified: false,
    whitelisted: false,
  },
  signinLoading: false,
  verificationError: '',
  verifying: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateStep(state, action: { payload: number }) {
      state.step = action.payload;
    },
    updateWhitelist(state, action: { payload: boolean }) {
      state.data.whitelisted = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(signInWithEthereumAsync.pending, state => {
      state.signinLoading = true;
    });
    builder.addCase(signInWithEthereumAsync.fulfilled, (state, action) => {
      state.signinLoading = false;
      state.data = action.payload;
    });
    builder.addCase(signInWithEthereumAsync.rejected, state => {
      state.signinLoading = false;
    });
    builder.addCase(verifyTwitterAsync.pending, state => {
      state.verifying = true;
    });
    builder.addCase(verifyTwitterAsync.fulfilled, (state, action) => {
      state.verifying = false;
      state.data.verified = action.payload;
    });
    builder.addCase(verifyTwitterAsync.rejected, (state, action: { payload }) => {
      state.verifying = false;
      state.verificationError = action.payload;
    });
  },
});

export const { updateStep, updateWhitelist } = userSlice.actions;
export default userSlice.reducer;
