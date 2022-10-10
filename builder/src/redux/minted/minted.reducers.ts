import { createSlice } from "@reduxjs/toolkit";
import { IMintedState } from "./minted.interfaces";

const initialState: IMintedState = {
  listTemplateHash: "",
  listTemplateLoading: false,
  ownedTemplateList: [],
  templateList: [],
  ownedListedTemplateList: [],
};

const mintedSlice = createSlice({
  name: "minted",
  initialState,
  reducers: {
    listTemplate(state, action: { payload: string }) {
      state.listTemplateHash = action.payload;
      state.listTemplateLoading = false;
    },
    startListTemplateLoader(state) {
      state.listTemplateLoading = true;
    },
    fetchOwnedTemplates(state, action) {
      state.ownedTemplateList = action.payload;
    },
    allTemplatesFetched(state, action) {
      state.templateList = action.payload;
    },
    ownedListedTemplatesFetched(state, action) {
      state.ownedListedTemplateList = action.payload;
    },
  },
});

export const {
  listTemplate,
  startListTemplateLoader,
  fetchOwnedTemplates,
  allTemplatesFetched,
  ownedListedTemplatesFetched,
} = mintedSlice.actions;
export default mintedSlice.reducer;
