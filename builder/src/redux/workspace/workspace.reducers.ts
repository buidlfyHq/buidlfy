import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSelectedElement,
  mapElementsToWorkspace,
  mapElementStylesToWorkspace,
  mapElementSubStyleToWorkspace,
  updateContractInElement,
} from "./workspace.utils";
import {
  IAction,
  IWorkspaceElement,
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
        (element: IWorkspaceElement) =>
          mapElementsToWorkspace(element, action.payload)
      );

      return { ...state, workspaceElements: updatedElements };
    },
    // to update the style of an element in workspace
    updateWorkspaceElementStyle(state, action: IAction) {
      if (!action.payload.settingItemId) return;

      const updatedElements = state.workspaceElements.map(
        (element: IWorkspaceElement) =>
          mapElementStylesToWorkspace(element, action.payload)
      );
      return { ...state, workspaceElements: updatedElements };
    },
    // to update the sub style of an element in workspace
    updateWorkspaceElementSubStyle(state, action: IAction) {
      if (!action.payload.settingItemId) return;

      const updatedElements = state.workspaceElements.map(
        (element: IWorkspaceElement) =>
          mapElementSubStyleToWorkspace(element, action.payload)
      );
      return { ...state, workspaceElements: updatedElements };
    },

    // to update the elements
    updateWorkspaceElementsArray(
      state,
      action: { payload: IWorkspaceElement[] }
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

    saveContractConfig(state: IWorkspaceState, action: { payload }) {
      return {
        ...state,
        workspaceElements: updateContractInElement(
          state.workspaceElements,
          state.selectedElement,
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
  saveContractConfig,
} = workspaceSlice.actions;
export default workspaceSlice.reducer;
