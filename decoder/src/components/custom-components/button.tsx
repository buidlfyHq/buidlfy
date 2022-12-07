import { FC, useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { ethers, Contract } from "ethers";
import Web3Modal from "web3modal";
import BuilderConfig, { OracleContractAddress } from "config";
import { providerOptions } from "config/provider-options";
import { networks } from "config/network";
import { onLoad } from "hooks/on-load";
import { onRequest } from "hooks/on-request";
import { gradientCheck } from "utils/gradient-check";
import ITexts from "interfaces/texts";
import OracleAbi from "assets/abis/Oracle.json";
import "styles/components.css";

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});

const Button: FC<ITexts> = ({
  fontWeight,
  italic,
  underline,
  color,
  justifyContent,
  fontSize,
  value,
  link,
  backgroundColor,
  contractFunction,
  oracleFunction,
  inputValue,
  outputValue,
  setOutputValue,
  connectWallet,
  borderRadius,
  margin,
  padding,
  borderColor,
  borderWidth,
  fontFamily,
}) => {
  const config = JSON.parse(BuilderConfig);
  const [contract, setContract] = useState<Contract>();
  const [oracleContract, setOracleContract] = useState<Contract>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] = useState<string>("");
  const [account, setAccount] = useState<string>(null);
  const [library, setLibrary] = useState(null);

  useEffect(() => {
    if (config.contract.abi[0] && config.contract.address !== "") {
      setContract(onLoad(config));
    }
    if (config.oracle !== null) {
      const modifiedConfig = {
        contract: {
          address: OracleContractAddress,
          abi: OracleAbi,
        },
      };
      setOracleContract(onLoad(modifiedConfig));
    }
  }, []); // eslint-disable-line

  const onResponse = async () => {
    if (oracleFunction) {
      const res = await onRequest(
        oracleFunction.methodName,
        oracleFunction,
        oracleContract,
        [
          {
            id: oracleFunction.inputs[0].id,
            value: oracleFunction.inputs[0].id,
          },
        ],
        [],
        () => {},
        () => {}
      );
      setOutputValue(res ? res[0] : []);
    } else {
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
    }
  };

  const connectWalletButton = async () => {
    try {
      const provider = await web3Modal.connect();
      const library: any = new ethers.providers.Web3Provider(provider, "any"); // required

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
    const currentNetwork = networks[Number(config.contract.network)];
    const addCurrentNetwork = {
      chainId: `0x${Number(currentNetwork.chainId).toString(16)}`,
      chainName: currentNetwork.chainName,
      nativeCurrency: {
        name: currentNetwork.nativeCurrency.name,
        symbol: currentNetwork.nativeCurrency.symbol,
        decimals: currentNetwork.nativeCurrency.decimals,
      },
      rpcUrls: currentNetwork.rpcUrls,
      blockExplorerUrls: currentNetwork.blockExplorerUrls,
    };
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [
          { chainId: `0x${Number(currentNetwork.chainId).toString(16)}` },
        ],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await library?.provider.request({
            method: "wallet_addEthereumChain",
            params: [addCurrentNetwork],
          });
        } catch (addError) {
          throw addError;
        }
      }
    }
  };
  useEffect(() => {
    switchNetwork();
  }, [account, library]);
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
            fontWeight: fontWeight,
            fontStyle: italic,
            textDecoration: underline,
            border: `${borderWidth}px solid ${borderColor}`,
            borderImage: borderColor,
            display: "flex",
            justifyContent: "center",
            fontSize: `${fontSize}px`,
            borderRadius: `${borderRadius}px`,
            background: backgroundColor,
            fontFamily: fontFamily,
            margin: `${margin.marginTop}px ${margin.marginRight}px ${margin.marginBottom}px ${margin.marginLeft}px`,
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
            fontWeight: fontWeight,
            fontStyle: italic,
            textDecoration: underline,
            border: `${borderWidth}px solid ${borderColor}`,
            borderImage: borderColor,
            display: "flex",
            justifyContent: "center",
            borderRadius: `${borderRadius}px`,
            fontSize: `${fontSize}px`,
            background: backgroundColor,
            fontFamily: fontFamily,
            margin: `${margin.marginTop}px ${margin.marginRight}px ${margin.marginBottom}px ${margin.marginLeft}px`,
            padding: `${padding.paddingTop}px ${padding.paddingRight}px ${padding.paddingBottom}px ${padding.paddingLeft}px`,
          }}
          className="btn btn-border rounded cursor-pointer whitespace-nowrap"
          onClick={() =>
            contractFunction.methodName || oracleFunction.methodName
              ? onResponse()
              : console.log("No method attached to this button.")
          }
        >
          <span
            style={{
              background: color,
              WebkitTextFillColor: "transparent",
            }}
            className="text-class"
          >
            {link.length > 0 ? (
              <a
                href={link}
                style={{
                  background: gradientCheck(color, true),
                  WebkitTextFillColor: gradientCheck(color, false),
                  textDecoration: underline,
                  textDecorationColor: color,
                }}
                rel="noreferrer"
                target="_blank"
              >
                {value}
              </a>
            ) : (
              <>{value}</>
            )}
          </span>
        </div>
      )}
    </main>
  );
};

export default Button;
