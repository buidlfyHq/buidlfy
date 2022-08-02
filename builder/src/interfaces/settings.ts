import IColor from "./color";
import IItems from "./items";

export default interface ISettings {
  items?: IItems[];
  setItems?: (items: IItems[]) => void;
  selectedItem?: IItems;
  setLink?: (link: string) => void;
  link?: string;
  setValue?: (value: string) => void;
  value?: string;
  setBold?: (bold: string | boolean) => void;
  bold?: string;
  setItalic?: (italic: string | boolean) => void;
  italic?: string;
  setUnderline?: (underline: string | boolean) => void;
  underline?: string;
  setColor?: (color: IColor) => void;
  color?: IColor;
  setBgColor?: (backgroundColor: IColor) => void;
  backgroundColor?: IColor;
  setDeleteComponent?: (deleteComponent: number) => void;
  deleteComponent?: number;
  justifyContent?: string;
  setLeft?: (justifyContent: string | boolean) => void;
  setCenter?: (justifyContent: string | boolean) => void;
  setRight?: (justifyContent: string | boolean) => void;
  setFontSize?: (fontSize: number) => void;
  fontSize?: number;
  setContractConfig?: (contractConfig: {
    abi: string;
    address: string;
  }) => void;
  contractConfig?: { abi: string; address: string };
  setShowComponent?: (showComponent: { id: string; value: {
    name: string;
    inputs: object[];
    outputs: object[];
    stateMutability: string;
  }; }) => void;
  showComponent?: {
    id: string;
    value: {
      name: string;
      inputs: object[];
      outputs: object[];
      stateMutability: string;
    };
  };
  selector?: {
    methodName: string;
    type: string;
    name: string;
    buttonId: string;
  },
  setSelector?: (selector: {
    methodName: string;
    type: string;
    name: string;
    buttonId: string;
  }) => void;
  setOpenSetting?: (open: boolean) => void;
  settingItemId?: string;
  elementConfig?: object;
  openTab?: number;
  setOpenTab?: (openTab: number) => void;
  borderRadius?: number;
  setBorderRadius?: (borderRadius: number) => void;
  borderWidth?: number;
  setBorderWidth?: (borderWidth: number) => void;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  setMarginLeft?: (marginLeft: number) => void;
  setMarginRight?: (marginRight: number) => void;
  setMarginTop?: (marginTop: number) => void;
  setMarginBottom?: (marginBottom: number) => void;
  setPaddingLeft?: (paddingLeft: number) => void;
  setPaddingRight?: (paddingRight: number) => void;
  setPaddingTop?: (paddingTop: number) => void;
  setPaddingBottom?: (paddingBottom: number) => void;
  setSmall?: (shadow: string | boolean) => void;
  setMedium?: (shadow: string | boolean) => void;
  setLarge?: (shadow: string | boolean) => void;
  shadow?: string;
  setOn?: (connectWallet: string | boolean) => void;
  connectWallet?: string;
  placeholder?: string;
  setPlaceholder?: (placeholder: string) => void;
  handlePlaceholderChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  textVal?: string;
  handleTextChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  linkVal?: string;
  handleLinkChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
