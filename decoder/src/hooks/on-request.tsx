import BuilderConfig from "config";
import { ethers, Contract } from "ethers";
import { setValue } from "hooks/set-value";
import { IInput, IOutput } from "interfaces/value";

interface IPayableInput {
  name?: string;
  value?: string;
  send?: boolean;
}

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
    const config = JSON.parse(BuilderConfig);
    // push all the required input values to args
    const args = [];
    let amount: string;
    // mapping: contractFunction: {methodName, stateMutability, inputs, outputs}
    // inputs: ['input00', 'input01'] ---> [{id: 'xyz'}, {id: 'abc'}]
    // same goes with output
    inputValue.map((input: { id: string; value: string; name: string }) => {
      contractFunction.inputs.map(
        (contractInput: { id: string; send: boolean; name: string }) => {
          if (input.id === contractInput.id) {
            if (contractInput.send) {
              amount = input.value;
            } else {
              args.push({ name: contractInput.name, value: input.value });
            }
          }
          return contractInput;
        }
      );
      return input;
    });
    const userAddress = await contract.signer.getAddress();
    // Infer better type for input
    contractFunction.inputs.map((input: any) => {
      if (input?.value) {
        args.push({ name: input.name, value: input.value });
      }
      if (input?.userAddress) {
        args.push({ name: input.name, value: userAddress });
      }
    });

    const newArgs = [];
    config.contract.abi
      .find((m) => m.name === method)
      .inputs.map((input) => {
        args.map((arg) => {
          if (input.name === arg.name && !input.send) {
            if (input.type === "tuple") {
              newArgs.push(JSON.parse(arg.value));
            } else {
              newArgs.push(arg.value);
            }
          }
        });
      });
    let receipt: any; // to store response from contract
    // show transaction hash for non-payable and payable
    // show outputs for view and pure
    if (contractFunction.stateMutability === "nonpayable") {
      // query contract functions --- magic code
      const res = await contract.functions[method](...newArgs); // passing an array as a function parameter
      setIsOpen(true);
      receipt = await res.wait();
      console.log(receipt);
    } else if (contractFunction.stateMutability === "payable") {
      const payableInput: IPayableInput = contractFunction.inputs.find(
        (input: IPayableInput) => input?.send === true
      );
      amount = payableInput?.value;
      // query contract functions --- magic code
      const res = await contract.functions[method](...newArgs, {
        value: ethers.utils.parseEther(amount),
      }); // passing an array as a function parameter
      receipt = await res.wait();
      console.log(receipt);
    } else if (
      contractFunction.stateMutability === "view" ||
      contractFunction.stateMutability === "pure"
    ) {
      const res = await contract.functions[method](...newArgs); // passing an array as a function parameter
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
