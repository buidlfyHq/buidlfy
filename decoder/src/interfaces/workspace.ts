import { IOracleConfig } from "./config";
import Styles from "./styles";

export default interface IWorkspace {
  i: string;
  x: number;
  y: number;
  h: number;
  minH?: number;
  maxH?: number;
  w: number;
  minW?: number;
  maxW?: number;
  name: string;
  link?: string;
  value?: string;
  style: Styles;
  children?: IWorkspace[];
  isBounded?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
  moved?: boolean;
  static?: boolean;
  resizeHandles?: [];
  contract?: any; // breaking while assigning a type, work in progress
  oracle?: IOracleConfig;
  imgData?: string | ArrayBuffer;
  connectWallet?: boolean;
  placeholder?: string;
  postIds?: [];
}
