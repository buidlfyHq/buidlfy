import { createSlice } from "@reduxjs/toolkit";
import {
  mapElementsToWorkspace,
  mapElementStylesToWorkspace,
  mapElementSubStyleToWorkspace,
} from "redux/workspace/workspace.utils";
import { IAction } from "redux/workspace/workspace.interfaces";
import IItems from "interfaces/items";

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    // to update an element in workspace
    updateWorkspaceElement(state, action: IAction) {
      if (!action.payload.settingItemId) return;

      const updatedItems = state.map((item) => {
        mapElementsToWorkspace(item, action.payload);
      });
      return updatedItems;
    },

    // to update the style of an element in workspace
    updateWorkspaceElementStyle(state, action) {
      if (!action.payload.settingItemId) return;

      const updatedItems = state.map((item) => {
        mapElementStylesToWorkspace(item, action.payload);
      });
      return updatedItems;
    },

    // to update the sub style of an element in workspace
    updateWorkspaceElementSubStyle(state, action) {
      if (!action.payload.settingItemId) return;

      const updatedItems = state.map((item) => {
        mapElementSubStyleToWorkspace(item, action.payload);
      });
      return updatedItems;
    },

    // to update the elements
    updateItemsArray(state, action: { payload: IItems[] }) {
      return action.payload;
    },
  },
});

export const {
  updateWorkspaceElement,
  updateWorkspaceElementStyle,
  updateWorkspaceElementSubStyle,
} = itemsSlice.actions;
export default itemsSlice.reducer;
