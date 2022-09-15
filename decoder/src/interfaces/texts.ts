import IColor from "./color";
import { IInput, IOutput } from "./value";

export default interface ITexts {
  id?: string;
  bold: string;
  italic: string;
  underline: string;
  color: string;
  justifyContent: string;
<<<<<<< HEAD
  borderColor?: string;
=======
  borderColor?: IColor;
>>>>>>> 027dc40838fd7ce5f82ee7952be9ddbed3e5ac7c
  fontSize: number;
  value: string;
  link: string;
  backgroundColor?: string;
  borderRadius?: number;
  shadow?: string;
  contractFunction?: any; // breaking while assigning a type, work in progress
  inputValue?: IInput[];
  setInputValue?: (inputValue: IInput[]) => void;
  outputValue?: IOutput[];
  setOutputValue?: (outputValue: IOutput[]) => void;
  connectWallet?: string;
  margin?: {
    marginLeft?: number,
    marginRight?: number,
    marginTop?: number,
    marginBottom?: number,
  }
  padding?: {
    paddingLeft?: number,
    paddingRight?: number,
    paddingTop?: number,
    paddingBottom?: number,
  }
}
