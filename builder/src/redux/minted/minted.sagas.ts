import { ethers } from "ethers";
import { call, all, put, takeLatest, select } from "redux-saga/effects";
import { addNotification } from "redux/notification/notification.reducers";
import { NotificationType } from "redux/notification/notification.interfaces";
import { createListingService } from "./minted.services";
import { listTemplate, startListTemplateLoader } from "./minted.reducers";
import mintedActionTypes from "./minted.types";

function* createListingTemplate() {
  // UPDATE: filter token id of the selectedTemplate
  const tokenId = yield select((state: any) => state.template.mintTokenId);
  yield put(startListTemplateLoader());

  const listingRes = yield call(
    createListingService,
    tokenId,
    ethers.utils.parseEther("5")
  );
  if (!listingRes.error) {
    yield put(listTemplate(listingRes.receipt));
  } else {
    yield put(
      addNotification({
        message: listingRes.errorMessage,
        timestamp: new Date(),
        type: NotificationType.Error,
      })
    );
  }
}

function* listTemplateSaga() {
  yield takeLatest(mintedActionTypes.LIST_TEMPLATE, createListingTemplate);
}

export function* mintedSagas() {
  yield all([call(listTemplateSaga)]);
}
