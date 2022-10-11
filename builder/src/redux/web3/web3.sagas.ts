import { call, put, all, takeLatest, select } from "redux-saga/effects";
import { addNotification } from "redux/notification/notification.reducers";
import {
  toggleConnectWalletLoading,
  walletBalanceFetched,
  walletConnected,
} from "./web3.reducers";
import { connectWalletService, getTokenBalanceService } from "./web3.services";
import web3ActionTypes from "./web3.types";
import { NotificationType } from "redux/notification/notification.interfaces";

function* connectWalletGen(): any {
  const walletRes = yield call(connectWalletService);
  if (!walletRes.error) {
    yield put(
      walletConnected({ address: walletRes.address, signer: walletRes.signer })
    );
  } else {
    yield put(toggleConnectWalletLoading(false));
    yield put(
      addNotification({
        message: walletRes.errorMessage,
        timestamp: new Date(),
        type: NotificationType.Error,
      })
    );
  }
}

function* fetchWalletBalanceGen(): any {
  const currentAccount = yield select(
    (state: any) => state.web3.currentAccount
  );
  const balanceRes = yield call(getTokenBalanceService, currentAccount);
  if (!balanceRes.error) {
    yield put(walletBalanceFetched(balanceRes.balance));
  } else {
    yield put(
      addNotification({
        message: balanceRes.errorMessage,
        timestamp: new Date(),
        type: NotificationType.Error,
      })
    );
  }
}

function* connectWalletSaga() {
  yield takeLatest(web3ActionTypes.CONNECT_WALLET, connectWalletGen);
}

function* fetchWalletBalanceSaga() {
  yield takeLatest(web3ActionTypes.FETCH_WALLET_BALANCE, fetchWalletBalanceGen);
}

export function* web3Sagas() {
  yield all([call(connectWalletSaga), call(fetchWalletBalanceSaga)]);
}
