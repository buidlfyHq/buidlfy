import { IColor } from "redux/workspace/workspace.interfaces";

export default interface IBgContainer {
    backgroundColor: IColor;
    color: IColor;
    imgData: string | ArrayBuffer;
    borderRadius: number;
    borderWidth: number;
    shadow: string;
}