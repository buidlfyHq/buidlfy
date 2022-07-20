import IColor from "./color";

export default interface IStyles {
  color?: IColor;
  backgroundColor?: IColor;
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  justifyContent?: string;
  fontSize?: number;
  deleteComponent?: number;
  borderRadius?: number;
  borderWidth?: number;
  shadow?: string;
}
