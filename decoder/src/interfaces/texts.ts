import IColor from "./color";

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
  inputValue?: object[];
  setInputValue?: (inputValue: object[]) => void;
  outputValue?: object[];
  setOutputValue?: (outputValue: object[]) => void;
  connectWallet?: string;
}
