import { FC, useEffect, useState } from "react";
import { ethers, providers, Contract, Signer } from "ethers";
import ITexts from "interfaces/texts";
import "styles/Components.css";
import BuilderConfig from "config";
import { setValue } from "../Utils/SetValue";
import { Dialog } from "@headlessui/react";
import ConnectWallet from "components/ConnectWallet";
import Web3Modal from "web3modal";
import { providerOptions } from "../ConnectWallet/providerOptions";

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});

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
  const config = JSON.parse(BuilderConfig);
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

  let [isOpen, setIsOpen] = useState(false);

  const [transactionStatus, setTransactionStatus] = useState<string>("");
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (config.contract.abi !== "" && config.contract.address !== "") {
      onLoad();
    }
  }, []); // eslint-disable-line

  // execute contract function
  const onRequest = async (method: string) => {
    // openSnackbar("Loading...", 100000);
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
        {
          setIsOpen(true);
        }
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
        setTransactionStatus("Transaction hash: " + receipt.transactionHash);
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
  console.log(connectWallet, "wallet");
  const [show, setShow] = useState(false);
  const [providerWallet, setProviderWallet] = useState();
  const [library, setLibrary] = useState();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();

  const connectWalletButton = async () => {
    try {
      const providerWallet = await web3Modal.connect();
      const library: any = new ethers.providers.Web3Provider(providerWallet);
      const accounts: any = await library.listAccounts();
      const network: any = await library.getNetwork();
      setProviderWallet(providerWallet);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
    } catch (error) {
      setError(error);
    }
  };

  const refreshState = () => {
    setAccount(null);
    setChainId(null);
    setNetwork(null);
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
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
        <div className="fixed flex items-center justify-center p-4 top-4 left-4">
          <Dialog.Panel className="max-w-sm p-4 mx-auto rounded bg-slate-700">
            <Dialog.Title>
              {transactionStatus === "" ? (
                <div className="flex items-center">
                  <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <div className="mr-5 text-white">
                    Transaction In Process...
                  </div>
                </div>
              ) : (
                <div className="text-white break-all">{transactionStatus}</div>
              )}
            </Dialog.Title>
          </Dialog.Panel>
        </div>
      </Dialog>
      <>
        {connectWallet == "on" ? (
          <>
            {!account ? (
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
                  borderRadius: `${borderRadius}px`,
                  boxShadow: shadow,
                  backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
                }}
                className="w-48 px-6 py-2 cursor-pointer btn whitespace-nowrap"
                onClick={connectWalletButton}
              >
                <>
                  {link.length > 0 ? <a href={link}>{value}</a> : <> {value}</>}
                </>{" "}
              </div>
            ) : (
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
                  borderRadius: `${borderRadius}px`,
                  boxShadow: shadow,
                  backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
                }}
                className="w-48 px-6 py-2 cursor-pointer btn whitespace-nowrap"
                onClick={disconnect}
              >
                <>
                  {link.length > 0 ? <a href={link}>{value}</a> : <> {value}</>}
                </>{" "}
              </div>
            )}
          </>
        ) : (
          // <ConnectWallet
          //   text={"connect"}
          //   account={account}
          //   setAccount={setAccount}
          // />
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
              borderRadius: `${borderRadius}px`,
              boxShadow: shadow,
              backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
            }}
            className="w-48 px-6 py-2 cursor-pointer btn whitespace-nowrap"
            onClick={() =>
              contractFunction.name
                ? onRequest(contractFunction.name)
                : console.log("Clicked")
            }
          >
            <>{link.length > 0 ? <a href={link}>{value}</a> : <> {value}</>}</>{" "}
          </div>
        )}
      </>
    </div>
  );
};

export default Button;
