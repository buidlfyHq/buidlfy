import { createSlice } from "@reduxjs/toolkit";
import { IOracleState } from "./oracle.interfaces";

const initialState: IOracleState = {
  id: "",
  methodName: "",
  outputId: "",
};

const oracleSlice = createSlice({
  name: "oracle",
  initialState,
  reducers: {
    updateOracle(
      state,
      action: { payload: { id: string; methodName: string } }
    ) {
      state.id = action.payload.id;
      state.methodName = action.payload.methodName;
    },
    updateOracleOutputId(state, action: { payload: string }) {
      state.outputId = action.payload;
    },
  },
});

export const { updateOracle, updateOracleOutputId } = oracleSlice.actions;
export default oracleSlice.reducer;
