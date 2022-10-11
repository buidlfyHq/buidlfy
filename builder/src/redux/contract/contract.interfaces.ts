export interface IContractState {
  contractDetails: IContractDetails;
  contractElementSelector: IContractElementSelector;
  contractElementSelected: IContractElementSelected;
  contractList: IContract;
}

export interface IContractDetails {
  abi: string;
  address: string;
}

export interface IContractElementSelector {
  methodName: string;
  type: string;
  name: string;
  buttonId: string;
}

export interface IContractElementSelected {
  [key: string]: IElement[];
}

interface IElement {
  buttonId: string;
  name: string;
  id: string;
}

export interface ISelectorPayload {
  methodName: string;
  type: string;
  name: string;
  buttonId: string;
}

export interface ISelectedPayload {
  name: string;
  element?: IElement;
  index?: number;
  id?: string;
}

export interface IContract {
  name: string;
  text; // type to be added
  address: string;
}
