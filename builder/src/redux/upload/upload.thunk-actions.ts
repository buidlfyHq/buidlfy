import { createAsyncThunk } from '@reduxjs/toolkit';
import config from 'config';
import { updateUploadedImageData, updateWorkspaceElement } from 'redux/workspace/workspace.reducers';

export const uploadImageAsync = createAsyncThunk('upload/uploadImage', async (payload: { data: string | ArrayBuffer; id?: string }, { dispatch }) => {
  const { data, id } = payload;
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
      data: data,
    });
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const response = await fetch(config.server.SERVER + 'upload', requestOptions);
    const responseText = await response.text();
    const uploadImageLink = JSON.parse(responseText).data;

    if (id) {
      dispatch(
        updateWorkspaceElement({
          settingItemId: id,
          propertyName: 'imgData',
          propertyValue: uploadImageLink,
        }),
      );
      dispatch(
        updateUploadedImageData({
          settingItemId: id,
          uploadedImageData: uploadImageLink,
        }),
      );
    }
    return uploadImageLink;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in uploadImageAsync --> ', error);
    return '';
  }
});
