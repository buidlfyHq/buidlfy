import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSelectedElement,
  mapElementsToWorkspace,
  mapElementStylesToWorkspace,
  mapElementSubStyleToWorkspace,
} from "./workspace.utils";
import {
  IAction,
  IWorkspaceElements,
  IWorkspaceState,
} from "./workspace.interfaces";

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
        (element: IWorkspaceElements) =>
          mapElementsToWorkspace(element, action.payload)
      );

      return { ...state, workspaceElements: updatedElements };
    },
    // to update the style of an element in workspace
    updateWorkspaceElementStyle(state, action: IAction) {
      if (!action.payload.settingItemId) return;

      const updatedElements = state.workspaceElements.map(
        (element: IWorkspaceElements) =>
          mapElementStylesToWorkspace(element, action.payload)
      );
      return { ...state, workspaceElements: updatedElements };
    },
    // to update the sub style of an element in workspace
    updateWorkspaceElementSubStyle(state, action: IAction) {
      if (!action.payload.settingItemId) return;

      const updatedElements = state.workspaceElements.map(
        (element: IWorkspaceElements) =>
          mapElementSubStyleToWorkspace(element, action.payload)
      );
      return { ...state, workspaceElements: updatedElements };
    },
    
    // to update the elements
    updateWorkspaceElementsArray(
      state,
      action: { payload: IWorkspaceElements[] }
    ) {
      return { ...state, workspaceElements: action.payload };
    },

    // to set current selected element
    setSelectedElement(state: IWorkspaceState, action: { payload: string }) {
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
  setSelectedElement,
} = workspaceSlice.actions;
export default workspaceSlice.reducer;
