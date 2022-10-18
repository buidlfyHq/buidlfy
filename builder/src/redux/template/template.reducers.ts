import { createSlice } from "@reduxjs/toolkit";
import { ISelectedTemplate, ITemplateState } from "./template.interfaces";

const initialState: ITemplateState = {
  buyTemplateReceipt: "",
  buyTemplateLoading: false,
  mintTokenId: 0, // UPDATE: [{id: string, tokenId: number}]
  mintTemplateLoading: false,
  selectedTemplate: null,
  templateList: [],
};

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    buyTemplate(state, action: { payload: string }) {
      state.buyTemplateReceipt = action.payload;
      state.buyTemplateLoading = false;
    },
    templateMinted(state, action: { payload: number }) {
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
    allTemplatesFetched(state, action) {
      state.templateList = action.payload;
    },
  },
});

export const {
  buyTemplate,
  templateMinted,
  startBuyTemplateLoader,
  startMintTemplateLoader,
  setSelectedTemplate,
  allTemplatesFetched,
} = templateSlice.actions;
export default templateSlice.reducer;