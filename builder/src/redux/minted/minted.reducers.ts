import { createSlice } from "@reduxjs/toolkit";
import { fetchUploadedImageData } from "redux/workspace/workspace.utils";
import { IMintedState } from "./minted.interfaces";

const initialState: IMintedState = {
  approveListingLoading: false,
  listTemplateHash: "",
  listTemplateLoading: false,
  ownedTemplateList: [],
  ownedReviewTemplateList: [],
  ownedListedTemplateList: [],
  mintedImageData: ""
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
    updateMintedImageData(state, action: { payload }) {
      return {
        ...state,
        mintedImageData: action.payload,
      };
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
  updateMintedImageData
} = mintedSlice.actions;
export default mintedSlice.reducer;
