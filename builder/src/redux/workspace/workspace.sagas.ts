import { call, all, put, takeLatest } from "redux-saga/effects";
import {
    initiatePublishService,getPublishDetailsService,verifyPublishService
} from "./workspace.services";
import publishActionTypes from "./workspace.types";

function* initatePublish({ payload }) {
  const {clientTopic, configDetails} = payload.payload
  const transactionRes = yield call(
      initiatePublishService,
      clientTopic,
      configDetails
  );
  if (!transactionRes.error) {
      console.log("error")
  } else {
    yield put(
      console.log("complete")
    );
  }
}

function* getPublishDetails({ payload }) {
    const {deploymentId, siteName} = payload.payload
    const transactionRes = yield call(
        getPublishDetailsService,
        deploymentId,
        siteName
    );
    if (!transactionRes.error) {
        console.log("error")
    } else {
      yield put(
        console.log("complete")
      );
    }
}

function* verifyPublish({ payload }) {
    const {domainId, projectId} = payload.payload
    const transactionRes = yield call(
        verifyPublishService,
        domainId,
        projectId
    );
    if (!transactionRes.error) {
        console.log("error")
    } else {
      yield put(
        console.log("complete")
      );
    }
}
  
function* initiatePublishSaga() {
  yield takeLatest(publishActionTypes.INITIATE_PUBLISH, initatePublish);
}

function* getPublishDetailsSaga() {
    yield takeLatest(publishActionTypes.PUBLISH_DETAILS, getPublishDetails);
}

function* verifyPublishSaga() {
    yield takeLatest(publishActionTypes.VERIFY_PUBLISH, verifyPublish);
}

export function* workspaceSagas() {
  yield all([
      call(initiatePublishSaga),
      call(getPublishDetailsSaga),
      call(verifyPublishSaga),
  ]);
}
