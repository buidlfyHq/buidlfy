import { createSlice } from "@reduxjs/toolkit";
import { IInitialState, IAction } from "./selector.interfaces";

const initialState: IInitialState = null;

const selectorSlice = createSlice({
  name: "selector",
  initialState,
  reducers: {
    updateSelector(state, action: IAction) {
      return action.payload;
    },
    setSelectorToDefault(state) {
      return null;
    },
  },
});

export const { updateSelector, setSelectorToDefault } = selectorSlice.actions;
export default selectorSlice.reducer;
