import { ethers, Contract } from "ethers";
import { setValue } from "./SetValue";

export const onRequest = async (
  method: string,
  contractFunction: {
    name: string;
    inputs: string[];
    stateMutability: string;
    outputs: string[];
  },
  contract: Contract,
  inputValue: object[],
  outputValue: object[]
) => {
  // contract functions with inputs
  if (contractFunction.inputs.length) {
    // push all the required input values to args
    const args = [];
    let amount: string;

    inputValue.map((input: { name: string; value: string }) => {
      contractFunction.inputs.map((inputName: string) => {
        if (input.name === inputName) {
          if (inputName === contractFunction.name) {
            amount = input.value;
          } else {
            args.push(input.value);
          }
        }
        return inputName;
      });
      return input;
    });

    let receipt; // to store response from contract

    // show transaction hash for non-payable and payable
    // show outputs for view and pure
    if (contractFunction.stateMutability === "nonpayable") {
      // query contract functions --- magic code
      const res = await contract.functions[method](...args); // passing an array as a function parameter
      receipt = await res.wait();
      console.log(receipt);
    } else if (contractFunction.stateMutability === "payable") {
      // query contract functions --- magic code
      const res = await contract.functions[method](...args, {
        gasLimit: 250000,
        gasPrice: 9000000000,
        nonce: 0,
        value: ethers.utils.parseEther(amount),
      }); // passing an array as a function parameter
      receipt = await res.wait();
      console.log(receipt);
    } else if (
      contractFunction.stateMutability === "view" ||
      contractFunction.stateMutability === "pure"
    ) {
      const res = await contract.functions[method](...args); // passing an array as a function parameter
      receipt = await res.wait();
      console.log(receipt);
    }
    // contract functions with outputs
    let returnOutput = [];
    if (contractFunction.outputs.length) {
      contractFunction.outputs.map((output: string, i: number) => {
        returnOutput.push(setValue(outputValue, output, receipt[i]));
        return output;
      });
    }

    if (receipt.transactionHash) {
      alert("Transaction hash: " + receipt.transactionHash);
    }

    return returnOutput;
  } else {
    // contract functions without inputs
    // state mutability is view always
    const receipt = await contract.functions[method]();
    console.log(receipt);

    let returnOutput = [];
    contractFunction.outputs.map((output: string, i: number) => {
      returnOutput.push(setValue(outputValue, output, receipt[i]));
      return output;
    });
    return returnOutput;
  }
};
