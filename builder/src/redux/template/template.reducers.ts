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
    fetchAllTemplates(state, action) {
      state.templateList = action.payload;
    },
    fetchOwnedTemplates(state, action) {
      state.ownedTemplateList = action.payload;
    },
    mintTemplate(state, action: { payload: string }) {
      state.mintTemplateHash = action.payload;
      state.mintTemplateLoading = false;
    },
  },
});

export const {
  buyTemplate,
  fetchAllTemplates,
  fetchOwnedTemplates,
  mintTemplate,
} = templateSlice.actions;
export default templateSlice.reducer;
