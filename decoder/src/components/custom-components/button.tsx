import { FC, useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { ethers, Contract } from "ethers";
import Web3Modal from "web3modal";
import BuilderConfig from "config";
import { providerOptions } from "config/provider-options";
import { onLoad } from "hooks/on-load";
import { onRequest } from "hooks/on-request";
import ITexts from "interfaces/texts";
import { MARGIN_VARIABLE } from "config/constants";
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
  borderColor,
  borderWidth,
}) => {
  const config = JSON.parse(BuilderConfig);
  const [contract, setContract] = useState<Contract>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] = useState<string>("");
  const [account, setAccount] = useState<string>(null);
  const [library, setLibrary] = useState(null);

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
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      await switchNetwork();
    } catch (error) {
      console.log(error);
    }
  };

  // switch to polygon testnet
  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${Number(80001).toString(16)}` }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${Number(80001).toString(16)}`,
                chainName: "Mumbai",
                nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC",
                  decimals: 18,
                },
                rpcUrls: [
                  "https://polygon-mumbai.g.alchemy.com/v2/i0JIYxK_EGtBX5aGG1apX4KuoH7j_7dq",
                ],
                blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
              },
            ],
          });
        } catch (addError) {
          throw addError;
        }
      }
    }
  };

  const refreshState = () => {
    setAccount(null);
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
      {connectWallet ? (
        <div
          style={{
            fontWeight: bold,
            fontStyle: italic,
            textDecoration: underline,
            border: `${borderWidth}px solid ${borderColor}`,
            borderImage: borderColor,
            display: "flex",
            justifyContent: "center",
            fontSize: `${fontSize}px`,
            borderRadius: `${borderRadius}px`,
            background: backgroundColor,
            margin: `${margin.marginTop * MARGIN_VARIABLE}px ${
              margin.marginRight * MARGIN_VARIABLE
            }px ${margin.marginBottom * MARGIN_VARIABLE}px ${
              margin.marginLeft * MARGIN_VARIABLE
            }px`,
            padding: `${padding.paddingTop}px ${padding.paddingRight}px ${padding.paddingBottom}px ${padding.paddingLeft}px`,
          }}
          className="btn btn-border rounded cursor-pointer whitespace-nowrap"
          onClick={!account ? connectWalletButton : disconnect}
        >
          <span
            style={{
              background: color,
              WebkitTextFillColor: "transparent",
            }}
            className="text-class"
          >
            {!account ? value : "Disconnect"}
          </span>
        </div>
      ) : (
        <div
          style={{
            fontWeight: bold,
            fontStyle: italic,
            textDecoration: underline,
            border: `${borderWidth}px solid ${borderColor}`,
            borderImage: borderColor,
            display: "flex",
            justifyContent: "center",
            borderRadius: `${borderRadius}px`,
            fontSize: `${fontSize}px`,
            background: backgroundColor,
            margin: `${margin.marginTop * MARGIN_VARIABLE}px ${
              margin.marginRight * MARGIN_VARIABLE
            }px ${margin.marginBottom * MARGIN_VARIABLE}px ${
              margin.marginLeft * MARGIN_VARIABLE
            }px`,
            padding: `${padding.paddingTop}px ${padding.paddingRight}px ${padding.paddingBottom}px ${padding.paddingLeft}px`,
          }}
          className="btn btn-border rounded cursor-pointer whitespace-nowrap"
          onClick={() =>
            contractFunction.methodName ? onResponse() : console.log("Clicked")
          }
        >
          <span
            style={{
              background: color,
              WebkitTextFillColor: "transparent",
            }}
            className="text-class"
          >
            {link.length > 0 ? <a href={link}>{value}</a> : <>{value}</>}
          </span>
        </div>
      )}
    </main>
  );
};

export default Button;
