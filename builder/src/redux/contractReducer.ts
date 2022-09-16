import { createSlice } from "@reduxjs/toolkit";

interface IAction {
  payload: { abi: string; address: string };
}

const contractSlice = createSlice({
  name: "contract",
  initialState: {
    abi: "",
    address: "",
  },
  reducers: {
    updateContract(state, action: IAction) {
      return action.payload;
    },
  },
});

export const { updateContract } = contractSlice.actions;
export default contractSlice.reducer;