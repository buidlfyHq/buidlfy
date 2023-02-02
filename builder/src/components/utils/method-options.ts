export enum Method {
  SELECT_INPUT = 'selectInput',
  PRE_INPUT = 'preInput',
  USER_ADDRESS = 'userAddress',
  SHOW_INPUT = 'showInput',
  SHOW_OUTPUT = 'showOutput',
  SHOW_INPUT_CONTENT = 'showInputContent',
  SHOW_OUTPUT_CONTENT = 'showOutputContent',
}

export const methodOptions = [
  {
    id: 1,
    name: 'Configure input from builder',
    methodParameter: Method.SELECT_INPUT,
    methodDescription: 'This option will allow user to choose the input from the builder which will be editable on the deployed site',
  },
  {
    id: 2,
    name: 'Configure Input as static value',
    methodParameter: Method.PRE_INPUT,
    methodDescription: 'This option will allow to put static value in the field which will be non-editable and hard coded in the final site',
  },
  {
    id: 3,
    name: 'Configure Input with user address',
    methodParameter: Method.USER_ADDRESS,
    methodDescription: 'This option will allow to get address of the connected wallet of the deployed site',
  },
];
