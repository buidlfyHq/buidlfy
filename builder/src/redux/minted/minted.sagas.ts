import { ethers } from "ethers";
import { call, all, put, takeLatest, select } from "redux-saga/effects";
import { addNotification } from "redux/notification/notification.reducers";
import { NotificationType } from "redux/notification/notification.interfaces";
import {
  createListingService,
  getOwnedListedTemplatesService,
  getOwnedReviewTemplatesService,
  getOwnedTemplatesService,
} from "./minted.services";
import {
  ownedTemplatesFetched,
  templateListed,
  ownedListedTemplatesFetched,
  ownedReviewTemplatesFetched,
  startListTemplateLoader,
} from "./minted.reducers";
import mintedActionTypes from "./minted.types";
import { IRootState } from "redux/root-state.interface";
import { ISelectedTemplate } from "redux/template/template.interfaces";
import { SelectedTemplateDto } from "redux/template/template.dto";

function* createTemplateListing() {
  const selectedTemplate: ISelectedTemplate = yield select(
    (state: IRootState) => state.template.selectedTemplate
  );
  const selectedTemplateDto = new SelectedTemplateDto(selectedTemplate);
  yield put(startListTemplateLoader());

  const listingRes = yield call(
    createListingService,
    selectedTemplateDto.tokenId,
    ethers.utils.parseEther("5")
  );
  if (!listingRes.error) {
    yield put(templateListed(listingRes.receipt));
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

function* getOwnedTemplates(): any {
  const currentAccount: string = yield select(
    (state: IRootState) => state.web3.currentAccount
  );
  const fetchedTemplates = yield call(getOwnedTemplatesService, currentAccount);
  if (!fetchedTemplates.error) {
    if (fetchedTemplates.templates.length !== 0) {
      yield put(ownedTemplatesFetched(fetchedTemplates.templates));
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

function* getOwnedReviewTemplates(): any {
  const currentAccount: string = yield select(
    (state: IRootState) => state.web3.currentAccount
  );
  const fetchedTemplates = yield call(
    getOwnedReviewTemplatesService,
    currentAccount
  );
  if (!fetchedTemplates.error) {
    if (fetchedTemplates.listings.length !== 0) {
      yield put(ownedReviewTemplatesFetched(fetchedTemplates.listings));
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

function* getOwnedListedTemplates(): any {
  const currentAccount: string = yield select(
    (state: IRootState) => state.web3.currentAccount
  );
  const fetchedTemplates = yield call(
    getOwnedListedTemplatesService,
    currentAccount
  );
  if (!fetchedTemplates.error) {
    if (fetchedTemplates.listings.length !== 0) {
      yield put(ownedListedTemplatesFetched(fetchedTemplates.listings));
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

function* listTemplateSaga() {
  yield takeLatest(mintedActionTypes.LIST_TEMPLATE, createTemplateListing);
}

function* fetchOwnedTemplatesSaga() {
  yield takeLatest(mintedActionTypes.FETCH_OWNED_TEMPLATES, getOwnedTemplates);
}

function* fetchOwnedReviewTemplatesSaga() {
  yield takeLatest(
    mintedActionTypes.FETCH_OWNED_REVIEW_TEMPLATES,
    getOwnedReviewTemplates
  );
}

function* fetchOwnedListedTemplatesSaga() {
  yield takeLatest(
    mintedActionTypes.FETCH_OWNED_LISTED_TEMPLATES,
    getOwnedListedTemplates
  );
}

export function* mintedSagas() {
  yield all([
    call(listTemplateSaga),
    call(fetchOwnedTemplatesSaga),
    call(fetchOwnedReviewTemplatesSaga),
    call(fetchOwnedListedTemplatesSaga),
  ]);
}