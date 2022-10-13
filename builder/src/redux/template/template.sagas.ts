import { call, all, put, takeLatest } from "redux-saga/effects";
import { addNotification } from "redux/notification/notification.reducers";
import { toggleModalType } from "redux/modal/modal.reducers";
import {
  buyTemplate,
  templateMinted,
  startMintTemplateLoader,
} from "./template.reducers";
import {
  initiateTransactionService,
  mintTemplateService,
} from "./template.services";
import templateActionTypes from "./template.types";
import { NotificationType } from "redux/notification/notification.interfaces";

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

function* mintSelectedTemplate({ payload }) {
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

function* mintTemplateSaga() {
  yield takeLatest(templateActionTypes.MINT_TEMPLATE, mintSelectedTemplate);
}

export function* templateSagas() {
  yield all([call(buyTemplateSaga), call(mintTemplateSaga)]);
}
