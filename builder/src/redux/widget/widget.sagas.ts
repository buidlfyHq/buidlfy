import { call, all, takeLatest, put } from "redux-saga/effects";
import { updateCoverPicture, updateCreatedAt, updateHandle, updateName, updateOwnedBy, updatePostDescription, updatePostMedia, updateProfileId, updateProfilePicture, updatePublicationId } from "./widget.reducers";
import {getPublicationService} from "./widget.services";
import widgetActionTypes from "./widget.types";

function* getPublication({ payload }) {
  const { publicationId } = payload
  console.log(payload,"payload");
  const fetchedPublication = yield call(getPublicationService, publicationId.name);
  if (!fetchedPublication.error) {
    console.log(publicationId,"publictionID");
    
    console.log(fetchedPublication?.publication, "fetchedPublication");
    const profileId = fetchedPublication?.publication.profile.id;
    const ownedBy = fetchedPublication?.publication.profile.ownedBy;
    const profilePicture = fetchedPublication?.publication.profile.picture?.original?.url;
    const coverPicture = fetchedPublication?.publication.profile.coverPicture?.original?.url;
    const handle = fetchedPublication?.publication.profile.handle
    const name = fetchedPublication?.publication.profile.name
    const createdAt = fetchedPublication?.publication.createdAt
    const postDescription = fetchedPublication?.publication.metadata?.content
    const postMedia = fetchedPublication?.publication.metadata?.media[0]?.original?.url
    yield put(updatePublicationId(publicationId));
    yield put(updateProfileId(profileId));
    yield put(updateOwnedBy(ownedBy))
    yield put(updateProfilePicture(profilePicture));
    yield put(updateCoverPicture(coverPicture));
    yield put(updateHandle(handle));
    yield put(updateName(name));
    yield put(updateCreatedAt(createdAt));
    yield put(updatePostDescription(postDescription));
    yield put(updatePostMedia(postMedia));
  } else {
    console.log("error");  
  }
}

function* fetchPublicationSaga() {
  yield takeLatest(widgetActionTypes.FETCH_PUBLICATION, getPublication);
}

export function* widgetSagas() {
  yield all([
    call(fetchPublicationSaga),
  ]);
}
