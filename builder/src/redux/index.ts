import { configureStore } from "@reduxjs/toolkit";
import workspaceReducer from "redux/workspace/workspace.reducers";
import contractReducer from "redux/contract/contract.reducers";
import modalReducers from "./modal/modal.reducers";

export const store = configureStore({
  reducer: {
    workspace: workspaceReducer,
    contract: contractReducer,
    modal: modalReducers,
  },
});
