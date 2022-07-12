export default interface IBgContainer {
  children: any;
  backgroundColor: any;
  color: any;
  imgData: any;
  borderRadius: number;
  borderWidth: number;
  shadow?: any;
  inputValue: {
    id: string;
    value: string;
  }[];
  setInputValue: (
    inputValue: {
      id: string;
      value: string;
    }[]
  ) => void;
  outputValue: object[];
  setOutputValue: (outputValue: object[]) => void;
  // borderRadius: any;
  // boxShadow: any;
  // zIndex: number;
  // border: any; //border color and type
  // backgroundImg: any;
}
