import IColor from "./color";
import IWorkspace from "./workspace";
import { IInput, IOutput } from "./value";

export default interface IBgContainer {
  item: IItems;
  children: IItems[];
  backgroundColor: string;
  color: string;
  imgData: string | ArrayBuffer;
  borderRadius: number;
  borderWidth: number;
  shadow?: string;
  inputValue: IInput[];
  setInputValue: (inputValue: IInput[]) => void;
  outputValue: IOutput[];
  setOutputValue: (outputValue: IOutput[]) => void;
  padding?: {
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
  };
}
