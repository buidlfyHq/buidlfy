import IColor from "./color";

export default interface ITexts {
  bold: string;
  italic: string;
  underline: string;
  color?: IColor;
  justifyContent: string;
  fontSize: number;
  value: string;
  link: string;
  borderRadius?: number,
  backgroundColor?: IColor;
  shadow?: string;
  connectWallet?: string;
}

