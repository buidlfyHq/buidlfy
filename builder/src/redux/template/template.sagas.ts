import { call, all, put, takeLatest, select } from "redux-saga/effects";
import { addNotification } from "redux/notification/notification.reducers";
import { toggleModalType } from "redux/modal/modal.reducers";
import {
  buyTemplate,
<<<<<<< HEAD
  fetchAllTemplates,
  fetchOwnedTemplates,
  mintTemplate,
  startMintTemplateLoader,
=======
  allTemplatesFetched,
  ownedTemplatesFetched,
  templateMinted,
>>>>>>> feat/modal-template
} from "./template.reducers";
import {
  createListingService,
  getListedTemplatesService,
  getOwnedTemplatesService,
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
    (state: any) => state.web3.currentAccount
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
<<<<<<< HEAD
    yield put(mintTemplate(tokenId));
    yield put(toggleModalType("minted-complete"));
=======
    // TODO: move this to minted reducer
    const listingRes = yield call(
      createListingService,
      tokenId,
      ethers.utils.parseEther("5")
    );
    if (!listingRes.error) {
      yield put(templateMinted(listingRes.receipt));
    } else {
      yield put(
        addNotification({
          message: listingRes.errorMessage,
          timestamp: new Date(),
          type: NotificationType.Error,
        })
      );
    }
>>>>>>> feat/modal-template
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

// function* createListingTemplate({ payload }) {
//   const listingRes = yield call(
//     createListingService,
//     tokenId,
//     ethers.utils.parseEther("5")
//   );
//   if (!listingRes.error) {
//     yield put(mintTemplate(listingRes.receipt));
//   } else {
//     yield put(
//       addNotification({
//         message: listingRes.errorMessage,
//         timestamp: new Date(),
//         type: NotificationType.Error,
//       })
//     );
//   }
// }

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
