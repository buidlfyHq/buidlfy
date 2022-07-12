import Styles from "./styles";

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
  name: string;
  link?: string;
  value?: string;
  style: Styles;
  children?: IItems[];
  isBounded?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
  moved?: boolean;
  static?: boolean;
  resizeHandles?: [];
  contract?: any;
  imgData?: string | ArrayBuffer;
  connectWallet?: string;
}
