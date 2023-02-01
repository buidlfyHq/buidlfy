import { ethers } from "ethers";
import { switchNetwork } from "./switchNetwork";

export const connectWalletButton = async (
  setAccount: (account: string) => void
) => {
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
