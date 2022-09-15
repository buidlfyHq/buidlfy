import IColor from "./color";

export default interface IBgContainer {
    backgroundColor: string;
    color: string;
    imgData: string | ArrayBuffer;
    borderRadius: number;
    borderWidth: number;
    shadow: string;
}