import { call, all, put, takeLatest, select } from "redux-saga/effects";
import { addNotification } from "redux/notification/notification.reducers";
import { toggleModalType } from "redux/modal/modal.reducers";
import {
  buyTemplate,
  templateMinted,
  startMintTemplateLoader,
  startBuyTemplateLoader,
  allTemplatesFetched,
  startFetchTemplateLoader,
} from "./template.reducers";
import {
  initiateTransactionService,
  mintTemplateService,
  getListedTemplatesService,
} from "./template.services";
import templateActionTypes from "./template.types";
import { IRootState } from "redux/root-state.interface";
import { NotificationType } from "redux/notification/notification.interfaces";
import { ISelectedTemplate } from "./template.interfaces";
import { SelectedTemplateDto } from "./template.dto";

function* buySelectedTemplate() {
  const selectedTemplate: ISelectedTemplate = yield select(
    (state: IRootState) => state.template.selectedTemplate
  );
  const selectedTemplateDto = new SelectedTemplateDto(selectedTemplate);
  yield put(startBuyTemplateLoader());

  const transactionRes = yield call(
    initiateTransactionService,
    selectedTemplateDto.listingId,
    selectedTemplateDto.buyoutPricePerToken
  );
  if (!transactionRes.error) {
    yield put(buyTemplate(transactionRes.receipt));
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

function* getListedTemplates(): any {
  yield put(startFetchTemplateLoader());
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

function* buyTemplateSaga() {
  yield takeLatest(templateActionTypes.BUY_TEMPLATE, buySelectedTemplate);
}

function* mintTemplateSaga() {
  yield takeLatest(templateActionTypes.MINT_TEMPLATE, mintSelectedTemplate);
}

function* fetchTemplatesSaga() {
  yield takeLatest(templateActionTypes.FETCH_TEMPLATES, getListedTemplates);
}

export function* templateSagas() {
  yield all([
    call(buyTemplateSaga),
    call(mintTemplateSaga),
    call(fetchTemplatesSaga),
  ]);
}
