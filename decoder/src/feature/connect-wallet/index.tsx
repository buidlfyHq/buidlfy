import { useState, FC } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "./provider-options";

interface ButtonProps {
  text: string;
  account: any;
  setAccount: any;
}

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});

const ConnectWallet: FC<ButtonProps> = ({
  text,
  account,
  setAccount,
}: ButtonProps) => {
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

  const connectWallet = async () => {
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
    <>
      {!account ? (
        <>
          <button
            onClick={connectWallet}
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
          >
            {text}
          </button>
        </>
      ) : (
        <>
          <button
            onClick={disconnect}
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Disconnect
          </button>
        </>
      )}
    </>
  );
};

export default ConnectWallet;
