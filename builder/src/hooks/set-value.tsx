interface IValue {
  id: string;
  value: string;
}

export const setValue = (state: object[], stateFunctionId: string | number, stateFunctionValue: string) => {
  console.log(state, stateFunctionId, stateFunctionValue, 'stateFunctionValue');

  const searchExistingValue = state?.filter((stateObject: IValue) => stateObject.id === stateFunctionId);
  if (state) {
    if (!searchExistingValue?.length || !state?.length) {
      return [
        ...state,
        {
          id: stateFunctionId,
          value: stateFunctionValue,
        },
      ];
    }
  } else {
    return [
      {
        id: stateFunctionId,
        value: stateFunctionValue,
      },
    ];
  }

  const updateValue = state?.map((stateObject: IValue) => {
    if (stateObject.id === stateFunctionId) {
      return { ...stateObject, value: stateFunctionValue };
    }
    return stateObject;
  });
  return updateValue;
};
