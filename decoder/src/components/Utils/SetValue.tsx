interface IValue {
  id: string;
  name: string;
  value: any;
}

export const setValue = (
  state: object[],
  stateFunctionId: string,
  stateFunctionName: string,
  stateFunctionValue: any
) => {
  const searchExistingValue = state.filter(
    (stateObject: IValue) => stateObject.id === stateFunctionId
  );

  if (!searchExistingValue.length || !state.length) {
    return [
      ...state,
      {
        id: stateFunctionId,
        name: stateFunctionName,
        value: stateFunctionValue,
      },
    ];
  }

  const updateValue = state.map((stateObject: IValue) => {
    if (stateObject.id === stateFunctionId) {
      return { ...stateObject, value: stateFunctionValue };
    }
    return stateObject;
  });
  return updateValue;
};
