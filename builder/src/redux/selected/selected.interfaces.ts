interface IElement {
  buttonId: string;
  name: string;
  id: string;
}

export interface IInitialState {
  [key: string]: IElement[];
}
