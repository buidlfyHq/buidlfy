import IColor from "./color";

export default interface IStyles {
<<<<<<< HEAD
  color: string;
  borderColor?: string;
  backgroundColor?: string;
=======
  color: IColor;
  borderColor?: IColor;
  backgroundColor?: IColor;
>>>>>>> 027dc40838fd7ce5f82ee7952be9ddbed3e5ac7c
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
  width?: number;
  height?: number;
  backgroundSize?: string;
  isAuto?: boolean;
}
