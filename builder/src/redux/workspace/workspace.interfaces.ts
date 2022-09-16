import IColor from "interfaces/color";
import IWorkspace from "interfaces/workspace";

export interface IWorkspaceState {
  workspaceElements: IWorkspace[];
  selectedElement: IWorkspace;
}

export interface IPayload {
  settingItemId: string;
  propertyName: string;
  propertyValue: string | number | IColor;
  childPropertyName?: string;
}

export interface IAction {
  payload: IPayload;
}
