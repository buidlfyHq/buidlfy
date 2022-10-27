import { createSlice } from "@reduxjs/toolkit";
import { IPublishState } from "./publish.interfaces";

const initialState: IPublishState = {
  publishConfig: null,
  domainName: null,
  deploymentId: null,
  transactionResponse: null,
  projectId: null,
  currentStep: 0,
  domainId: null,
};

const publishSlice = createSlice({
  name: "publish",
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
    updateTransactionResponse(
      state: IPublishState,
      action: { payload: string }
    ) {
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
} = publishSlice.actions;
export default publishSlice.reducer;
