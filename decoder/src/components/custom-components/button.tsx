import { FC, useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { ethers, Contract } from "ethers";
import Web3Modal from "web3modal";
import BuilderConfig from "config";
import { onLoad } from "hooks/on-load";
import { onRequest } from "hooks/on-request";
import { providerOptions } from "config/provider-options";
import ITexts from "interfaces/texts";
import "styles/components.css";

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
  outputValue,
  setOutputValue,
  connectWallet,
  borderRadius,
  margin,
  padding,
}) => {
  const config = JSON.parse(BuilderConfig);
  const [contract, setContract] = useState<Contract>();
  const [account, setAccount] = useState<string>(null);
  // All are returning any, will have to switch to typescript ether
  const [show, setShow] = useState<any>(false);
  const [provider, setProvider] = useState<any>();
  const [library, setLibrary] = useState<any>();
  const [signature, setSignature] = useState<any>("");
  const [error, setError] = useState<any>("");
  const [chainId, setChainId] = useState<any>();
  const [network, setNetwork] = useState<any>();
  const [message, setMessage] = useState<any>("");
  const [verified, setVerified] = useState<any>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] = useState<string>("");

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
      outputValue,
      setIsOpen,
      setTransactionStatus
    );
    setOutputValue(res ? res[0] : []);
  };

  const connectWalletButton = async () => {
    try {
      const provider = await web3Modal.connect();
      const library: any = new ethers.providers.Web3Provider(provider); // required
      const accounts: any = await library.listAccounts(); // required
      const network: any = await library.getNetwork(); // required
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
      className="flex items-center justify-center w-auto h-full"
    >
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed flex items-center justify-center p-4 top-4 right-4">
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
      {connectWallet === "on" ? (
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
            backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
            margin: `${margin.marginTop}px ${margin.marginRight}px ${margin.marginBottom}px ${margin.marginLeft}px`,
            padding: `${padding.paddingTop}px ${padding.paddingRight}px ${padding.paddingBottom}px ${padding.paddingLeft}px`,
          }}
          className="btn rounded w-48 cursor-pointer whitespace-nowrap"
          onClick={!account ? connectWalletButton : disconnect}
        >
          {!account ? value : "Disconnect"}
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
            borderRadius: `${borderRadius}px`,
            fontSize: `${fontSize}px`,
            backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
            margin: `${margin.marginTop}px ${margin.marginRight}px ${margin.marginBottom}px ${margin.marginLeft}px`,
            padding: `${padding.paddingTop}px ${padding.paddingRight}px ${padding.paddingBottom}px ${padding.paddingLeft}px`,
          }}
          className="btn rounded w-48 cursor-pointer whitespace-nowrap"
          onClick={() =>
            contractFunction.methodName ? onResponse() : console.log("Clicked")
          }
        >
          {link.length > 0 ? <a href={link}>{value}</a> : <>{value}</>}
        </div>
      )}
    </main>
  );
};

export default Button;
