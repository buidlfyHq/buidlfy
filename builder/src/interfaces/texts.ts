import IColor from "./color";
import IItems from "./items";

export default interface ITexts {
  item?: IItems;
  items?: IItems[];
  setItems?: (items?: IItems[]) => void;
  bold: string;
  italic: string;
  underline: string;
  color?: string;
  borderColor?: string;
  justifyContent: string;
  fontSize: number;
  value: string;
  link: string;
  borderRadius?: number,
  backgroundColor?: string;
  shadow?: string;
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

