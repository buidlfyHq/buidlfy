import { createSlice } from '@reduxjs/toolkit';
import {
  approveListingAsync,
  createListingAsync,
  fetchOwnedListedTemplatesAsync,
  fetchOwnedReviewTemplatesAsync,
  fetchOwnedTemplatesAsync,
} from './minted.thunk-actions';
import { IMintedState } from './minted.interfaces';

const initialState: IMintedState = {
  approveListingLoading: false,
  listTemplateHash: '',
  listTemplateLoading: false,
  ownedTemplateList: [],
  ownedReviewTemplateList: [],
  ownedListedTemplateList: [],
  mintedImageData: '',
};

const mintedSlice = createSlice({
  name: 'minted',
  initialState,
  reducers: {
    updateMintedImageData(state, action: { payload }) {
      state.mintedImageData = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(approveListingAsync.pending, state => {
      state.approveListingLoading = true;
    });
    builder.addCase(approveListingAsync.fulfilled, state => {
      state.approveListingLoading = false;
    });
    builder.addCase(createListingAsync.pending, state => {
      state.listTemplateLoading = true;
    });
    builder.addCase(createListingAsync.fulfilled, (state, action) => {
      state.listTemplateLoading = false;
      state.listTemplateHash = action.payload;
    });
    builder.addCase(fetchOwnedTemplatesAsync.fulfilled, (state, action) => {
      state.ownedTemplateList = action.payload;
    });
    builder.addCase(fetchOwnedReviewTemplatesAsync.fulfilled, (state, action) => {
      state.ownedReviewTemplateList = action.payload;
    });
    builder.addCase(fetchOwnedListedTemplatesAsync.fulfilled, (state, action) => {
      state.ownedListedTemplateList = action.payload;
    });
  },
});

export const { updateMintedImageData } = mintedSlice.actions;
export default mintedSlice.reducer;
