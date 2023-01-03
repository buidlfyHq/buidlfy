import { createSlice } from '@reduxjs/toolkit';
import { IPublishState } from './publish.interfaces';

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
  siteName: 'Draft Post',
};

const publishSlice = createSlice({
  name: 'publish',
  initialState,
  reducers: {
    updatePublishConfig(state: IPublishState, action: { payload: string }) {
      return {
        ...state,
        publishConfig: action.payload,
      };
    },
    updateDomainName(state: IPublishState, action: { payload: string }) {
      return {
        ...state,
        domainName: action.payload,
      };
    },
    updateDeploymentId(state: IPublishState, action: { payload: string }) {
      return {
        ...state,
        deploymentId: action.payload,
      };
    },
    updateDomainId(state: IPublishState, action: { payload: string }) {
      return {
        ...state,
        domainId: action.payload,
      };
    },
    updateProjectId(state: IPublishState, action: { payload: string }) {
      return {
        ...state,
        projectId: action.payload,
      };
    },
    updateTransactionResponse(state: IPublishState, action: { payload: string }) {
      return {
        ...state,
        transactionResponse: action.payload,
      };
    },
    updateCurrentStep(state: IPublishState, action: { payload: number }) {
      return {
        ...state,
        currentStep: action.payload,
      };
    },
    updatePublishStatus(state: IPublishState, action: { payload: boolean }) {
      return {
        ...state,
        publishStatus: action.payload,
      };
    },
    updatePublishFailed(state: IPublishState, action: { payload: boolean }) {
      return {
        ...state,
        publishFailed: action.payload,
      };
    },
    updateSiteName(state: IPublishState, action: { payload: string }) {
      console.log(action, 'action');

      return {
        ...state,
        siteName: action.payload,
      };
    },
  },
});

export const {
  updatePublishConfig,
  updateDomainName,
  updateDeploymentId,
  updateTransactionResponse,
  updateProjectId,
  updateCurrentStep,
  updateDomainId,
  updatePublishStatus,
  updatePublishFailed,
  updateSiteName,
} = publishSlice.actions;
export default publishSlice.reducer;
