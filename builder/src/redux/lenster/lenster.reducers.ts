import { createSlice } from '@reduxjs/toolkit';
import { ILensterState } from './lenster.interfaces';

const initialState: ILensterState = {
  inputValue: false,
};

const lensterSlice = createSlice({
  name: 'lenster',
  initialState,
  reducers: {
    updateInputValue(state: ILensterState, action: { payload: boolean }) {
      return {
        ...state,
        inputValue: action.payload,
      };
    },
  },
});

export const { updateInputValue } = lensterSlice.actions;
export default lensterSlice.reducer;
