import { createSlice } from '@reduxjs/toolkit';
import { IUploadState } from './upload.interfaces';
import { uploadImageAsync } from './upload.thunk-actions';

const initialState: IUploadState = {
  uploadImage: null,
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(uploadImageAsync.fulfilled, (state, action) => {
      state.uploadImage = action.payload;
    });
  },
});

export default uploadSlice.reducer;
