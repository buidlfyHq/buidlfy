import { call, all, put, takeLatest } from "redux-saga/effects";
import { updateDomainName } from "./publish.reducers";
import {
    initiatePublishService,getPublishDetailsService,verifyPublishService
} from "./publish.services";
import publishActionTypes from "./publish.types";

function* initatePublish({ payload }) {

  const { configDetails } = payload
  console.log(configDetails,"configDetails");

  const transactionRes = yield call(
      initiatePublishService,
      configDetails
  );
  console.log(transactionRes,"transactionRes");
  if (!transactionRes.error) {
    const deploymentId = JSON.parse(transactionRes.responseText).data.deploymentId
    yield put({type: publishActionTypes.PUBLISH_DETAILS, payload: deploymentId })  
    console.log("complete")
  } else {
    yield put(
      console.log("error")
    );
  }
}

function* getPublishDetails({ payload }) {
  console.log(payload,"payload-deploymentId");
  
    const transactionRes = yield call(
        getPublishDetailsService,
        payload,
    );
  
  if (!transactionRes.error) {
    const domainId = JSON.parse(transactionRes.responseText).data.domain._id;
    const projectId = JSON.parse(transactionRes.responseText).data.domain.projectId;
    const domainName = JSON.parse(transactionRes.responseText).data.domain.name;
    yield put(updateDomainName(domainName));
    yield put({ type: publishActionTypes.VERIFY_PUBLISH, payload: { domainId: domainId, projectId: projectId } }) 
    
      console.log("complete")
    } else {
      yield put(
        console.log("error")
      );
    }
}

function* verifyPublish({ payload }) {
  const { domainId, projectId } = payload
  
    const transactionRes = yield call(
        verifyPublishService,
        domainId,
        projectId
    );
  if (!transactionRes.error) {
    console.log(transactionRes,"transactionRes-verify");
    console.log("complete")
  } else {
      yield put(
        console.log("error")
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

export function* publishSagas() {
  yield all([
      call(initiatePublishSaga),
      call(getPublishDetailsSaga),
      call(verifyPublishSaga),
  ]);
}
