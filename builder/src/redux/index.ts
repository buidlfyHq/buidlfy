import { configureStore } from "@reduxjs/toolkit";
import workspaceReducer from "redux/workspace/workspace.reducers";
import contractReducer from "redux/contractReducer";
import selectorReducer from "redux/selectorReducer";

export const store = configureStore({
  reducer: {
    workspace: workspaceReducer,
    contract: contractReducer,
    selector: selectorReducer,
  },
});
