import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "redux/root-saga";
import workspaceReducer from "redux/workspace/workspace.reducers";
import contractReducer from "redux/contract/contract.reducers";
import modalReducers from "./modal/modal.reducers";
import web3Reducer from "redux/web3/web3.reducers";
import templateReducer from "redux/template/template.reducers";
import mintedReducer from "redux/minted/minted.reducers";

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    workspace: workspaceReducer,
    contract: contractReducer,
    modal: modalReducers,
    web3: web3Reducer,
    template: templateReducer,
    minted: mintedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);