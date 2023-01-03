import { call, all, put, takeEvery } from 'redux-saga/effects';
import { updatePublications } from './lenster.reducers';
import { getPublicationService } from './lenster.services';
import lensterActionTypes from './lenster.types';

function* getPublication({ payload }) {
  const publication = payload;
  const fetchedPublication = yield call(getPublicationService, publication.name);
  if (!fetchedPublication.error) {
    try {
      yield put(updatePublications({ id: publication.id, fetchedPublication: fetchedPublication?.publication, i: publication.i }));
    } catch (error) {
      console.log('error', error);
    }
  } else {
    console.log('error');
  }
}

function* fetchPublicationSaga() {
  yield takeEvery(lensterActionTypes.FETCH_PUBLICATION, getPublication);
}

export function* lensterSagas() {
  yield all([call(fetchPublicationSaga)]);
}
