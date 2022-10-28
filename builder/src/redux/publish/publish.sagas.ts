import { call, all, put, takeLatest } from "redux-saga/effects";
import {
  updateCurrentStep,
  updateDeploymentId,
  updateDomainName,
  updateProjectId,
  updateTransactionResponse,
} from "./publish.reducers";
import {
  initiatePublishService,
  getPublishDetailsService,
  verifyPublishService,
  updatePublishService,
} from "./publish.services";
import publishActionTypes from "./publish.types";

function* initiatePublish({ payload }) {
  const { configDetails } = payload;
  const transactionRes = yield call(initiatePublishService, configDetails);
  yield put(updateTransactionResponse(transactionRes.publishId));
  if (!transactionRes.error) {
    const deploymentId = JSON.parse(transactionRes.responseText).data
      .deploymentId;
    yield put(updateDeploymentId(deploymentId));
    yield put(updateCurrentStep(1));
  } else {
    // Log is required
    yield put(console.log("error"));
  }
}

function* getPublishDetails({ payload }) {
  const { deploymentId } = payload;
  const transactionRes = yield call(getPublishDetailsService, deploymentId);
  if (!transactionRes.error) {
    const domainId = JSON.parse(transactionRes.responseText).data.domain._id;
    const projectId = JSON.parse(transactionRes.responseText).data.domain
      .projectId;
    const domainName = JSON.parse(transactionRes.responseText).data.domain.name;
    if (domainId) {
      localStorage.setItem("domain", domainId);
      localStorage.getItem("domain");
    }
    yield put(updateDomainName(domainName));
    yield put(updateProjectId(projectId));
    yield put({
      type: publishActionTypes.VERIFY_PUBLISH,
      payload: { domainId: domainId, projectId: projectId },
    });
    yield put(updateCurrentStep(5));
  } else {
    // Log is required
    yield put(console.log("error"));
  }
}

function* verifyPublish({ payload }) {
  const { domainId, projectId } = payload;

  const transactionRes = yield call(verifyPublishService, domainId, projectId);
  if (!transactionRes.error) {
    yield put(updateCurrentStep(6));
  } else {
    // Log is required
    yield put(console.log("error"));
  }
}

function* updatePublish({ payload }) {
  const { domainId, deploymentId } = payload;
  const transactionRes = yield call(
    updatePublishService,
    domainId,
    deploymentId
  );
  if (!transactionRes.error) {
    // Log is required
    console.log("Update subdomain completed");
  } else {
    // Log is required
    yield put(console.log("error"));
  }
}

function* initiatePublishSaga() {
  yield takeLatest(publishActionTypes.INITIATE_PUBLISH, initiatePublish);
}

function* getPublishDetailsSaga() {
  yield takeLatest(publishActionTypes.PUBLISH_DETAILS, getPublishDetails);
}

function* verifyPublishSaga() {
  yield takeLatest(publishActionTypes.VERIFY_PUBLISH, verifyPublish);
}

function* updatePublishSaga() {
  yield takeLatest(publishActionTypes.UPDATE_PUBLISH, updatePublish);
}

export function* publishSagas() {
  yield all([
    call(initiatePublishSaga),
    call(getPublishDetailsSaga),
    call(verifyPublishSaga),
    call(updatePublishSaga),
  ]);
}
