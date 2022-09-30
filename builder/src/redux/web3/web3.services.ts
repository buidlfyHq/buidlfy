import { ethers } from "ethers";

export const connectWalletService = async () => {
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
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    return { error: false, errorMessage: "", account: address };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error in connectWalletService --> ", error);
    return { error: true, errorMessage: (error as Error).message, account: "" };
  }
};
