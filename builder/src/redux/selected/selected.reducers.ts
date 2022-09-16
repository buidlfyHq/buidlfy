import { createSlice } from "@reduxjs/toolkit";
import { IAction, IInitialState } from "./selected.interfaces";

const initialState: IInitialState = {};

const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    createSelectedElement(state, action: IAction) {
      state[action.payload.name] = [action.payload.element];
    },
    addSelectedElement(state, action: IAction) {
      let key = state[action.payload.name];
      state[action.payload.name] = [...key, action.payload.element];
    },
    updateSelectedElement(state, action: IAction) {
      const { name, index, id } = action.payload;
      let key = [...state[name]];
      key[index] = { ...state[name][index], id };
    },
  },
});

export const {
  createSelectedElement,
  addSelectedElement,
  updateSelectedElement,
} = selectedSlice.actions;
export default selectedSlice.reducer;
