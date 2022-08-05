import IColor from "./color";
import IItems from "./items";

export default interface ITexts {
  item?: IItems;
  items?: IItems[];
  itemsViaContainer?: IItems[];
  containerItems?: IItems;
  setContainerItems?: (items?: IItems) => void;
  setItems?: (items?: IItems[]) => void;
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
  setValue?: (value: string) => void;
  setLink?: (link: string) => void;
}

