import { IContractState } from "./contract/contract.interfaces";
import { IWorkspaceState } from "./workspace/workspace.interfaces";
import { IModalState } from "./modal/modal.interfaces";
import { IWeb3State } from "./web3/web3.interfaces";
import { ITemplateState } from "./template/template.interfaces";

export interface IRootState {
  workspace: IWorkspaceState;
  contract: IContractState;
  modal: IModalState;
  web3: IWeb3State
  template: ITemplateState;
}
