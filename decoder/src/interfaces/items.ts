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
  link?: string;
  name: string;
  value?: string;
  style: Styles;
  isBounded?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
  moved?: boolean;
  static?: boolean;
  resizeHandles?: [];
  contract?: object;
  imgData?: string | ArrayBuffer;
  connectWallet?: string;
}
