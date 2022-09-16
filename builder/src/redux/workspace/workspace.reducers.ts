import { createSlice } from "@reduxjs/toolkit";
import {
  mapElementsToWorkspace,
  mapElementStylesToWorkspace,
  mapElementSubStyleToWorkspace,
} from "./workspace.utils";
import { IAction } from "./workspace.interfaces";
import IWorkspace from "interfaces/workspace";

const initialState: IWorkspace[] = [];

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    // to update an element in workspace
    updateWorkspaceElement(state, action: IAction) {
      if (!action.payload.settingItemId) return;

      const updatedElements = state.map((element: IWorkspace) =>
        mapElementsToWorkspace(element, action.payload)
      );

      return updatedElements;
    },

    // to update the style of an element in workspace
    updateWorkspaceElementStyle(state, action: IAction) {
      if (!action.payload.settingItemId) return;

      const updatedElements = state.map((element: IWorkspace) =>
        mapElementStylesToWorkspace(element, action.payload)
      );
      return updatedElements;
    },

    // to update the sub style of an element in workspace
    updateWorkspaceElementSubStyle(state, action: IAction) {
      if (!action.payload.settingItemId) return;

      const updatedElements = state.map((element: IWorkspace) =>
        mapElementSubStyleToWorkspace(element, action.payload)
      );
      return updatedElements;
    },
    // to update the elements
    updateWorkspaceElementsArray(state, action: { payload: IWorkspace[] }) {
      return action.payload;
    },
  },
});

export const {
  updateWorkspaceElement,
  updateWorkspaceElementStyle,
  updateWorkspaceElementSubStyle,
  updateWorkspaceElementsArray,
} = workspaceSlice.actions;
export default workspaceSlice.reducer;
