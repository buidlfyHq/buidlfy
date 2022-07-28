import Styles from "./styles";
import { ResizeHandles } from "./handle";

export default interface IItems {
  i: string;
  x: number;
  y: number;
  h: number;
  minH?: number;
  maxH?: number;
  w: number;
  minW?: number;
  maxW?: number;
  link?: string;
  name: string;
  value?: string;
  style: Styles;
  children?: IItems[];
  isBounded?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
  moved?: boolean;
  static?: boolean;
  resizeHandles?: ResizeHandles | undefined;
  contract?: any;
  imgData?: string | ArrayBuffer;
  connectWallet?: string;
  placeholder?: string
}
