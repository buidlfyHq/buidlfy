import { call, all, put, takeLatest, select } from "redux-saga/effects";
import { addNotification } from "redux/notification/notification.reducers";
import { toggleModalType } from "redux/modal/modal.reducers";
import {
  buyTemplate,
  allTemplatesFetched,
  ownedTemplatesFetched,
  templateMinted,
  startMintTemplateLoader,
} from "./template.reducers";
import {
  getListedTemplatesService,
  getOwnedTemplatesService,
  initiateTransactionService,
  mintTemplateService,
} from "./template.services";
import templateActionTypes from "./template.types";
import { NotificationType } from "redux/notification/notification.interfaces";
import { IRootState } from "redux/root-state.interface";

function* buySelectedTemplate({ payload }) {
  const { listingId, buyoutPricePerToken } = payload;
  // ADD: start buy-template loader
  // Check for approval if yes, then don't call approve otherwise call approve
  const transactionRes = yield call(
    initiateTransactionService,
    listingId,
    buyoutPricePerToken
  );
  if (!transactionRes.error) {
    yield put(buyTemplate(transactionRes.receipt));
  } else {
    yield put(
      addNotification({
        message: transactionRes.errorMessage,
        timestamp: new Date(),
        type: NotificationType.Error,
      })
    );
  }
}

function* getListedTemplates(): any {
  const fetchedTemplates = yield call(getListedTemplatesService);
  if (!fetchedTemplates.error) {
    if (fetchedTemplates.listings.length !== 0) {
      yield put(allTemplatesFetched(fetchedTemplates.listings));
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

function* getOwnedTemplates(): any {
  const currentAccount = yield select(
    (state: IRootState) => state.web3.currentAccount
  );
  const fetchedTemplates = yield call(getOwnedTemplatesService, currentAccount);
  if (!fetchedTemplates.error) {
    if (fetchedTemplates.listings.length !== 0) {
      yield put(ownedTemplatesFetched(fetchedTemplates.listings));
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

function* mintSelectedTemplate({ payload }) {
  // ADD: start mint-template loader
  yield put(startMintTemplateLoader());
  const mintRes = yield call(mintTemplateService, payload);
  if (!mintRes.error) {
    const tokenId = parseInt(mintRes.receipt.logs[1].topics[1].toString());
    yield put(templateMinted(tokenId));
    yield put(toggleModalType("minted-complete"));
  } else {
    yield put(
      addNotification({
        message: mintRes.errorMessage,
        timestamp: new Date(),
        type: NotificationType.Error,
      })
    );
  }
}

function* buyTemplateSaga() {
  yield takeLatest(templateActionTypes.BUY_TEMPLATE, buySelectedTemplate);
}

function* fetchTemplatesSaga() {
  yield takeLatest(templateActionTypes.FETCH_TEMPLATES, getListedTemplates);
}

function* fetchOwnedTemplatesSaga() {
  yield takeLatest(
    templateActionTypes.FETCH_OWNED_TEMPLATES,
    getOwnedTemplates
  );
}

function* mintTemplateSaga() {
  yield takeLatest(templateActionTypes.MINT_TEMPLATE, mintSelectedTemplate);
}

export function* templateSagas() {
  yield all([
    call(buyTemplateSaga),
    call(fetchTemplatesSaga),
    call(fetchOwnedTemplatesSaga),
    call(mintTemplateSaga),
  ]);
}
