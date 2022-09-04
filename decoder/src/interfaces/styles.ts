import IColor from "./color";

export default interface IStyles {
  color: IColor;
  borderColor?: IColor;
  backgroundColor?: IColor;
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  justifyContent?: string;
  fontSize?: number;
  deleteComponent: number;
  borderRadius?: number;
  borderWidth?: number;
  shadow?: string;
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
