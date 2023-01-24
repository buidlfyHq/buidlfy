import { all, call } from 'redux-saga/effects';
import { publishSagas } from './publish/publish.sagas';
import { lensterSagas } from './lenster/lenster.sagas';

export default function* rootSaga() {
  yield all([call(publishSagas), call(lensterSagas)]);
}
