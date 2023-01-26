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
      state.workspaceElements = updatedElements;
      state.selectedElement = updatedSelectedElement;
    },
    // to update the style of an element in workspace
    updateWorkspaceElementStyle(state, action: IAction) {
      if (!action.payload.settingItemId) return;
      const updatedElements = state.workspaceElements.map((element: IWorkspaceElement) => mapElementStylesToWorkspace(element, action.payload));
      const updatedSelectedElement = fetchSelectedElement(updatedElements, action.payload.settingItemId);
      state.workspaceElements = updatedElements;
      state.selectedElement = updatedSelectedElement;
    },
    // to update the sub style of an element in workspace
    updateWorkspaceElementSubStyle(state, action: IAction) {
      if (!action.payload.settingItemId) return;
      const updatedElements = state.workspaceElements.map((element: IWorkspaceElement) => mapElementSubStyleToWorkspace(element, action.payload));
      const updatedSelectedElement = fetchSelectedElement(updatedElements, action.payload.settingItemId);
      state.workspaceElements = updatedElements;
      state.selectedElement = updatedSelectedElement;
    },
    // to update the style of an image element in workspace
    updateWorkspaceImageElementStyle(state, action: IAction) {
      if (!action.payload.settingItemId) return;
      const updatedElements = state.workspaceElements.map((element: IWorkspaceElement) => mapImageElementStylesToWorkspace(element, action.payload));
      const updatedSelectedElement = fetchSelectedElement(updatedElements, action.payload.settingItemId);
      state.workspaceElements = updatedElements;
      state.selectedElement = updatedSelectedElement;
    },

    // to update the elements
    updateWorkspaceElementsArray(state, action: { payload: IWorkspaceElement[] }) {
      const updatedSelectedElement = fetchSelectedElement(action.payload, state.selectedElement?.i);
      state.workspaceElements = action.payload;
      state.selectedElement = updatedSelectedElement;
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
      state.selectedElement = fetchSelectedElement(state.workspaceElements, action.payload);
    },

    // to save contract config
    saveContractConfig(state: IWorkspaceState, action: { payload }) {
      const currentElements = action.payload.currentElements;
      currentElements.map(currentElement => {
        const updatedContract = updateContractInElement(state.workspaceElements, state.selectedElement, {
          contractElementSelected: action.payload.contractElementSelected,
          currentElement,
        });
        const updatedSelectedElement = fetchSelectedElement(updatedContract, state.selectedElement.i);
        state.workspaceElements = updatedContract;
        state.selectedElement = updatedSelectedElement;
      });
    },

    // to save oracle config
    saveOracleConfig(state: IWorkspaceState, action: { payload: IOracleConfig }) {
      const updatedOracle = updateOracleInElement(state.workspaceElements, state.selectedElement, action.payload);
      const updatedSelectedElement = fetchSelectedElement(updatedOracle, state.selectedElement.i);
      state.workspaceElements = updatedOracle;
      state.selectedElement = updatedSelectedElement;
    },

    updateUploadedImageData(state: IWorkspaceState, action: { payload }) {
      const { settingItemId, uploadedImageData } = action.payload;
      const newUploadedImagesData = fetchUploadedImageData(settingItemId, uploadedImageData, state.uploadedImagesData);
      state.uploadedImagesData = newUploadedImagesData;
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
