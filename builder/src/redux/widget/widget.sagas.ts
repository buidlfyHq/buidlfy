import { call, all, takeLatest, put, takeEvery } from 'redux-saga/effects';
import {
  updateCoverPicture,
  updateCreatedAt,
  updateHandle,
  updateName,
  updateOwnedBy,
  updatePostDescription,
  updatePostMedia,
  updateProfileId,
  updateProfilePicture,
  updatePublications,
} from './widget.reducers';
import { getPublicationService } from './widget.services';
import widgetActionTypes from './widget.types';

function* getPublication({ payload }) {
  const publication = payload;
  const fetchedPublication = yield call(getPublicationService, publication.name);
  if (!fetchedPublication.error) {
    try {
      const profileId = fetchedPublication?.publication?.profile.id;
      const ownedBy = fetchedPublication?.publication?.profile.ownedBy;
      const profilePicture = fetchedPublication?.publication?.profile.picture?.original?.url;
      const coverPicture = fetchedPublication?.publication?.profile.coverPicture?.original?.url;
      const handle = fetchedPublication?.publication?.profile.handle;
      const profileName = fetchedPublication?.publication?.profile.name;
      const createdAt = fetchedPublication?.publication.createdAt;
      const postDescription = fetchedPublication?.publication.metadata?.content;
      const postMedia = fetchedPublication?.publication.metadata?.media[0]?.original?.url;
      yield put(updatePublications(publication));
      yield put(
        updateProfileId({
          value: profileId,
          publicationId: publication.name,
        }),
      );
      yield put(
        updateOwnedBy({
          value: ownedBy,
          publicationId: publication.name,
        }),
      );
      yield put(
        updateProfilePicture({
          value: profilePicture,
          publicationId: publication.name,
        }),
      );
      yield put(
        updateCoverPicture({
          value: coverPicture,
          publicationId: publication.name,
        }),
      );
      yield put(
        updateHandle({
          value: handle,
          publicationId: publication.name,
        }),
      );
      yield put(
        updateName({
          value: profileName,
          publicationId: publication.name,
        }),
      );
      yield put(
        updateCreatedAt({
          value: createdAt,
          publicationId: publication.name,
        }),
      );
      yield put(
        updatePostDescription({
          value: postDescription,
          publicationId: publication.name,
        }),
      );
      yield put(
        updatePostMedia({
          value: postMedia,
          publicationId: publication.name,
        }),
      );
    } catch (error) {
      console.log('error', error);
    }
  } else {
    console.log('error');
  }
}

function* fetchPublicationSaga() {
  yield takeEvery(widgetActionTypes.FETCH_PUBLICATION, getPublication);
}

export function* widgetSagas() {
  yield all([call(fetchPublicationSaga)]);
}
