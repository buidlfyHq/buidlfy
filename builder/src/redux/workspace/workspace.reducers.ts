import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSelectedElement,
  mapElementsToWorkspace,
  mapElementStylesToWorkspace,
  mapElementSubStyleToWorkspace,
  mapImageElementStylesToWorkspace,
  updateContractInElement,
} from "./workspace.utils";
import {
  IAction,
  IWorkspaceElement,
  IWorkspaceElementsArray,
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
    updateWorkspaceElement(state: IWorkspaceState, action: IAction) {
      if (!action.payload.settingItemId) return;

      const updatedElements = state.workspaceElements.map((element) =>
        mapElementsToWorkspace(element, action.payload)
      );

      const updatedSelectedElement = fetchSelectedElement(
        updatedElements,
        action.payload.settingItemId
      );

      return {
        ...state,
        workspaceElements: updatedElements,
        selectedElement: updatedSelectedElement,
      };
    },
    // to update the style of an element in workspace
    updateWorkspaceElementStyle(state, action: IAction) {
      if (!action.payload.settingItemId) return;

      const updatedElements = state.workspaceElements.map(
        (element: IWorkspaceElement) =>
          mapElementStylesToWorkspace(element, action.payload)
      );

      const updatedSelectedElement = fetchSelectedElement(
        updatedElements,
        action.payload.settingItemId
      );

      return {
        ...state,
        workspaceElements: updatedElements,
        selectedElement: updatedSelectedElement,
      };
    },
    // to update the sub style of an element in workspace
    updateWorkspaceElementSubStyle(state, action: IAction) {
      if (!action.payload.settingItemId) return;

      const updatedElements = state.workspaceElements.map(
        (element: IWorkspaceElement) =>
          mapElementSubStyleToWorkspace(element, action.payload)
      );

      const updatedSelectedElement = fetchSelectedElement(
        updatedElements,
        action.payload.settingItemId
      );

      return {
        ...state,
        workspaceElements: updatedElements,
        selectedElement: updatedSelectedElement,
      };
    },
    // to update the style of an image element in workspace
    updateWorkspaceImageElementStyle(state, action: IAction) {
      if (!action.payload.settingItemId) return;

      const updatedElements = state.workspaceElements.map(
        (element: IWorkspaceElement) =>
          mapImageElementStylesToWorkspace(element, action.payload)
      );

      const updatedSelectedElement = fetchSelectedElement(
        updatedElements,
        action.payload.settingItemId
      );

      return {
        ...state,
        workspaceElements: updatedElements,
        selectedElement: updatedSelectedElement,
      };
    },

    // to update the elements
    updateWorkspaceElementsArray(
      state,
      action: { payload: IWorkspaceElementsArray }
    ) {
      const { workspaceElements, settingItemId } = action.payload;

      const updatedSelectedElement = fetchSelectedElement(
        workspaceElements,
        settingItemId
      );

      return {
        ...state,
        workspaceElements: workspaceElements,
        selectedElement: updatedSelectedElement,
      };
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

    // to save contract config
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
  updateWorkspaceImageElementStyle,
  updateWorkspaceElementsArray,
  setSelectedElement,
  saveContractConfig,
} = workspaceSlice.actions;
export default workspaceSlice.reducer;
