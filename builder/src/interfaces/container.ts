import IColor from "./color";

export default interface IBgContainer {
  backgroundColor: IColor;
  color: IColor;
  imgData: string | ArrayBuffer;
  borderRadius: number;
  borderWidth: number;
  shadow: string;
}
