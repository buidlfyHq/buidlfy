import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSelectedElement,
  fetchUploadedImageData,
  mapElementsToWorkspace,
  mapElementStylesToWorkspace,
  mapElementSubStyleToWorkspace,
  mapImageElementStylesToWorkspace,
  updateContractInElement,
  updateOracleInElement,
} from './workspace.utils';
import { IAction, IHead, IList, IWorkspaceElement, IWorkspaceState } from './workspace.interfaces';
import { IOracleConfig } from 'redux/oracle/oracle.interfaces';
import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId();

const initialState: IWorkspaceState = {
  workspaceElements: [],
  selectedElement: null,
  uploadedImagesData: [],
  workspaceBackgroundColor: 'rgba(255, 255, 255, 1)',
  head: {
    title: '',
    logo: '',
  },
  listValue: [],
};
const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    // to update an element in workspace
    updateWorkspaceElement(state: IWorkspaceState, action: IAction) {
      if (!action.payload.settingItemId) return;

      const updatedElements = state.workspaceElements.map(element => mapElementsToWorkspace(element, action.payload));

      const updatedSelectedElement = fetchSelectedElement(updatedElements, action.payload.settingItemId);

      return {
        ...state,
        workspaceElements: updatedElements,
        selectedElement: updatedSelectedElement,
      };
    },
    // to update the style of an element in workspace
    updateWorkspaceElementStyle(state, action: IAction) {
      if (!action.payload.settingItemId) return;
      const updatedElements = state.workspaceElements.map((element: IWorkspaceElement) => mapElementStylesToWorkspace(element, action.payload));
      const updatedSelectedElement = fetchSelectedElement(updatedElements, action.payload.settingItemId);
      return {
        ...state,
        workspaceElements: updatedElements,
        selectedElement: updatedSelectedElement,
      };
    },
    // to update the sub style of an element in workspace
    updateWorkspaceElementSubStyle(state, action: IAction) {
      if (!action.payload.settingItemId) return;

      const updatedElements = state.workspaceElements.map((element: IWorkspaceElement) => mapElementSubStyleToWorkspace(element, action.payload));

      const updatedSelectedElement = fetchSelectedElement(updatedElements, action.payload.settingItemId);

      return {
        ...state,
        workspaceElements: updatedElements,
        selectedElement: updatedSelectedElement,
      };
    },
    // to update the style of an image element in workspace
    updateWorkspaceImageElementStyle(state, action: IAction) {
      if (!action.payload.settingItemId) return;

      const updatedElements = state.workspaceElements.map((element: IWorkspaceElement) => mapImageElementStylesToWorkspace(element, action.payload));

      const updatedSelectedElement = fetchSelectedElement(updatedElements, action.payload.settingItemId);

      return {
        ...state,
        workspaceElements: updatedElements,
        selectedElement: updatedSelectedElement,
      };
    },

    // to update the elements
    updateWorkspaceElementsArray(state, action: { payload: IWorkspaceElement[] }) {
      const updatedSelectedElement = fetchSelectedElement(action.payload, state.selectedElement?.i);

      return {
        ...state,
        workspaceElements: action.payload,
        selectedElement: updatedSelectedElement,
      };
    },

    // to update workspace background color
    updateWorkspaceBackgroundColor(state: IWorkspaceState, action: { payload: string }) {
      state.workspaceBackgroundColor = action.payload ? action.payload : 'rgba(255, 255, 255, 1)';
    },

    setSiteHead(state: IWorkspaceState, action: { payload: IHead }) {
      state.head.title = action.payload?.title;
      state.head.logo = action.payload?.logo;
    },

    // to set current selected element
    setSelectedElement(state: IWorkspaceState, action: { payload: string }) {
      return {
        ...state,
        selectedElement: fetchSelectedElement(state.workspaceElements, action.payload),
      };
    },

    // to save contract config
    saveContractConfig(state: IWorkspaceState, action: { payload }) {
      const updatedContract = updateContractInElement(state.workspaceElements, state.selectedElement, action.payload);
      const updatedSelectedElement = fetchSelectedElement(updatedContract, state.selectedElement.i);

      return {
        ...state,
        workspaceElements: updatedContract,
        selectedElement: updatedSelectedElement,
      };
    },

    // to save oracle config
    saveOracleConfig(state: IWorkspaceState, action: { payload: IOracleConfig }) {
      const updatedOracle = updateOracleInElement(state.workspaceElements, state.selectedElement, action.payload);

      const updatedSelectedElement = fetchSelectedElement(updatedOracle, state.selectedElement.i);

      return {
        ...state,
        workspaceElements: updatedOracle,
        selectedElement: updatedSelectedElement,
      };
    },

    updateUploadedImageData(state: IWorkspaceState, action: { payload }) {
      const { settingItemId, uploadedImageData } = action.payload;
      const newUploadedImagesData = fetchUploadedImageData(settingItemId, uploadedImageData, state.uploadedImagesData);
      return {
        ...state,
        uploadedImagesData: newUploadedImagesData,
      };
    },

    updateListValue(state: IWorkspaceState, action: { payload: IList[] }) {
      return {
        ...state,
        listValue: action.payload,
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
  updateWorkspaceBackgroundColor,
  setSiteHead,
  setSelectedElement,
  saveContractConfig,
  saveOracleConfig,
  updateUploadedImageData,
  updateListValue,
} = workspaceSlice.actions;
export default workspaceSlice.reducer;
