import { createSlice } from "@reduxjs/toolkit";
import { IModalState } from "./modal.interfaces";

const initialState: IModalState = {
  modalShow: true,
  modalType: "start",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal(state, action) {
      state.modalShow = action.payload;
    },
    toggleModalType(state, action) {
      state.modalType = action.payload;
    },
  },
});

export const { toggleModal, toggleModalType } = modalSlice.actions;
export default modalSlice.reducer;
