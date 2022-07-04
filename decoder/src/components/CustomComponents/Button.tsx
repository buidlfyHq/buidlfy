import { FC, useState, useEffect } from "react";
import { ethers, providers, Contract, Signer } from "ethers";
import BuilderConfig from "config";
import { onLoad } from "../Utils/OnLoad";
import { onRequest } from "../Utils/OnRequest";
import ITexts from "interfaces/texts";
import { setValue } from "../Utils/SetValue";
import { Dialog } from "@headlessui/react";
import Web3Modal from "web3modal";
import { providerOptions } from "../ConnectWallet/providerOptions";
import "styles/Components.css";

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
  const [contract, setContract] = useState<Contract>();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (config.contract.abi !== [] && config.contract.address !== "") {
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

  const [show, setShow] = useState(false);
  const [provider, setProvider] = useState();
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
      const provider = await web3Modal.connect();
      const library: any = new ethers.providers.Web3Provider(provider);
      const accounts: any = await library.listAccounts();
      const network: any = await library.getNetwork();
      setProvider(provider);
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
    <main
      style={{ justifyContent: justifyContent }}
      className="flex items-center justify-center w-auto h-full px-6"
    >
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
                backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
              }}
              className="btn px-6 py-2 rounded w-48 cursor-pointer whitespace-nowrap"
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
                backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
              }}
              className="btn px-6 py-2 rounded w-48 cursor-pointer whitespace-nowrap"
              onClick={disconnect}
            >
              <>
                {link.length > 0 ? <a href={link}>{value}</a> : <> {value}</>}
              </>{" "}
            </div>
          )}
        </>
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
            backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
          }}
          className="btn px-6 py-2 rounded w-48 cursor-pointer whitespace-nowrap"
          onClick={() =>
            contractFunction.methodName ? onResponse() : console.log("Clicked")
          }
        >
          <>{link.length > 0 ? <a href={link}>{value}</a> : <> {value}</>}</>{" "}
        </div>
      )}
    </main>
  );
};

export default Button;
