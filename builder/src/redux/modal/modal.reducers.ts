import { createSlice } from "@reduxjs/toolkit";
import { IModalState } from "./modal.interfaces";

const initialState: IModalState = {
  modalShow: false,
  modalType: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal(state, action: { payload: boolean }) {
      state.modalShow = action.payload;
    },
    toggleModalType(state, action: { payload: string }) {      
      state.modalType = action.payload;
    },
  },
});

export const { toggleModal, toggleModalType } = modalSlice.actions;
export default modalSlice.reducer;
