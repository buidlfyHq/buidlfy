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
  console.log(payload, 'payload');
  const fetchedPublication = yield call(getPublicationService, publication.name);
  console.log('fetcged', fetchedPublication);
  if (!fetchedPublication.error) {
    try {
      console.log(publication, 'publictionID');
      console.log(fetchedPublication?.publication, 'fetchedPublication');
      const profileId = fetchedPublication?.publication?.profile.id;
      console.log(profileId, 'profileId');
      const ownedBy = fetchedPublication?.publication?.profile.ownedBy;
      console.log(ownedBy, 'ownedBy');
      const profilePicture = fetchedPublication?.publication?.profile.picture?.original?.url;
      console.log(profilePicture, 'profilePicture');
      const coverPicture = fetchedPublication?.publication?.profile.coverPicture?.original?.url;
      console.log(coverPicture, 'coverPicture');
      const handle = fetchedPublication?.publication?.profile.handle;
      console.log(handle, 'handle');

      const profileName = fetchedPublication?.publication?.profile.name;
      console.log(profileName, 'profileName');

      const createdAt = fetchedPublication?.publication.createdAt;
      console.log(createdAt, 'createdAt');

      const postDescription = fetchedPublication?.publication.metadata?.content;
      console.log(postDescription, 'postDescription');

      const postMedia = fetchedPublication?.publication.metadata?.media[0]?.original?.url;
      console.log(postMedia, 'postMedia');

      yield put(updatePublications(publication));
      console.log('here');
      yield put(
        updateProfileId({
          value: profileId,
          publicationId: publication.name,
        }),
      );
      console.log('here1');
      yield put(
        updateOwnedBy({
          value: ownedBy,
          publicationId: publication.name,
        }),
      );
      console.log('here2');
      yield put(
        updateProfilePicture({
          value: profilePicture,
          publicationId: publication.name,
        }),
      );
      console.log('here3');
      yield put(
        updateCoverPicture({
          value: coverPicture,
          publicationId: publication.name,
        }),
      );
      console.log('here4');
      yield put(
        updateHandle({
          value: handle,
          publicationId: publication.name,
        }),
      );
      console.log('here5');
      yield put(
        updateName({
          value: profileName,
          publicationId: publication.name,
        }),
      );
      console.log('here6');
      yield put(
        updateCreatedAt({
          value: createdAt,
          publicationId: publication.name,
        }),
      );
      console.log('here 7');
      yield put(
        updatePostDescription({
          value: postDescription,
          publicationId: publication.name,
        }),
      );
      console.log('here8');
      yield put(
        updatePostMedia({
          value: postMedia,
          publicationId: publication.name,
        }),
      );
      console.log('here9');
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
