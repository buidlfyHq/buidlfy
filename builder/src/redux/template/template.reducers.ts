import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  buyTemplateHash: "",
  buyTemplateLoading: false,
  mintTemplateHash: "",
  mintTemplateLoading: false,
  templateList: [],
  ownedTemplateList: [],
};

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    buyTemplate(state, action: { payload: string }) {
      state.buyTemplateHash = action.payload;
      state.buyTemplateLoading = false;
    },
    allTemplatesFetched(state, action) {
      state.templateList = action.payload;
    },
    ownedTemplatesFetched(state, action) {
      state.ownedTemplateList = action.payload;
    },
    templateMinted(state, action: { payload: string }) {
      state.mintTemplateHash = action.payload;
      state.mintTemplateLoading = false;
    },
  },
});

export const {
  buyTemplate,
  allTemplatesFetched,
  ownedTemplatesFetched,
  templateMinted,
} = templateSlice.actions;
export default templateSlice.reducer;
