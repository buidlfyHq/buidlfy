import { createSlice } from "@reduxjs/toolkit";
import { IPublicationId, IWidgetState } from "./widget.interfaces";

const initialState: IWidgetState = {
  publicationId: {id: 0, name: ""},
  profileId: "",
  ownedBy: "",
  profilePicture: "",
  coverPicture: "",
  handle: "",
  name: "",
  createdAt: "",
  postDescription: "",
  postMedia: "",
  inputValue: false,
};

const widgetSlice = createSlice({
  name: "widget",
  initialState,
  reducers: {
    updatePublicationId(state: IWidgetState, action: { payload: IPublicationId }) {
      console.log(action,"action");
      
      return {
        ...state,
        publicationId: action.payload,
      };
    },
    updateProfileId(state: IWidgetState, action: { payload: string }) {
      return {
        ...state,
       profileId: action.payload,
      };
    },
    updateOwnedBy(state: IWidgetState, action: { payload: string }) {
      return {
        ...state,
       ownedBy: action.payload,
      };
    },
    updateProfilePicture(state: IWidgetState, action: { payload: string }) {
      return {
        ...state,
       profilePicture: action.payload,
      };
    },
    updateCoverPicture(state: IWidgetState, action: { payload: string }) {
      return {
        ...state,
       coverPicture: action.payload,
      };
    },
    updateHandle(state: IWidgetState, action: { payload: string }) {
      return {
        ...state,
       handle: action.payload,
      };
    },
    updateName(state: IWidgetState, action: { payload: string }) {
      return {
        ...state,
       name: action.payload,
      };
    },
    updateCreatedAt(state: IWidgetState, action: { payload: string }) {
      return {
        ...state,
       createdAt: action.payload,
      };
    },
    updatePostDescription(state: IWidgetState, action: { payload: string }) {
      return {
        ...state,
       postDescription: action.payload,
      };
    },
    updatePostMedia(state: IWidgetState, action: { payload: string }) {
      return {
        ...state,
       postMedia: action.payload,
      };
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
  updatePublicationId,
  updateProfileId,
  updateOwnedBy,
  updateProfilePicture,
  updateCoverPicture,
  updateHandle,
  updateName,
  updateCreatedAt,
  updatePostDescription,
  updatePostMedia,
  updateInputValue
} = widgetSlice.actions;
export default widgetSlice.reducer;
