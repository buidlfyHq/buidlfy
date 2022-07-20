import IColor from "./color";
import IItems from "./items";

export default interface IBgContainer {
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
  outputValue: object[];
  setOutputValue: (outputValue: object[]) => void;
}
