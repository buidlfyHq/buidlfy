import { createSlice } from '@reduxjs/toolkit';
import { IPublication, ILensterState } from './lenster.interfaces';

const initialState: ILensterState = {
  publications: [],
  inputValue: false,
};

const lensterSlice = createSlice({
  name: 'lenster',
  initialState,
  reducers: {
    updatePublications(state: ILensterState, action: { payload: { id: string; fetchedPublication: any } }) {
      const fetchedPublication = action.payload.fetchedPublication;
      const id = action.payload.id;
      const publicationId = fetchedPublication.id;
      const newPublications = [...state.publications];
      const profileId = fetchedPublication?.profile.id;
      const ownedBy = fetchedPublication?.profile.ownedBy;
      const profilePicture = fetchedPublication?.profile.picture?.original?.url;
      const coverPicture = fetchedPublication?.profile.coverPicture?.original?.url;
      const handle = fetchedPublication?.profile.handle;
      const profileName = fetchedPublication?.profile.name;
      const createdAt = fetchedPublication?.createdAt;
      const postDescription = fetchedPublication?.metadata?.content;
      const postMedia = fetchedPublication?.metadata?.media[0]?.original?.url;
      const newPublication: IPublication = {
        id,
        name: publicationId,
        profileId,
        ownedBy,
        profilePicture,
        profileName,
        coverPicture,
        handle,
        createdAt,
        postDescription,
        postMedia,
      };
      state.publications = [...newPublications, newPublication];
    },
    removePublication(state: ILensterState, action: { payload: { publicationId: string } }) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(pub => pub.name === publicationId);
      const newPublications = [...state.publications];
      newPublications.splice(publicationIndex, 1);
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

export const { updatePublications, removePublication, updateInputValue } = lensterSlice.actions;
export default lensterSlice.reducer;
