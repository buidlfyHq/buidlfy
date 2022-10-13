import { all, call } from "redux-saga/effects";
import { web3Sagas } from "redux/web3/web3.sagas";
import { templateSagas } from "redux/template/template.sagas";

export default function* rootSaga() {
  yield all([call(web3Sagas), call(templateSagas)]);
}
