export default interface IBgContainer {
  children: any;
  backgroundColor: any;
  color: any;
  imgData: any;
  borderRadius: number;
  borderWidth: number;
  shadow?: any;
  inputValue: object[];
  setInputValue: (inputValue: object[]) => void;
  outputValue: object[];
  setOutputValue: (outputValue: object[]) => void;
  // borderRadius: any;
  // boxShadow: any;
  // zIndex: number;
  // border: any; //border color and type
  // backgroundImg: any;
}
