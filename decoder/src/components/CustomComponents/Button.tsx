import React, { FC, useEffect, useState } from "react";
import { ethers, providers, Contract, Signer } from "ethers";
import { useSnackbar } from "react-simple-snackbar";
import ITexts from "interfaces/texts";
import "styles/Components.css";
import BuilderConfig from "config";
import { setValue } from "../Utils/SetValue";
import { Dialog } from '@headlessui/react'

const Button: FC<ITexts> = ({
  bold,
  italic,
  underline,
  color,
  justifyContent,
  fontSize,
  value,
  link,
  backgroundColor,
  contractFunction,
  inputValue,
  setInputValue,
  outputValue,
  setOutputValue,
}) => {
  const config = JSON.parse(BuilderConfig);
  const [openSnackbar, closeSnackbar] = useSnackbar();
  let provider: providers.Web3Provider,
    signer: providers.Provider | Signer,
    contract: Contract;

  const onLoad = () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(
      config.contract.address,
      config.contract.abi,
      signer
    );
  };

  let [isOpen, setIsOpen] = useState(false)

  const [transactionStatus, setTransactionStatus] = useState<string>('')

  useEffect(() => {
    if (config.contract.abi !== "" && config.contract.address !== "") {
      onLoad();
    }
  }, []); // eslint-disable-line

  // execute contract function
  const onRequest = async (method: string) => {
    openSnackbar("Loading...", 100000);
    onLoad();
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
        {setIsOpen(true)}
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
      if (contractFunction.outputs.length) {
        contractFunction.outputs.map((output: string, i: number) => {
          setOutputValue(setValue(outputValue, output, receipt[i]));
          return output;
        });
      }

      if (receipt.transactionHash) {
        closeSnackbar();
        openSnackbar("Transaction hash: " + receipt.transactionHash);
      }
    } else {
      // contract functions without inputs
      // state mutability is view always
      const receipt = await contract.functions[method]();
      console.log(receipt);

      contractFunction.outputs.map((output: string, i: number) => {
        setOutputValue(setValue(outputValue, output, receipt[i]));
        return output;
      });
    }
  };

  return (
    <div
      style={{ justifyContent: justifyContent }}
      className="flex items-center justify-center w-auto h-full px-6"
    >
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="max-w-sm p-4 mx-auto bg-white rounded">
            <Dialog.Title>
            {transactionStatus === '' ?
            (<div className="lds-ring"><div></div><div></div><div></div><div></div></div>) 
            : (transactionStatus)
            } 
            </Dialog.Title>
          </Dialog.Panel>
        </div>
      </Dialog>

      <div
        style={{
          fontWeight: bold,
          fontStyle: italic,
          textDecoration: underline,
          color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          borderColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          display: "flex",
          justifyContent: "center",
          fontSize: `${fontSize}px`,
          backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
        }}
        className="w-48 px-6 py-2 rounded cursor-pointer btn whitespace-nowrap"
        onClick={() =>
          contractFunction.name
            ? onRequest(contractFunction.name)
            : console.log("Clicked")
        }
      >
        {value}
      </div>
    </div>
  );
};

export default Button;
