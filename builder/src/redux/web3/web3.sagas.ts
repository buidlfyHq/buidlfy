import { call, put, all, takeLatest } from "redux-saga/effects";
import { addNotification } from "redux/notification/notification.reducers";
import { toggleConnectWalletLoading, walletConnected } from "./web3.reducers";
import { connectWalletService } from "./web3.services";
import web3ActionTypes from "./web3.types";

function* connectWalletGen(): any {
  const walletRes = yield call(connectWalletService);
  if (!walletRes.error) {
    yield put(walletConnected(walletRes.account));
  } else {
    yield put(toggleConnectWalletLoading(false));
    yield put(
      addNotification({
        message: walletRes.errorMessage,
        timestamp: new Date(),
        type: 'error',
      })
    );
  }
}

function* connectWalletSaga() {
  yield takeLatest(web3ActionTypes.CONNECT_WALLET, connectWalletGen);
}

export function* web3Sagas() {
  yield all([call(connectWalletSaga)]);
}
