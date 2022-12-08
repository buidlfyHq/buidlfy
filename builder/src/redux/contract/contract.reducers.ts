import { createSlice } from '@reduxjs/toolkit';
import { getContainerList } from './contract.utils';
import { IContract, IContractState, ISelectedPayload, ISelectorPayload } from './contract.interfaces';

const initialState: IContractState = {
  contractDetails: {
    abi: '',
    address: '',
    network: '',
  },
  contractElementSelector: null,
  contractElementSelected: {},
  contractList: getContainerList(),
};

const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    // to update contract list
    updateContractList(state, action: { payload: IContract[] }) {
      state.contractList = action.payload;
    },

    // to update contract details
    updateContractAbi(state, action: { payload: string }) {
      state.contractDetails.abi = action.payload;
    },
    updateContractAddress(state, action: { payload: string }) {
      state.contractDetails.address = action.payload;
    },
    updateContractNetwork(state, action: { payload: string }) {
      state.contractDetails.network = action.payload;
    },
    // to update contract element selector
    updateSelector(state, action: { payload: ISelectorPayload }) {
      state.contractElementSelector = action.payload;
    },
    setSelectorToDefault(state) {
      state.contractElementSelector = null;
    },
    // to update contract element selected
    createSelectedElement(state, action: { payload: ISelectedPayload }) {
      state.contractElementSelected[action.payload.name] = [action.payload.element];
    },
    addSelectedElement(state, action: { payload: ISelectedPayload }) {
      let key = state.contractElementSelected[action.payload.name];
      state.contractElementSelected[action.payload.name] = [...key, action.payload.element];
    },
    updateSelectedElement(state, action: { payload: ISelectedPayload }) {
      const { name, index, id } = action.payload;
      let key = [...state.contractElementSelected[name]];
      key[index] = { ...state.contractElementSelected[name][index], id };
    },
  },
});

export const {
  updateContractList,
  updateContractAbi,
  updateContractAddress,
  updateSelector,
  setSelectorToDefault,
  createSelectedElement,
  addSelectedElement,
  updateSelectedElement,
  updateContractNetwork,
} = contractSlice.actions;
export default contractSlice.reducer;
