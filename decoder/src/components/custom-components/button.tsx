import { FC, useState, useEffect } from "react";
// import { Dialog } from "@headlessui/react";
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
}) => {
  const config = JSON.parse(BuilderConfig);
  const [contract, setContract] = useState<Contract>();
  const [account, setAccount] = useState<string>(null);

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
    setOutputValue(res ? res[0] : []);
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
      className="flex items-center justify-center w-auto h-full px-6"
    >
      {/* <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed flex items-center justify-center p-4 top-4 right-4">
          <Dialog.Panel className="max-w-sm p-4 mx-auto rounded bg-slate-700">
            <Dialog.Title>
            {transactionStatus === '' ?
            (<div className="flex items-center">
              <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
              <div className="mr-5 text-white">Transaction In Process...</div>
            </div>) 
            : (<div className="text-white break-all">{transactionStatus}</div>)
            } 
            </Dialog.Title>
          </Dialog.Panel>
        </div>
      </Dialog> */}
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
            backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
          }}
          className="btn px-6 py-2 rounded w-48 cursor-pointer whitespace-nowrap"
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
            fontSize: `${fontSize}px`,
            backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
          }}
          className="btn px-6 py-2 rounded w-48 cursor-pointer whitespace-nowrap"
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
