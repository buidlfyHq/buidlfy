export default interface ITexts {
  bold: string;
  italic: string;
  underline: string;
  color: any;
  justifyContent: string;
  fontSize: number;
  value: string;
  link: string;
  backgroundColor?: any;
  borderRadius?: number;
  shadow?: any;
  contractFunction?: any;
  inputValue?: object[];
  setInputValue?: (inputValue: object[]) => void;
  outputValue?: object[];
  setOutputValue?: (outputValue: object[]) => void;
}
