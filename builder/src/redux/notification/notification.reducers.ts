import { createSlice } from "@reduxjs/toolkit";
import { setNewArray } from "./notification.utils";
import { INotification, INotificationState } from "./notification.interfaces";

const initialState: INotificationState = {
  notificationArray: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification(state, action: { payload: INotification }) {
      state.notificationArray = setNewArray(
        state.notificationArray,
        action.payload
      );
    },
  },
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
