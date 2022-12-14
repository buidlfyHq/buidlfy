import { createSlice } from '@reduxjs/toolkit';
import { IPublications, ILensterState } from './lenster.interfaces';

const initialState: ILensterState = {
  publications: [],
  inputValue: false,
};

const lensterSlice = createSlice({
  name: 'lenster',
  initialState,
  reducers: {
    updatePublications(state: ILensterState, action: { payload: IPublications }) {
      return {
        ...state,
        publications: [...state.publications, action.payload],
      };
    },
    removePublication(state: ILensterState, action: { payload: { publicationId: string } }) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(pub => pub.name === publicationId);
      const newPublications = [...state.publications];
      newPublications.splice(publicationIndex, 1);
      state.publications = newPublications;
    },
    updateProfileId(state: ILensterState, action: { payload: { value: string; publicationId: string } }) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(pub => pub.name === publicationId);
      const newPublications = [...state.publications];
      const value = action.payload.value;
      newPublications[publicationIndex].profileId = value;
      state.publications = newPublications;
    },
    updateOwnedBy(state: ILensterState, action: { payload: { value: string; publicationId: string } }) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(pub => pub.name === publicationId);
      const newPublications = [...state.publications];
      const value = action.payload.value;
      newPublications[publicationIndex].ownedBy = value;
      state.publications = newPublications;
    },
    updateProfilePicture(state: ILensterState, action: { payload: { value: string; publicationId: string } }) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(pub => pub.name === publicationId);
      const newPublications = [...state.publications];
      const value = action.payload.value;
      newPublications[publicationIndex].profilePicture = value;
      state.publications = newPublications;
    },
    updateCoverPicture(state: ILensterState, action: { payload: { value: string; publicationId: string } }) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(pub => pub.name === publicationId);
      const newPublications = [...state.publications];
      const value = action.payload.value;
      newPublications[publicationIndex].coverPicture = value;
      state.publications = newPublications;
    },
    updateHandle(state: ILensterState, action: { payload: { value: string; publicationId: string } }) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(pub => pub.name === publicationId);
      const newPublications = [...state.publications];
      const value = action.payload.value;
      newPublications[publicationIndex].handle = value;
      state.publications = newPublications;
    },
    updateName(state: ILensterState, action: { payload: { value: string; publicationId: string } }) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(pub => pub.name === publicationId);
      const newPublications = [...state.publications];
      const value = action.payload.value;
      newPublications[publicationIndex].profileName = value;
      state.publications = newPublications;
    },
    updateCreatedAt(state: ILensterState, action: { payload: { value: string; publicationId: string } }) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(pub => pub.name === publicationId);
      const newPublications = [...state.publications];
      const value = action.payload.value;
      newPublications[publicationIndex].createdAt = value;
      state.publications = newPublications;
    },
    updatePostDescription(state: ILensterState, action: { payload: { value: string; publicationId: string } }) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(pub => pub.name === publicationId);
      const newPublications = [...state.publications];
      const value = action.payload.value;
      newPublications[publicationIndex].postDescription = value;
      state.publications = newPublications;
    },
    updatePostMedia(state: ILensterState, action: { payload: { value: string; publicationId: string } }) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(pub => pub.name === publicationId);
      const newPublications = [...state.publications];
      const value = action.payload.value;
      newPublications[publicationIndex].postMedia = value;
      state.publications = newPublications;
    },
    updateInputValue(state: ILensterState, action: { payload: boolean }) {
      return {
        ...state,
        inputValue: action.payload,
      };
    },
  },
});

export const {
  updatePublications,
  removePublication,
  updateProfileId,
  updateOwnedBy,
  updateProfilePicture,
  updateCoverPicture,
  updateHandle,
  updateName,
  updateCreatedAt,
  updatePostDescription,
  updatePostMedia,
  updateInputValue,
} = lensterSlice.actions;
export default lensterSlice.reducer;
