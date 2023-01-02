import { ethers, Contract } from "ethers";
import { setValue } from "hooks/set-value";
import { IInput, IOutput } from "interfaces/value";

export const onRequest = async (
  method: string,
  contractFunction: {
    methodName?: string;
    stateMutability?: string;
    inputs?: object[];
    outputs?: object[];
  },
  contract: Contract,
  inputValue: IInput[],
  outputValue: IOutput[],
  setIsOpen: (isOpen: boolean) => void,
  setTransactionStatus: (transactionStatus: string) => void
) => {
  // contract functions with inputs
  if (contractFunction.inputs.length) {
    // push all the required input values to args
    const args = [];
    let amount: string;

    // mapping: contractFunction: {methodName, stateMutability, inputs, outputs}
    // inputs: ['input00', 'input01'] ---> [{id: 'xyz'}, {id: 'abc'}]
    // same goes with output
    inputValue.map((input: { id: string; value: string }) => {
      contractFunction.inputs.map(
        (contractInput: { id: string; send: boolean }) => {
          if (input.id === contractInput.id) {
            if (contractInput.send) {
              amount = input.value;
            } else {
              args.push(input.value);
            }
          }
          return contractInput;
        }
      );
      return input;
    });

    let receipt: any; // to store response from contract
    // show transaction hash for non-payable and payable
    // show outputs for view and pure
    if (contractFunction.stateMutability === "nonpayable") {
      // query contract functions --- magic code
      const res = await contract.functions[method](...args); // passing an array as a function parameter
      setIsOpen(true);
      receipt = await res.wait();
      console.log(receipt);
    } else if (contractFunction.stateMutability === "payable") {
      // query contract functions --- magic code
      const res = await contract.functions[method](...args, {
        value: ethers.utils.parseEther(amount),
      }); // passing an array as a function parameter
      receipt = await res.wait();
      console.log(receipt);
    } else if (
      contractFunction.stateMutability === "view" ||
      contractFunction.stateMutability === "pure"
    ) {
      const res = await contract.functions[method](...args); // passing an array as a function parameter
      receipt = res.wait ? await res.wait() : res;
      console.log(receipt);
    }

    // contract functions with outputs
    let returnOutput = [];
    if (contractFunction.outputs.length) {
      contractFunction.outputs.map(
        (contractOutput: { id: string }, i: number) => {
          returnOutput.push(
            setValue(outputValue, contractOutput.id, receipt[i])
          );
          return contractOutput;
        }
      );
    }

    if (receipt.transactionHash) {
      setTransactionStatus("Transaction Complete");
      setTimeout(() => setIsOpen(false), 3000);
    }

    return returnOutput;
  } else {
    // contract functions without inputs
    // state mutability is view always
    const receipt = await contract.functions[method]();
    console.log(receipt);

    let returnOutput = [];
    contractFunction.outputs.map(
      (contractOutput: { id: string }, i: number) => {
        returnOutput.push(setValue(outputValue, contractOutput.id, receipt[i]));
        return contractOutput;
      }
    );
    return returnOutput;
  }
};
