import { ChangeEvent } from "react";
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
  setColor?: (color: string) => void;
  color?: string;
  setBorderColor?: (borderColor: string) => void;
  borderColor?: string;
  setBackgroundColor?: (backgroundColor: string) => void;
  backgroundColor?: string;
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
  margin?: {
    marginLeft?: number,
    marginRight?: number,
    marginTop?: number,
    marginBottom?: number,
  };
  padding?: {
    paddingLeft?: number,
    paddingRight?: number,
    paddingTop?: number,
    paddingBottom?: number,
  }
  isAuto?: boolean;
  dynamicWidth?: number;
  dynamicHeight?: number;
  setDynamicWidth?: (dynamicWidth?: number) => void;
  setDynamicHeight?: (dynamicHeight?: number) => void;
  setIsAuto?: (isAuto: boolean) => void;
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
  handlePlaceholderChange?: (e) => void;
  textVal?: string;
  // handleTextChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTextChange?: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
  linkVal?: string;
  handleLinkChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: number;
  height?: number;
  setHeight?: (height: number) => void;
  setWidth?: (width: number) => void;
  setCover?: (backgroundSize: string | boolean) => void;
  setContain?: (backgroundSize: string | boolean) => void;
  setAuto?: (backgroundSize: string | boolean) => void;
  backgroundSize?: string;
}
