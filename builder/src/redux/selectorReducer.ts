import { createSlice } from "@reduxjs/toolkit";

interface IAction {
  payload: { methodName: string; type: string; name: string; buttonId: string };
}

const selectorSlice = createSlice({
  name: "selector",
  initialState: null,
  reducers: {
    updateSelector(state, action: IAction) {
      return action.payload;
    },
  },
});

export const { updateSelector } = selectorSlice.actions;
export default selectorSlice.reducer;