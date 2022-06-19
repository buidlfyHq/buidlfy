import React, { FC, useEffect } from "react";
import { ethers, Contract } from "ethers";
import ITexts from "interfaces/texts";
import "styles/Components.css";
import config from "config";

const Button: FC<ITexts> = ({
  bold,
  italic,
  underline,
  color,
  justifyContent,
  fontSize,
  value,
  link,
  contractFunction,
  inputValue,
  setInputValue,
  outputValue,
  setOutputValue,
}) => {
  let provider, signer, contract: Contract;

  const onLoad = () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(
      config.contract.address,
      config.contract.abi,
      signer
    );
  };

  useEffect(() => {
    onLoad();
  }, []); // eslint-disable-line

  // execute contract function
  const onRequest = async (method: string) => {
    onLoad();
    // contract functions with inputs
    if (contractFunction.inputs[0]) {
      // push all the required input values to args
      const args = [];
      Object.keys(inputValue).map((key) => {
        contractFunction.inputs.map((input: string) => {
          if (key === input) {
            args.push(inputValue[key]);
          }
          return input;
        });
        return key;
      });


      let res: object | []; // to store response from contract

      // check state mutability
      // if non-payable then show transaction hash in popup
      // if payable then request user to pay the amount and then show transaction hash in popup
      // if view then display the output directly
      // NOTE: non-payable and payable cannot have any output

      if (contractFunction.stateMutability === "nonpayable") {
        // query contract functions --- magic code
        res = await contract.functions[method](...args); // passing an array as a function parameter
        console.log(res);
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
        res = await contract.functions[method](...args); // passing an array as a function parameter
        console.log(res);
      }

      // contract functions with outputs
      if (contractFunction.outputs[0]) {
        contractFunction.outputs.map((output: string, i: number) => {
          setOutputValue({
            ...outputValue,
            [output]: res[i],
          });
          return output;
        });
      } else {
        // contract functions without outputs
        // show popup with transaction hash
        // res.hash
      }
    } else {
      // contract functions without inputs
      // state mutability is view always
      const res: [] = await contract.functions[method]();
      contractFunction.outputs.map((output: string, i: number) => {
        setOutputValue({
          ...outputValue,
          [output]: res[i],
        });
        return output;
      });
    }
  };

  return (
    <div className=" flex px-6 items-center justify-center w-auto h-full">
      <div
        style={{
          fontWeight: bold,
          fontStyle: italic,
          textDecoration: underline,
          color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          borderColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          display: "flex",
          justifyContent: justifyContent,
          fontSize: `${fontSize}px`,
        }}
        className="btn px-6 py-2 rounded w-48 cursor-pointer whitespace-nowrap"
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
