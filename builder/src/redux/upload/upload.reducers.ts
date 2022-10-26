import { createSlice } from "@reduxjs/toolkit";
import { IUploadState } from "./upload.interfaces";

const initialState: IUploadState = {
  uploadImage: null 
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    updateUploadImage(state: IUploadState, action: { payload: string }) {
      return {
        ...state,
        uploadImage: action.payload
      }
    },
  }
});

export const {
  updateUploadImage
} = uploadSlice.actions;
export default uploadSlice.reducer;
