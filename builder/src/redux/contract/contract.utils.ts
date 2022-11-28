import { IContract } from "redux/contract/contract.interfaces";

export const getContainerList = () => {
  try {
    const contractList = localStorage.getItem("contractList");
    const newContract: IContract[] = JSON.parse(contractList);
    return newContract;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const filterContractAbi = (abi: string) => {
  // keep type = function & remove other types
  const filteredMethods = JSON.parse(abi).filter(
    (method: { type: string }) => method.type === "function"
  );

  // NOTE: methods with inputs & outputs of types other than
  // string, bool, address, int & uint are currently not supported
  const filteredMethodTypes = filteredMethods.map(
    (method: { inputs: []; outputs: [] }) => {
      const filteredInputs = method.inputs.map((input: { type: string }) => {
        let flag = true;
        if (
          (input.type === "string" ||
            input.type === "bool" ||
            input.type === "address" ||
            input.type.slice(0, 4) === "uint" ||
            input.type.slice(0, 3) === "int") &&
          input.type.slice(-2) !== "[]"
        ) {
        } else {
          flag = false;
        }
        if (flag) {
          return input;
        }
      });
      const filteredOutputs = method.outputs.map((output: { type: string }) => {
        let flag = true;
        if (
          (output.type === "string" ||
            output.type === "bool" ||
            output.type === "address" ||
            output.type.slice(0, 4) === "uint" ||
            output.type.slice(0, 3) === "int") &&
          output.type.slice(-2) !== "[]"
        ) {
        } else {
          flag = false;
        }
        if (flag) {
          return output;
        }
      });
      if (
        (!filteredInputs.length || filteredInputs[0]) &&
        (!filteredOutputs.length || filteredOutputs[0])
      ) {
        return method;
      }
    }
  );

  return filteredMethodTypes.filter((f) => f);
};
