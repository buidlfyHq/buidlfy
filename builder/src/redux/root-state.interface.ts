import { IContractState } from './contract/contract.interfaces';
import { IWorkspaceState } from './workspace/workspace.interfaces';
import { IModalState } from './modal/modal.interfaces';
import { IWeb3State } from './web3/web3.interfaces';
import { IUserState } from './user/user.interfaces';
import { ITemplateState } from './template/template.interfaces';
import { IMintedState } from './minted/minted.interfaces';
import { IPublishState } from './publish/publish.interfaces';
import { IUploadState } from './upload/upload.interfaces';
import { ILensterState } from './lenster/lenster.interfaces';
import { IOracleState } from './oracle/oracle.interfaces';

export interface IRootState {
  workspace: IWorkspaceState;
  contract: IContractState;
  modal: IModalState;
  web3: IWeb3State;
  user: IUserState;
  template: ITemplateState;
  minted: IMintedState;
  publish: IPublishState;
  upload: IUploadState;
  lenster: ILensterState;
  oracle: IOracleState;
}
