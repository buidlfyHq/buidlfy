import { IOracleConfig } from "./config";
import { IList } from "./lists";
import { IInput, IOutput } from "./value";

export default interface ITexts {
  i?: string;
  name?: string;
  id?: string;
  fontWeight?: number;
  italic: string;
  underline: string;
  color: string;
  justifyContent: string;
  borderColor?: string;
  fontSize: number;
  value: string;
  link: string;
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  shadow?: string;
  contractFunction?: any; // breaking while assigning a type, work in progress
  oracleFunction?: IOracleConfig;
  inputValue?: IInput[];
  setInputValue?: (inputValue: IInput[]) => void;
  outputValue?: IOutput[];
  setOutputValue?: (outputValue: IOutput[]) => void;
  connectWallet?: boolean;
  margin?: {
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
  };
  padding?: {
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
  };
  fontFamily?: string;
  listType?: string;
  listOptions?: IList[];
}
