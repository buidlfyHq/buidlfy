import { configureStore } from '@reduxjs/toolkit';
import workspaceReducer from 'redux/workspace/workspace.reducers';
import contractReducer from 'redux/contract/contract.reducers';
import modalReducers from './modal/modal.reducers';
import web3Reducer from 'redux/web3/web3.reducers';
import userReducer from 'redux/user/user.reducers';
import templateReducer from 'redux/template/template.reducers';
import mintedReducer from 'redux/minted/minted.reducers';
import publishReducer from './publish/publish.reducers';
import uploadReducer from './upload/upload.reducers';
import lensterReducer from './lenster/lenster.reducers';
import oracleReducer from './oracle/oracle.reducers';

export const store = configureStore({
  reducer: {
    workspace: workspaceReducer,
    contract: contractReducer,
    modal: modalReducers,
    web3: web3Reducer,
    user: userReducer,
    template: templateReducer,
    minted: mintedReducer,
    publish: publishReducer,
    upload: uploadReducer,
    lenster: lensterReducer,
    oracle: oracleReducer,
  },
});
