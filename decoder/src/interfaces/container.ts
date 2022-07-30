import IColor from "./color";
import IItems from "./items";

export default interface IBgContainer {
  item: IItems;
  children: IItems[];
  backgroundColor: IColor;
  color: IColor;
  imgData: string | ArrayBuffer;
  borderRadius: number;
  borderWidth: number;
  shadow?: string;
  inputValue: {
    id: string;
    value: string;
  }[];
  setInputValue: (
    inputValue: {
      id: string;
      value: string;
    }[]
  ) => void;
  outputValue: {
    id: string;
    name: string;
    value: any; // can be string or array
  }[];
  setOutputValue: (outputValue: {
    id: string;
    name: string;
    value: any; // can be string or array
  }[]) => void;
}
