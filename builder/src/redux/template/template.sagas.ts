import { call, all, put, takeLatest, select } from "redux-saga/effects";
import { addNotification } from "redux/notification/notification.reducers";
import { toggleModalType } from "redux/modal/modal.reducers";
import {
  buyTemplate,
  templateMinted,
  startMintTemplateLoader,
  startBuyTemplateLoader,
} from "./template.reducers";
import {
  initiateTransactionService,
  mintTemplateService,
} from "./template.services";
import templateActionTypes from "./template.types";
import { NotificationType } from "redux/notification/notification.interfaces";
import { updateWorkspaceElementsArray } from "redux/workspace/workspace.reducers";

function* buySelectedTemplate() {
  const selectedTemplate = yield select(
    (state: any) => state.template.selectedTemplate
  );
  yield put(startBuyTemplateLoader());
  // Check for approval if yes, then don't call approve otherwise call approve
  const transactionRes = yield call(
    initiateTransactionService,
    selectedTemplate.listing_listingId,
    selectedTemplate.listing_buyoutPricePerToken
  );
  if (!transactionRes.error) {
    yield put(buyTemplate(transactionRes.receipt));
    yield put(updateWorkspaceElementsArray(selectedTemplate.value));
    yield put(toggleModalType("final"));
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
