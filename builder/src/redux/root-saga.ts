import { all, call } from 'redux-saga/effects';
import { web3Sagas } from 'redux/web3/web3.sagas';
import { templateSagas } from 'redux/template/template.sagas';
import { mintedSagas } from 'redux/minted/minted.sagas';
import { publishSagas } from './publish/publish.sagas';
import { uploadSagas } from './upload/upload.sagas';
import { lensterSagas } from './lenster/lenster.sagas';

export default function* rootSaga() {
  yield all([call(web3Sagas), call(templateSagas), call(mintedSagas), call(publishSagas), call(uploadSagas), call(lensterSagas)]);
}
