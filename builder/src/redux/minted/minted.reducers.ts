import { createSlice } from "@reduxjs/toolkit";
import { IMintedState } from "./minted.interfaces";

const initialState: IMintedState = {
  approveListingLoading: false,
  listTemplateHash: "",
  listTemplateLoading: false,
  ownedTemplateList: [],
  ownedReviewTemplateList: [],
  ownedListedTemplateList: [],
};

const mintedSlice = createSlice({
  name: "minted",
  initialState,
  reducers: {
    listingApproved(state) {
      state.approveListingLoading = false;
    },
    startApproveListingLoader(state) {
      state.approveListingLoading = true;
    },
    templateListed(state, action: { payload: string }) {
      state.listTemplateHash = action.payload;
      state.listTemplateLoading = false;
    },
    startListTemplateLoader(state) {
      state.listTemplateLoading = true;
    },
    ownedTemplatesFetched(state, action) {
      state.ownedTemplateList = action.payload;
    },
    ownedReviewTemplatesFetched(state, action) {
      state.ownedReviewTemplateList = action.payload;
    },
    ownedListedTemplatesFetched(state, action) {
      state.ownedListedTemplateList = action.payload;
    },
  },
});

export const {
  listingApproved,
  startApproveListingLoader,
  templateListed,
  startListTemplateLoader,
  ownedTemplatesFetched,
  ownedReviewTemplatesFetched,
  ownedListedTemplatesFetched,
} = mintedSlice.actions;
export default mintedSlice.reducer;
