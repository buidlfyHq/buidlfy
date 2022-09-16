import { createSlice } from "@reduxjs/toolkit";
import { IInitialState, IAction } from "./selector.interfaces";

const initialState: IInitialState = null;

const selectorSlice = createSlice({
  name: "selector",
  initialState,
  reducers: {
    updateSelector(state, action: IAction) {
      const { methodName, type, name, buttonId } = action.payload;
      state.methodName = methodName;
      state.type = type;
      state.name = name;
      state.buttonId = buttonId;
    },
    setSelectorToDefault(state) {
      state = null;
    },
  },
});

export const { updateSelector, setSelectorToDefault } = selectorSlice.actions;
export default selectorSlice.reducer;
