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
    await provider.send('eth_requestAccounts', []); // requesting access to accounts
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    return { error: false, errorMessage: "", address };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error in connectWalletService --> ", error);
    return {
      error: true,
      errorMessage: (error as Error).message,
      address: "",
    };
  }
};

export const getTokenBalanceService = async (walletAddress: string) => {
  try {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const walletBalance = await provider.getBalance(walletAddress);
    const balanceInEth = ethers.utils.formatEther(walletBalance);

    return { error: false, errorMessage: "", balance: balanceInEth };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in getTokenBalanceService --> ", error);
    return { error: true, errorMessage: (error as Error).message, balance: 0 };
  }
};
