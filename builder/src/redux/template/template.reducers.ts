import { createSlice } from "@reduxjs/toolkit";
import { ISelectedTemplate, ITemplateState } from "./template.interfaces";

const initialState: ITemplateState = {
  buyTemplateHash: "",
  buyTemplateLoading: false,
  mintTemplateHash: "",
  mintTemplateLoading: false,
  templateList: [],
  ownedTemplateList: [],
  selectedTemplate: null,
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
    setSelectedTemplate(state, action: { payload: ISelectedTemplate }) {
      state.selectedTemplate = action.payload;
    },
  },
});

export const {
  buyTemplate,
  fetchAllTemplates,
  fetchOwnedTemplates,
  mintTemplate,
  setSelectedTemplate,
} = templateSlice.actions;
export default templateSlice.reducer;
