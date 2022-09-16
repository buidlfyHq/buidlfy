import { IWorkspaceElements } from "redux/workspace/workspace.interfaces";

export default interface ITemplate {
  name: string;
  value: IWorkspaceElements[];
}
