import { createSlice } from "@reduxjs/toolkit";
import { IMintedState } from "./minted.interfaces";

const initialState: IMintedState = {
  listTemplateHash: "",
  listTemplateLoading: false,
  ownedTemplateList: [],
  templateList: [],
  ownedReviewTemplateList: [],
  ownedListedTemplateList: [],
};

const mintedSlice = createSlice({
  name: "minted",
  initialState,
  reducers: {
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
    allTemplatesFetched(state, action) {
      state.templateList = action.payload;
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
  templateListed,
  startListTemplateLoader,
  ownedTemplatesFetched,
  allTemplatesFetched,
  ownedReviewTemplatesFetched,
  ownedListedTemplatesFetched,
} = mintedSlice.actions;
export default mintedSlice.reducer;
