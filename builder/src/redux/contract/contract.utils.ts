import { IAbi, IContract } from 'redux/contract/contract.interfaces';

export const getContainerList = () => {
  try {
    const contractList = localStorage.getItem('contractList');
    const newContract: IContract[] = JSON.parse(contractList);
    return newContract;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const filteredTypes = (methodParam: { type: string }) => {
  let flag = true;
  if (
    (methodParam.type === 'string' ||
      methodParam.type === 'bool' ||
      methodParam.type === 'address' ||
      methodParam.type.slice(0, 4) === 'uint' ||
      methodParam.type.slice(0, 3) === 'int' ||
      methodParam.type.slice(0, 5) === 'bytes') &&
    methodParam.type.slice(-2) !== '[]'
  ) {
  } else {
    flag = false;
  }
  if (flag) {
    return methodParam;
  }
};

export const filterContractAbi = (abi: string) => {
  // keep type = function & remove other types
  const filteredMethods: IAbi[] = JSON.parse(abi).filter((method: IAbi) => method.type === 'function');

  // NOTE: methods with inputs & outputs of types other than
  // string, bool, address, int & uint are currently not supported
  const filteredMethodTypes = filteredMethods.map((method: IAbi) => {
    const filteredInputs = method.inputs.map((input: { type: string }) => {
      return filteredTypes(input);
    });
    const filteredOutputs = method.outputs.map((output: { type: string }) => {
      return filteredTypes(output);
    });
    if ((!filteredInputs.length || filteredInputs[0]) && (!filteredOutputs.length || filteredOutputs[0])) {
      return method;
    }
    return null;
  });

  return filteredMethodTypes.filter(f => f);
};
