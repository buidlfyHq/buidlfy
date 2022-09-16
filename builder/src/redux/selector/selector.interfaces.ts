export interface IInitialState {
  methodName: string;
  type: string;
  name: string;
  buttonId: string;
}

export interface IAction {
  payload: { methodName: string; type: string; name: string; buttonId: string };
}
