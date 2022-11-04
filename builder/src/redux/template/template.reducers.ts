import { createSlice } from "@reduxjs/toolkit";
import { filterTemplates } from "./template.utils";
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
    setSelectedTemplateAmount(state, action: { payload: string }) {
      state.selectedTemplate.listAmount = action.payload;
    },
    allTemplatesFetched(state, action) {
      state.templateList = action.payload;
    },
    filterAllTemplates(state, action: any) {
      const modifiedTemplateList = state.templateList.map((template) =>
        filterTemplates(template, action.payload)
      );

      const isOwned = modifiedTemplateList.filter(
        (template: ISelectedTemplate) =>
          template.listing_tokenId == state.selectedTemplate?.listing_tokenId
      )[0];

      state.templateList = modifiedTemplateList;
      state.selectedTemplate = isOwned ? isOwned : state.selectedTemplate;
    },
  },
});

export const {
  buyTemplate,
  templateMinted,
  startBuyTemplateLoader,
  startMintTemplateLoader,
  setSelectedTemplate,
  setSelectedTemplateAmount,
  allTemplatesFetched,
  filterAllTemplates,
} = templateSlice.actions;
export default templateSlice.reducer;
