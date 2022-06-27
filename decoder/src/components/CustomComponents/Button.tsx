import { FC, useEffect } from "react";
import { ethers, providers, Contract, Signer } from "ethers";
import { useSnackbar } from "react-simple-snackbar";
import ITexts from "interfaces/texts";
import "styles/Components.css";
import BuilderConfig from "config";
import { setValue } from "../Utils/SetValue";

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

      let receipt: any; // to store response from contract

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
      className="flex px-6 items-center justify-center w-auto h-full"
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
