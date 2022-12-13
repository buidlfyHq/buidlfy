import { createSlice } from '@reduxjs/toolkit';
import { IPublications, IWidgetState } from './widget.interfaces';

const initialState: IWidgetState = {
  publications: [],
  inputValue: false,
};

const widgetSlice = createSlice({
  name: 'widget',
  initialState,
  reducers: {
    updatePublications(state: IWidgetState, action: { payload: IPublications }) {
      return {
        ...state,
        publications: [...state.publications, action.payload],
      };
    },
    removePublication(state: IWidgetState, action: { payload: { publicationId: string } }) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(pub => pub.name === publicationId);
      const newPublications = [...state.publications];
      newPublications.splice(publicationIndex, 1);
      state.publications = newPublications;
    },
    updateProfileId(state: IWidgetState, action: { payload: { value: string; publicationId: string } }) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(pub => pub.name === publicationId);
      const newPublications = [...state.publications];
      const value = action.payload.value;
      newPublications[publicationIndex].profileId = value;
      state.publications = newPublications;
    },
    updateOwnedBy(state: IWidgetState, action: { payload: { value: string; publicationId: string } }) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(pub => pub.name === publicationId);
      const newPublications = [...state.publications];
      const value = action.payload.value;
      newPublications[publicationIndex].ownedBy = value;
      state.publications = newPublications;
    },
    updateProfilePicture(state: IWidgetState, action: { payload: { value: string; publicationId: string } }) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(pub => pub.name === publicationId);
      const newPublications = [...state.publications];
      const value = action.payload.value;
      newPublications[publicationIndex].profilePicture = value;
      state.publications = newPublications;
    },
    updateCoverPicture(state: IWidgetState, action: { payload: { value: string; publicationId: string } }) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(pub => pub.name === publicationId);
      const newPublications = [...state.publications];
      const value = action.payload.value;
      newPublications[publicationIndex].coverPicture = value;
      state.publications = newPublications;
    },
    updateHandle(state: IWidgetState, action: { payload: { value: string; publicationId: string } }) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(pub => pub.name === publicationId);
      const newPublications = [...state.publications];
      const value = action.payload.value;
      newPublications[publicationIndex].handle = value;
      state.publications = newPublications;
    },
    updateName(state: IWidgetState, action: { payload: { value: string; publicationId: string } }) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(pub => pub.name === publicationId);
      const newPublications = [...state.publications];
      const value = action.payload.value;
      newPublications[publicationIndex].profileName = value;
      state.publications = newPublications;
    },
    updateCreatedAt(state: IWidgetState, action: { payload: { value: string; publicationId: string } }) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(pub => pub.name === publicationId);
      const newPublications = [...state.publications];
      const value = action.payload.value;
      newPublications[publicationIndex].createdAt = value;
      state.publications = newPublications;
    },
    updatePostDescription(state: IWidgetState, action: { payload: { value: string; publicationId: string } }) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(pub => pub.name === publicationId);
      const newPublications = [...state.publications];
      const value = action.payload.value;
      newPublications[publicationIndex].postDescription = value;
      state.publications = newPublications;
    },
    updatePostMedia(state: IWidgetState, action: { payload: { value: string; publicationId: string } }) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(pub => pub.name === publicationId);
      const newPublications = [...state.publications];
      const value = action.payload.value;
      newPublications[publicationIndex].postMedia = value;
      state.publications = newPublications;
    },
    updateInputValue(state: IWidgetState, action: { payload: boolean }) {
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
} = widgetSlice.actions;
export default widgetSlice.reducer;
