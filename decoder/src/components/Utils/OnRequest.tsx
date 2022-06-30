import { Contract } from "ethers";
import { setValue } from "./SetValue";

export const onRequest = async (
  method: string,
  contractFunction: {
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

    inputValue.map((input: { name: string; value: string }) => {
      contractFunction.inputs.map((inputName: string) => {
        if (input.name === inputName) {
          args.push(input.value);
        }
        return inputName;
      });
      return input;
    });

    let receipt; // to store response from contract

    // check state mutability
    // if non-payable then show transaction hash in popup
    // if payable then request user to pay the amount and then show transaction hash in popup
    // if view then display the output directly
    // NOTE: non-payable and payable cannot have any output

    if (contractFunction.stateMutability === "nonpayable") {
      // query contract functions --- magic code
      const res = await contract.functions[method](...args); // passing an array as a function parameter
      receipt = await res.wait();
      console.log(receipt);
    } else if (contractFunction.stateMutability === "payable") {
      // different code ---------------------> FIX

      // var overrideOptions = {
      //   gasLimit: 250000,
      //   gasPrice: 9000000000,
      //   nonce: 0,
      //   value: ethers.utils.parseEther("1.0"),
      // };

      // var sendPromise = contract.setValue("Hello World", overrideOptions);

      // ADD: Modal popup with asking user to enter the amount they want to send, and push that value in args

      // query contract functions --- magic code
      const res = await contract.functions[method](...args); // passing an array as a function parameter
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
