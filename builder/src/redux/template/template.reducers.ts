import { createSlice } from "@reduxjs/toolkit";
import { ISelectedTemplate, ITemplateState } from "./template.interfaces";

const initialState: ITemplateState = {
  buyTemplateHash: "",
  buyTemplateLoading: false,
  mintTokenId: 0,
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
    allTemplatesFetched(state, action) {
      state.templateList = action.payload;
    },
    ownedTemplatesFetched(state, action) {
      state.ownedTemplateList = action.payload;
    },
    templateMinted(state, action: { payload: number }) {
      state.mintTokenId = action.payload;
      state.mintTemplateLoading = false;
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
  allTemplatesFetched,
  ownedTemplatesFetched,
  templateMinted,
  startMintTemplateLoader,
  setSelectedTemplate,
} = templateSlice.actions;
export default templateSlice.reducer;
