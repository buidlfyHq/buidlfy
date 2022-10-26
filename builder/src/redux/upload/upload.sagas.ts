import { call, all, put, takeLatest } from "redux-saga/effects";
import { updateWorkspaceElement } from "redux/workspace/workspace.reducers";
import { updateUploadImage } from "./upload.reducers";
import {
  uploadImageService
} from "./upload.services";
import uploadActionTypes from "./upload.types";

function* uploadImage({ payload }) {
  const { data, id } = payload;
  const transactionRes = yield call(uploadImageService, data);
  if (!transactionRes.error) { 
    const uploadImageLink = JSON.parse(transactionRes.responseText).data;
    yield put(updateUploadImage(uploadImageLink));
    yield put(
      updateWorkspaceElement({
        settingItemId: id,
        propertyName: "imgData",
        propertyValue: uploadImageLink,
      })
    );
  } else {
    yield put(console.log("error"));
  }
}

function* uploadImageSaga() {
  yield takeLatest(uploadActionTypes.UPLOAD_IMAGE, uploadImage);
}


export function* uploadSagas() {
  yield all([
    call(uploadImageSaga),
  ]);
}
