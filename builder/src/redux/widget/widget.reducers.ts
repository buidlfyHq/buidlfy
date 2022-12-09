import { createSlice } from "@reduxjs/toolkit";
import { IPublications, IWidgetState } from "./widget.interfaces";

const initialState: IWidgetState = {
  publications: [],
  inputValue: false,
};

const widgetSlice = createSlice({
  name: "widget",
  initialState,
  reducers: {
    updatePublications(
      state: IWidgetState,
      action: { payload: IPublications }
    ) {
      console.log(action, "action");
      console.log("state", state);
      console.log("state.publications", state.publications);
      return {
        ...state,
        publications: [...state.publications, action.payload],
      };
    },
    updateProfileId(
      state: IWidgetState,
      action: { payload: { value: string; publicationId: string } }
    ) {
      const publicationId = action.payload.publicationId;
      console.log("publicationIdddd", publicationId);

      const publicationIndex = state.publications.findIndex(
        (pub) => pub.name === publicationId
      );
      console.log("publicationIndex", publicationIndex);
      const newPublications = [...state.publications];
      console.log("newPublications", newPublications);
      const value = action.payload.value;
      console.log("value", value);
      newPublications[publicationIndex].profileId = value;
      console.log("newPublications-profileId", JSON.stringify(newPublications));
      state.publications = newPublications;
    },
    updateOwnedBy(
      state: IWidgetState,
      action: { payload: { value: string; publicationId: string } }
    ) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(
        (pub) => pub.name === publicationId
      );
      const newPublications = [...state.publications];
      const value = action.payload.value;
      console.log(value, "value-owned");

      newPublications[publicationIndex].ownedBy = value;
      console.log("newPublications-ownedBy", JSON.stringify(newPublications));
      state.publications = newPublications;
    },
    updateProfilePicture(
      state: IWidgetState,
      action: { payload: { value: string; publicationId: string } }
    ) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(
        (pub) => pub.name === publicationId
      );
      const newPublications = [...state.publications];
      const value = action.payload.value;
      newPublications[publicationIndex].profilePicture = value;
      console.log(
        "newPublications-profilePicture",
        JSON.stringify(newPublications)
      );
      state.publications = newPublications;
    },
    updateCoverPicture(
      state: IWidgetState,
      action: { payload: { value: string; publicationId: string } }
    ) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(
        (pub) => pub.name === publicationId
      );
      const newPublications = [...state.publications];
      const value = action.payload.value;
      newPublications[publicationIndex].coverPicture = value;
      console.log(
        "newPublications-coverPicture",
        JSON.stringify(newPublications)
      );
      state.publications = newPublications;
    },
    updateHandle(
      state: IWidgetState,
      action: { payload: { value: string; publicationId: string } }
    ) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(
        (pub) => pub.name === publicationId
      );
      const newPublications = [...state.publications];
      const value = action.payload.value;
      newPublications[publicationIndex].handle = value;
      console.log("newPublications-handle", JSON.stringify(newPublications));
      state.publications = newPublications;
    },
    updateName(
      state: IWidgetState,
      action: { payload: { value: string; publicationId: string } }
    ) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(
        (pub) => pub.name === publicationId
      );
      const newPublications = [...state.publications];
      const value = action.payload.value;
      newPublications[publicationIndex].profileName = value;
      console.log(
        "newPublications-profilename",
        JSON.stringify(newPublications)
      );
      state.publications = newPublications;
    },
    updateCreatedAt(
      state: IWidgetState,
      action: { payload: { value: string; publicationId: string } }
    ) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(
        (pub) => pub.name === publicationId
      );
      const newPublications = [...state.publications];
      const value = action.payload.value;
      newPublications[publicationIndex].createdAt = value;
      console.log("newPublications-createdat", JSON.stringify(newPublications));
      state.publications = newPublications;
    },
    updatePostDescription(
      state: IWidgetState,
      action: { payload: { value: string; publicationId: string } }
    ) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(
        (pub) => pub.name === publicationId
      );
      const newPublications = [...state.publications];
      const value = action.payload.value;
      newPublications[publicationIndex].postDescription = value;
      console.log(
        "newPublications-postDescription",
        JSON.stringify(newPublications)
      );
      state.publications = newPublications;
    },
    updatePostMedia(
      state: IWidgetState,
      action: { payload: { value: string; publicationId: string } }
    ) {
      const publicationId = action.payload.publicationId;
      const publicationIndex = state.publications.findIndex(
        (pub) => pub.name === publicationId
      );
      const newPublications = [...state.publications];
      const value = action.payload.value;
      newPublications[publicationIndex].postMedia = value;
      console.log("newPublications-postMedia", JSON.stringify(newPublications));
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
