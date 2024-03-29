import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Dialog } from '@headlessui/react';
import { ethers, Contract } from 'ethers';
import config from 'config';
import { networks } from 'config/network';
import { onLoad } from 'hooks/on-load';
import { onRequest } from 'hooks/on-request';
import { gradientCheck } from 'utils/gradient-check';
import { IRootState } from 'redux/root-state.interface';
import { IText } from 'redux/workspace/workspace.interfaces';
import OracleAbi from 'assets/abis/Oracle.json';
import 'styles/components.css';

const PreviewButton: FC<IText> = ({
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
  const contractDetails = useSelector((state: IRootState) => state.contract.contractDetails);
  // const configuration = JSON.parse(BuilderConfig);
  const [contract, setContract] = useState<Contract>();
  const [oracleContract, setOracleContract] = useState<Contract>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] = useState<string>('');
  const [account, setAccount] = useState<string>(null);
  const [networkSwitch, setNetworkSwitch] = useState<boolean>(false);

  useEffect(() => {
    if (JSON.parse(JSON.stringify(contractDetails.abi))[0] && contractDetails.address !== '') {
      setContract(onLoad(contractDetails));
    }
    if (oracleFunction && oracleFunction !== null) {
      const modifiedConfig = {
        address: config.address.oracle,
        abi: JSON.stringify(OracleAbi),
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
          errorMessage: 'MetaMask not installed, please install!',
          account: '',
        };
      }

      const provider = new ethers.providers.Web3Provider(ethereum, 'any');
      await provider.send('eth_requestAccounts', []); // requesting access to accounts
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      await switchNetwork();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error in connectWalletService --> ', error);
    }
  };

  const switchNetwork = async (networkId?: number) => {
    // NOTE: polygon mumbai testnet by default
    const currentNetwork = networks[Number(contractDetails.network) || networkId || 80001];

    try {
      await (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: currentNetwork.chainId }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await (window as any).ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [currentNetwork],
          });
          return { error: false, errorMessage: '' };
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error in changeNetworkService --> ', error);
        }
      }
      // eslint-disable-next-line no-console
      console.error('Error in changeNetworkService --> ', switchError);
    }
  };

  const disconnect = () => {
    setAccount(null);
  };

  const onResponse = async () => {
    const { ethereum } = window as any;
    const provider = new ethers.providers.Web3Provider(ethereum, 'any');
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
        () => {},
      );

      setOutputValue(res ? res[0] : []);
    } else {
      if (chainId !== Number(contractDetails.network)) {
        setNetworkSwitch(true);
      }
      const res = await onRequest(contractFunction.methodName, contractFunction, contract, inputValue, outputValue, setIsOpen, setTransactionStatus);
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

  const TransactionStatusDialog = () => (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed flex items-center justify-center p-4 top-4 right-4">
        <Dialog.Panel className="max-w-sm p-4 mx-auto rounded bg-slate-700">
          <Dialog.Title>
            {transactionStatus === '' ? (
              <div className="flex items-center">
                <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="mr-5 text-white">Transaction In Process...</div>
              </div>
            ) : (
              <div className="text-white break-all">{transactionStatus}</div>
            )}
          </Dialog.Title>
        </Dialog.Panel>
      </div>
    </Dialog>
  );

  const SwitchNetworkDialog = () => (
    <Dialog className="relative z-50" open={networkSwitch} onClose={() => setNetworkSwitch(false)}>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px]" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full">
          <Dialog.Panel className="rounded-[24px] py-5 px-5 bg-white rounded flex flex-row justify-start items-center gap-6">
            <div className="flex flex-col items-center w-[450px] h-[130px] relative">
              <p className="mt-4 font-semibold">You need to switch netowrk to execute this transaction.</p>
              <div className="flex justify-end w-full mt-8 mr-2">
                <button
                  className="bordered-button py-2 px-7 my-2 ml-3 text-[14px] text-[#855FD8] font[500] rounded-[10px] whitespace-nowrap"
                  onClick={() => setNetworkSwitch(false)}
                >
                  Cancel
                </button>
                <button
                  onClick={onSwitchNetwork}
                  className="py-2 px-7 my-2 ml-3 font-[500] text-[14px] text-white rounded-[10px] connect-wallet-button whitespace-nowrap add-btn"
                >
                  Switch Network
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );

  return (
    <main style={{ justifyContent: justifyContent }} className="flex items-center justify-center w-auto h-full">
      {TransactionStatusDialog()}
      {SwitchNetworkDialog()}
      {connectWallet ? (
        <div
          style={{
            fontWeight: fontWeight,
            fontStyle: italic,
            textDecoration: underline,
            border: `${borderWidth}px solid ${borderColor}`,
            borderImage: borderColor,
            display: 'flex',
            justifyContent: 'center',
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
              WebkitTextFillColor: 'transparent',
            }}
            className="text-class"
          >
            {!account ? value : 'Disconnect'}
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
            display: 'flex',
            justifyContent: 'center',
            borderRadius: `${borderRadius}px`,
            fontSize: `${fontSize}px`,
            background: backgroundColor,
            fontFamily: fontFamily,
            margin: `${margin.marginTop}px ${margin.marginRight}px ${margin.marginBottom}px ${margin.marginLeft}px`,
            padding: `${padding.paddingTop}px ${padding.paddingRight}px ${padding.paddingBottom}px ${padding.paddingLeft}px`,
          }}
          className="btn btn-border rounded cursor-pointer whitespace-nowrap"
          onClick={() =>
            contractFunction?.methodName || oracleFunction?.methodName ? onResponse() : console.log('No method attached to this button.')
          }
        >
          <span
            style={{
              background: color,
              WebkitTextFillColor: 'transparent',
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

export default PreviewButton;
