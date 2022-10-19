import { createSlice } from "@reduxjs/toolkit";
import { IPublishState } from "./publish.interfaces";

const initialState: IPublishState = {
  publishConfig: null,
  domainName: null
};

const publishSlice = createSlice({
  name: "publish",
  initialState,
  reducers: {

    updatePublishConfig(state: IPublishState, action: { payload: string }) {
      return {
        ...state,
        publishConfig: action.payload
      }
    },
    updateDomainName(state: IPublishState, action: { payload: string }) {
      return {
        ...state,
        domainName: action.payload
      }
    },
  },
 
});

export const {
  updatePublishConfig,
  updateDomainName
} = publishSlice.actions;
export default publishSlice.reducer;
