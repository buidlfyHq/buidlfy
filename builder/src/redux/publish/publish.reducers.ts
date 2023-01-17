import { createSlice } from '@reduxjs/toolkit';
import { IPublishState } from './publish.interfaces';
import { fetchPublishDetailsAsync, initiatePublishAsync, updatePublishAsync, verifyPublishAsync } from './publish.thunk-actions';

const initialState: IPublishState = {
  publishConfig: null,
  domainName: null,
  deploymentId: null,
  transactionResponse: null,
  projectId: null,
  currentStep: 0,
  domainId: null,
  publishStatus: false,
  publishFailed: false,
};

const publishSlice = createSlice({
  name: 'publish',
  initialState,
  reducers: {
    updatePublishConfig(state: IPublishState, action: { payload: string }) {
      state.publishConfig = action.payload;
    },
    updateCurrentStep(state: IPublishState, action: { payload: number }) {
      state.currentStep = action.payload;
    },
    updatePublishStatus(state: IPublishState, action: { payload: boolean }) {
      state.publishStatus = action.payload;
    },
    updatePublishFailed(state: IPublishState, action: { payload: boolean }) {
      state.publishFailed = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(initiatePublishAsync.fulfilled, (state, action) => {
      state.transactionResponse = action.payload.publishId;
      state.publishFailed = action.payload.publishFailed;
      state.deploymentId = action.payload.deploymentId;
      state.currentStep = action.payload.currentStep;
    });
    builder.addCase(initiatePublishAsync.rejected, state => {
      state.publishFailed = true;
    });
    builder.addCase(fetchPublishDetailsAsync.fulfilled, (state, action) => {
      state.domainName = action.payload.domainName;
      state.projectId = action.payload.projectId;
      state.currentStep = action.payload.currentStep;
    });
    builder.addCase(fetchPublishDetailsAsync.rejected, state => {
      state.publishFailed = true;
    });
    builder.addCase(verifyPublishAsync.fulfilled, (state, action) => {
      state.currentStep = action.payload.currentStep;
    });
    builder.addCase(verifyPublishAsync.rejected, state => {
      state.publishFailed = true;
    });
    builder.addCase(updatePublishAsync.fulfilled, (state, action) => {
      state.currentStep = action.payload.currentStep;
    });
    builder.addCase(updatePublishAsync.rejected, state => {
      state.publishFailed = true;
    });
  },
});

export const { updatePublishConfig, updateCurrentStep, updatePublishStatus, updatePublishFailed } = publishSlice.actions;
export default publishSlice.reducer;
