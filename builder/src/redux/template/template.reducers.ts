import { createSlice } from '@reduxjs/toolkit';
import { filterTemplates } from './template.utils';
import { ISelectedTemplate, ITemplateState } from './template.interfaces';
import { buySelectedTemplateAsync, fetchListedTemplatesAsync, mintTemplateAsync } from './template.thunk-actions';

const initialState: ITemplateState = {
  buyTemplateReceipt: '',
  buyTemplateLoading: false,
  mintTokenId: 0, // UPDATE: [{id: string, tokenId: number}]
  mintTemplateLoading: false,
  selectedTemplate: null,
  templateList: [],
  fetchTemplateLoading: false,
  filteredTemplateList: [],
};

const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setSelectedTemplate(state, action: { payload: ISelectedTemplate }) {
      state.selectedTemplate = action.payload;
    },
    setSelectedTemplateAmount(state, action: { payload: string }) {
      state.selectedTemplate.listAmount = action.payload;
    },
    setFilteredTemplateList(state, action) {
      state.filteredTemplateList = action.payload;
    },
    filterAllTemplates(state, action: any) {
      const modifiedTemplateList = state.templateList.map(template => filterTemplates(template, action.payload));

      const isOwned = modifiedTemplateList.filter(
        (template: ISelectedTemplate) => template.listing_tokenId === state.selectedTemplate?.listing_tokenId,
      )[0];

      state.templateList = modifiedTemplateList;
      state.filteredTemplateList = modifiedTemplateList;
      state.selectedTemplate = isOwned ? isOwned : state.selectedTemplate;
    },
  },
  extraReducers: builder => {
    builder.addCase(buySelectedTemplateAsync.pending, state => {
      state.buyTemplateLoading = true;
    });
    builder.addCase(buySelectedTemplateAsync.fulfilled, (state, action) => {
      state.buyTemplateReceipt = action.payload;
      state.buyTemplateLoading = false;
    });
    builder.addCase(mintTemplateAsync.pending, state => {
      state.mintTemplateLoading = true;
    });
    builder.addCase(mintTemplateAsync.fulfilled, (state, action) => {
      state.mintTemplateLoading = false;
      state.mintTokenId = action.payload;
    });
    builder.addCase(fetchListedTemplatesAsync.pending, state => {
      state.fetchTemplateLoading = true;
    });
    builder.addCase(fetchListedTemplatesAsync.fulfilled, (state, action) => {
      state.fetchTemplateLoading = false;
      state.templateList = action.payload;
      templateSlice.caseReducers.filterAllTemplates(state, action);
    });
  },
});

export const { setSelectedTemplate, setSelectedTemplateAmount, setFilteredTemplateList, filterAllTemplates } = templateSlice.actions;
export default templateSlice.reducer;
