interface IElement {
  buttonId: string;
  name: string;
  id: string;
}

export interface IInitialState {
  [key: string]: IElement[];
}

export interface IAction {
  payload: {
    name: string;
    element?: IElement;
    index?: string;
    id?: string;
  };
}
