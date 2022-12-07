export default interface IStyles {
  color: string;
  borderColor?: string;
  backgroundColor?: string;
  fontWeight?: number;
  fontStyle?: string;
  textDecoration?: string;
  justifyContent?: string;
  fontSize?: number;
  deleteComponent: boolean;
  borderRadius?: number;
  borderWidth?: number;
  shadow?: string;
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
  width?: number;
  height?: number;
  backgroundSize?: string;
  isAuto?: boolean;
  fontFamily?: string;
}
