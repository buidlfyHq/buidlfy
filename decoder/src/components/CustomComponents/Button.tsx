import { FC, useState, useEffect } from "react";
import { Contract } from "ethers";
import BuilderConfig from "config";
import { onLoad } from "../Utils/OnLoad";
import { onRequest } from "../Utils/OnRequest";
import ITexts from "interfaces/texts";
import "styles/Components.css";

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
  borderRadius,
  shadow,
  connectWallet,
}) => {
  const config = BuilderConfig;
  const [contract, setContract] = useState<Contract>();

  useEffect(() => {
    // if (config.contract.abi !== [] && config.contract.address !== "") {
    if (config.contract.abi[0] && config.contract.address !== "") {
      setContract(onLoad(config));
    }
  }, []); // eslint-disable-line

  const onResponse = async () => {
    const res = await onRequest(
      contractFunction.methodName,
      contractFunction,
      contract,
      inputValue,
      outputValue
    );
    setOutputValue(res[0]);
  };

  return (
    <main
      style={{ justifyContent: justifyContent }}
      className="flex items-center justify-center w-auto h-full px-6"
    >
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
        className="btn px-6 py-2 rounded w-48 cursor-pointer whitespace-nowrap"
        onClick={() =>
          contractFunction.methodName ? onResponse() : console.log("Clicked")
        }
      >
        {value}
      </div>
    </main>
  );
};

export default Button;
