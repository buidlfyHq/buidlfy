import { createSlice } from "@reduxjs/toolkit";
import { IMintedState } from "./minted.interfaces";

const initialState: IMintedState = {
  listTemplateHash: "",
  listTemplateLoading: false,
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
  },
});

export const { listTemplate, startListTemplateLoader } = mintedSlice.actions;
export default mintedSlice.reducer;
