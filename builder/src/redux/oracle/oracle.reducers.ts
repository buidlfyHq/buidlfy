import { createSlice } from '@reduxjs/toolkit';
import { IOracleElementSelector, IOracleState } from './oracle.interfaces';

const initialState: IOracleState = {
  oracleConfig: {
    methodName: '',
    stateMutability: 'view',
    inputs: [],
    outputs: [],
  },
  oracleElementSelector: null,
};

const oracleSlice = createSlice({
  name: 'oracle',
  initialState,
  reducers: {
    updateOracle(state, action: { payload: { id: string; methodName: string } }) {
      state.oracleConfig.methodName = action.payload.methodName;
      state.oracleConfig.inputs = [{ id: action.payload.id, send: false }];
    },
    updateOracleOutputId(state, action: { payload: string }) {
      state.oracleConfig.outputs = [{ id: action.payload }];
    },
    setOracleToDefault(state) {
      state.oracleConfig.methodName = '';
      state.oracleConfig.inputs = [];
      state.oracleConfig.outputs = [];
    },
    updateOracleSelector(state, action: { payload: IOracleElementSelector }) {
      state.oracleElementSelector = action.payload;
    },
    setOracleSelectorToDefault(state) {
      state.oracleElementSelector = null;
    },
  },
});

export const { updateOracle, updateOracleOutputId, setOracleToDefault, updateOracleSelector, setOracleSelectorToDefault } = oracleSlice.actions;
export default oracleSlice.reducer;
