import IColor from "interfaces/color";

export interface IPayload {
  level?: number;
  settingItemId?: string;
  propertyName?: string;
  propertyValue?: string | number | IColor;
  childPropertyName?: string;
}

export interface IAction {
  payload: IPayload;
}
