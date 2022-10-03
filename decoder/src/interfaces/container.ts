import IColor from "./color";
import IWorkspace from "./workspace";
import { IInput, IOutput } from "./value";

export default interface IBgContainer {
  item: IWorkspace;
  children: IWorkspace[];
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
  margin?: {
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
  }
}
