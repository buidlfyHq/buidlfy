import { FC, useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { ethers, Contract } from "ethers";
import BuilderConfig, { OracleContractAddress } from "config";
import { networks } from "config/network";
import { onLoad } from "hooks/on-load";
import { onRequest } from "hooks/on-request";
import { gradientCheck } from "utils/gradient-check";
import ITexts from "interfaces/texts";
import OracleAbi from "assets/abis/Oracle.json";
import "styles/components.css";

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
  const [networkSwitch, setNetworkSwitch] = useState<boolean>(false);

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

  const connectWalletButton = async () => {
    try {
      const { ethereum } = window as any;

      if (!ethereum) {
        return {
          error: true,
          errorMessage: "MetaMask not installed, please install!",
          account: "",
        };
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.send("eth_requestAccounts", []); // requesting access to accounts
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      await switchNetwork();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error in connectWalletService --> ", error);
    }
  };

  const switchNetwork = async (networkId?: number) => {
    // NOTE: polygon mumbai testnet by default
    const currentNetwork =
      networks[Number(config.contract.network) || networkId || 80001];

    try {
      await (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: currentNetwork.chainId }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await (window as any).ethereum.request({
            method: "wallet_addEthereumChain",
            params: [currentNetwork],
          });
          return { error: false, errorMessage: "" };
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log("Error in changeNetworkService --> ", error);
        }
      }
      // eslint-disable-next-line no-console
      console.log("Error in changeNetworkService --> ", switchError);
    }
  };

  const disconnect = () => {
    setAccount(null);
  };

  const onResponse = async () => {
    const { ethereum } = window as any;
    const provider = new ethers.providers.Web3Provider(ethereum, "any");
    const { chainId } = await provider.getNetwork();
    if (oracleFunction) {
      if (chainId !== 134) {
        setNetworkSwitch(true);
      }

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
      if (chainId !== Number(config.contract.network)) {
        setNetworkSwitch(true);
      }
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

  const onSwitchNetwork = async () => {
    if (oracleFunction) {
      await switchNetwork(134);
    } else {
      await switchNetwork();
    }
    window.location.reload();
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
      <Dialog
        className="relative z-50"
        open={networkSwitch}
        onClose={() => setNetworkSwitch(false)}
      >
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
          aria-hidden="true"
        />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full">
            <Dialog.Panel className="rounded-[24px] py-8 px-8 bg-white rounded-[24px]">
              <div className="mt-2">
                <p className="text-md text-gray-500">
                  You need to switch netowrk to execute this transaction.
                </p>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={onSwitchNetwork}
                >
                  Switch Network
                </button>
              </div>
            </Dialog.Panel>
          </div>
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
            contractFunction?.methodName || oracleFunction?.methodName
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
