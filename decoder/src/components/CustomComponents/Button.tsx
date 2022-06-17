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

  // call a function in contract
  const onGet = async (method) => {
    console.log(inputValue);
    onLoad();
    const args = [];
    Object.keys(inputValue).map((key) => {
      contractFunction.inputs.map((input) => {
        if (key === input) {
          args.push(inputValue[key]);
        }
        return input;
      });
      return key;
    });
    console.log(args);
    

    // query contract functions --- magic code
    // await contract.functions[method](...args); // passing an array as a function parameter
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
            ? onGet(contractFunction.name)
            : console.log("Clicked")
        }
      >
        {value}
      </div>
    </div>
  );
};

export default Button;
