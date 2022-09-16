import IColor from "./color";
import IWorkspace from "./workspace";
import { IInput, IOutput } from "./value";

export default interface IBgContainer {
  item: IWorkspace;
  children: IWorkspace[];
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
