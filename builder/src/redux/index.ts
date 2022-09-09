import { configureStore } from "@reduxjs/toolkit";
import workspaceReducer from "redux/workspace/workspace.reducers";
import contractReducer from "redux/contract/contract.reducers";
import selectorReducer from "redux/selector/selector.reducers";
import selectedReducer from "redux/selected/selected.reducers";

export const store = configureStore({
  reducer: {
    workspace: workspaceReducer,
    contract: contractReducer,
    selector: selectorReducer,
    selected: selectedReducer,
  },
});
