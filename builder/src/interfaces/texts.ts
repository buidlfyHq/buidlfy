import { IColor, IWorkspaceElements } from "redux/workspace/workspace.interfaces";

export default interface ITexts {
  item?: IWorkspaceElements;
  items?: IWorkspaceElements[];
  setItems?: (items?: IWorkspaceElements[]) => void;
  bold: string;
  italic: string;
  underline: string;
  color?: IColor;
  justifyContent: string;
  fontSize: number;
  value: string;
  link: string;
  borderRadius?: number;
  backgroundColor?: IColor;
  shadow?: string;
  connectWallet?: string;
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
}
