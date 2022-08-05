import IColor from "./color";
import { IInput, IOutput } from "./value";

export default interface ITexts {
  id?: string;
  bold: string;
  italic: string;
  underline: string;
  color: IColor;
  justifyContent: string;
  fontSize: number;
  value: string;
  link: string;
  backgroundColor?: IColor;
  borderRadius?: number;
  shadow?: string;
  contractFunction?: any; // breaking while assigning a type, work in progress
  inputValue?: IInput[];
  setInputValue?: (inputValue: IInput[]) => void;
  outputValue?: IOutput[];
  setOutputValue?: (outputValue: IOutput[]) => void;
  connectWallet?: string;
}
