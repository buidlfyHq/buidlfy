import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSelectedElement,
  mapElementsToWorkspace,
  mapElementStylesToWorkspace,
  mapElementSubStyleToWorkspace,
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
      const {contractElementSelected} = action.payload;
      // filter last selected element
      const filteredObject = contractElementSelected[
        currentElement.name
      ]?.filter(
        (key: { buttonId: string }) => key.buttonId === selectedItem.i
      )[0];

      let updatedContract = {};

      let duplicate = selectedItem.contract.inputs?.find(
        (e: { id: string }) => e.id === filteredObject.id
      );

      if (!duplicate) {
        if (currentElement.type === "input") {
          updatedContract = {
            ...selectedItem.contract,
            inputs: [
              ...selectedItem.contract.inputs,
              { id: filteredObject.id, send: false },
            ],
          };
        } else if (currentElement.type === "send") {
          updatedContract = {
            ...selectedItem.contract,
            inputs: [
              ...selectedItem.contract.inputs,
              { id: filteredObject.id, send: true },
            ],
          };
        } else if (currentElement.type === "output") {
          updatedContract = {
            ...selectedItem.contract,
            outputs: [
              ...selectedItem.contract.outputs,
              { id: filteredObject.id },
            ],
          };
        }
      } else {
        updatedContract = { ...selectedItem.contract };
      }

      let updatedItem = {
        ...selectedItem,
        contract: updatedContract,
      };

      // search id in items
      const elementsIndex = workspaceElements.findIndex(
        (item) => item.i === selectedItem.i
      );

      if (elementsIndex === -1) {
        // search id in children
        const updatedItems = workspaceElements.map((item) => {
          const childIndex = item.children?.findIndex(
            (child: IWorkspaceElement) => child.i === selectedItem.i
          );
          let newArray = [...item?.children];
          newArray[childIndex] = updatedItem;
          return {
            ...item,
            children: newArray,
          };
        });

        dispatch(updateWorkspaceElementsArray(updatedItems));
      } else {
        let newArray = [...workspaceElements];
        newArray[elementsIndex] = updatedItem;
        dispatch(updateWorkspaceElementsArray(newArray));
      }
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
