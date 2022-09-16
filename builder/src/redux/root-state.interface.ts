import { IContractState } from "./contract/contract.interfaces";
import { IWorkspaceState } from "./workspace/workspace.interfaces";

export interface IRootState {
  workspace: IWorkspaceState;
  contract: IContractState;
}
