interface IValue {
  name: string;
  value: any;
}

export const setValue = (
  state: object[],
  functionName: string,
  stateFunctionValue: any
) => {
  const searchExistingValue = state.filter(
    (stateObject: IValue) => stateObject.name === functionName
  );

  if (!searchExistingValue.length || !state.length) {
    return [...state, { name: functionName, value: stateFunctionValue }];
  }

  const updateValue = state.map((stateObject: IValue) => {
    if (stateObject.name === functionName) {
      return { ...stateObject, value: stateFunctionValue };
    }
    return stateObject;
  });
  return updateValue;
};
