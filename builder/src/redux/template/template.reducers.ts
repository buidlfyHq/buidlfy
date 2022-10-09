import { createSlice } from "@reduxjs/toolkit";
import { ISelectedTemplate, ITemplateState } from "./template.interfaces";

const initialState: ITemplateState = {
  buyTemplateHash: "",
  buyTemplateLoading: false,
  mintTokenId: 0, // UPDATE: [{id: string, tokenId: number}]
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
    mintTemplate(state, action: { payload: number }) {
      state.mintTokenId = action.payload;
      state.mintTemplateLoading = false;
    },
    startBuyTemplateLoader(state) {
      state.buyTemplateLoading = true;
    },
    startMintTemplateLoader(state) {
      state.mintTemplateLoading = true;
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
  startBuyTemplateLoader,
  startMintTemplateLoader,
  setSelectedTemplate,
} = templateSlice.actions;
export default templateSlice.reducer;
