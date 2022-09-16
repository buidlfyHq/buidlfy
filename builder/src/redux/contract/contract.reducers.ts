import { createSlice } from "@reduxjs/toolkit";
import { IInitialState, IAction } from "./contract.interfaces";

const initialState: IInitialState = {
  abi: "",
  address: "",
};

const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    updateContractAbi(state, action: IAction) {
      state.abi = action.payload;
    },
    updateContractAddress(state, action: IAction) {
      state.address = action.payload;
    },
  },
});

export const { updateContractAbi, updateContractAddress } =
  contractSlice.actions;
export default contractSlice.reducer;
