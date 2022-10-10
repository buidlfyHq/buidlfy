import { ethers } from "ethers";
import { call, all, put, takeLatest, select } from "redux-saga/effects";
import { addNotification } from "redux/notification/notification.reducers";
import { NotificationType } from "redux/notification/notification.interfaces";
import {
  createListingService,
  getOwnedTemplatesService,
} from "./minted.services";
import {
  fetchOwnedTemplates,
  listTemplate,
  startListTemplateLoader,
} from "./minted.reducers";
import mintedActionTypes from "./minted.types";

function* getOwnedTemplates(): any {
  const fetchedTemplates = yield call(getOwnedTemplatesService);
  if (!fetchedTemplates.error) {
    if (fetchedTemplates.templates.length !== 0) {
      yield put(fetchOwnedTemplates(fetchedTemplates.templates));
    }
  } else {
    yield put(
      addNotification({
        message: fetchedTemplates.errorMessage,
        timestamp: new Date(),
        type: NotificationType.Error,
      })
    );
  }
}

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

function* fetchOwnedTemplatesSaga() {
  yield takeLatest(mintedActionTypes.FETCH_OWNED_TEMPLATES, getOwnedTemplates);
}

export function* mintedSagas() {
  yield all([call(listTemplateSaga), call(fetchOwnedTemplatesSaga)]);
}
