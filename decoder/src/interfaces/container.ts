import IColor from "./color";
import IItems from "./items";
import { IInput, IOutput } from "./value";

export default interface IBgContainer {
  item: IItems;
  children: IItems[];
  backgroundColor: IColor;
  color: IColor;
  imgData: string | ArrayBuffer;
  borderRadius: number;
  borderWidth: number;
  shadow?: string;
  inputValue: IInput[];
  setInputValue: (inputValue: IInput[]) => void;
  outputValue: IOutput[];
  setOutputValue: (outputValue: IOutput[]) => void;
}
