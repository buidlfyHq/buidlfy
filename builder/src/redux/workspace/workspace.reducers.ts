import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSelectedElement,
  mapElementsToWorkspace,
  mapElementStylesToWorkspace,
  mapElementSubStyleToWorkspace,
} from "./workspace.utils";
import { IAction, IWorkspaceState } from "./workspace.interfaces";
import IWorkspace from "interfaces/workspace";

const initialState: IWorkspaceState = {
  workspaceElements: [],
  selectedElement: null,
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    // to update an element in workspace
    updateWorkspaceElement(state, action: IAction) {
      if (!action.payload.settingItemId) return;

      const updatedElements = state.workspaceElements.map(
        (element: IWorkspace) => mapElementsToWorkspace(element, action.payload)
      );

      return { ...state, workspaceElements: updatedElements };
    },

    // to update the style of an element in workspace
    updateWorkspaceElementStyle(state, action: IAction) {
      if (!action.payload.settingItemId) return;

      const updatedElements = state.workspaceElements.map(
        (element: IWorkspace) =>
          mapElementStylesToWorkspace(element, action.payload)
      );
      return { ...state, workspaceElements: updatedElements };
    },

    // to update the sub style of an element in workspace
    updateWorkspaceElementSubStyle(state, action: IAction) {
      if (!action.payload.settingItemId) return;

      const updatedElements = state.workspaceElements.map(
        (element: IWorkspace) =>
          mapElementSubStyleToWorkspace(element, action.payload)
      );
      return { ...state, workspaceElements: updatedElements };
    },
    // to update the elements
    updateWorkspaceElementsArray(state, action: { payload: IWorkspace[] }) {
      return { ...state, workspaceElements: action.payload };
    },
    // to set current selected element
    setSelectedElementId(state: IWorkspaceState, action: { payload: string }) {
      return {
        ...state,
        selectedElement: fetchSelectedElement(
          state.workspaceElements,
          action.payload
        ),
      };
    },
  },
});

export const {
  updateWorkspaceElement,
  updateWorkspaceElementStyle,
  updateWorkspaceElementSubStyle,
  updateWorkspaceElementsArray,
  setSelectedElementId,
} = workspaceSlice.actions;
export default workspaceSlice.reducer;
