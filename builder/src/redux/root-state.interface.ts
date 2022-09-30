import { IContractState } from "./contract/contract.interfaces";
import { IWorkspaceState } from "./workspace/workspace.interfaces";
import { IModalState } from "./modal/modal.interfaces";

export interface IRootState {
  workspace: IWorkspaceState;
  contract: IContractState;
  modal: IModalState;
}
