import { createSlice } from "@reduxjs/toolkit";
import { setNewArray } from "./notification.utils";

const initialState = {
  notificationArray: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification(state, action) {
      state.notificationArray = setNewArray(
        state.notificationArray,
        action.payload
      );
    },
  },
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
