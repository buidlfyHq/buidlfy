import { call, all, put, takeEvery, select } from 'redux-saga/effects';
import { IRootState } from 'redux/root-state.interface';
import { updateWorkspaceElement } from 'redux/workspace/workspace.reducers';
import { IPublication } from './lenster.interfaces';
import { getPublicationService } from './lenster.services';
import lensterActionTypes from './lenster.types';

function* getPublication({ payload }) {
  const publication = payload;
  const savedPosts = yield select(
    (state: IRootState) => state.workspace.workspaceElements.find(workspaceElement => workspaceElement.i === publication.i)?.posts,
  );
  const fetchedPublication = yield call(getPublicationService, publication.name);
  if (!fetchedPublication.error) {
    try {
      const newPublication: IPublication = {
        i: publication.i,
        id: publication.id,
        name: publication.name,
        profileId: fetchedPublication?.publication?.profile.id,
        ownedBy: fetchedPublication?.publication?.profile.ownedBy,
        profilePicture: fetchedPublication?.publication?.profile?.picture?.original?.url,
        profileName: fetchedPublication?.publication?.profile?.name,
        coverPicture: fetchedPublication?.publication?.profile?.coverPicture?.original?.url,
        handle: fetchedPublication?.publication?.profile.handle,
        createdAt: fetchedPublication?.publication?.createdAt,
        postDescription: fetchedPublication?.publication?.metadata?.content,
        postMedia: fetchedPublication?.publication?.metadata?.media[0]?.original?.url,
      };
      yield put(
        updateWorkspaceElement({
          settingItemId: publication.i,
          propertyName: 'posts',
          propertyValue: [...savedPosts, newPublication],
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
  yield takeEvery(lensterActionTypes.FETCH_PUBLICATION, getPublication);
}

export function* lensterSagas() {
  yield all([call(fetchPublicationSaga)]);
}
