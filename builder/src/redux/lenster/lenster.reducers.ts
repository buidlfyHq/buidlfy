import { createSlice } from '@reduxjs/toolkit';
import { IPublication, ILensterState } from './lenster.interfaces';
import { fetchPublicationAsync } from './lenster.thunk-actions';

const initialState: ILensterState = {
  publications: [],
  inputValue: false,
};

const lensterSlice = createSlice({
  name: 'lenster',
  initialState,
  reducers: {
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
  extraReducers: builder => {
    builder.addCase(fetchPublicationAsync.fulfilled, (state, action) => {
      const newPublications = [...state.publications];
      const { createdAt, id, metadata, profile } = action.payload.fetchedPublication;

      const newPublication: IPublication = {
        i: action.payload.i,
        id: action.payload.id,
        name: id,
        profileId: profile.id,
        ownedBy: profile.ownedBy,
        profilePicture: profile.picture?.original?.url,
        profileName: profile.name,
        coverPicture: profile.coverPicture?.original?.url,
        handle: profile.handle,
        createdAt,
        postDescription: metadata?.content,
        postMedia: metadata?.media[0]?.original?.url,
      };
      state.publications = [...newPublications, newPublication];
    });
  },
});

export const { removePublication, updateInputValue } = lensterSlice.actions;
export default lensterSlice.reducer;
