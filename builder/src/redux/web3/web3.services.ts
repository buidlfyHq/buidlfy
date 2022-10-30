import { ethers } from "ethers";
import config from "config";
import { addresses, getERC20Contract, getSigner } from "./web3.utils";

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
    await provider.send("eth_requestAccounts", []); // requesting access to accounts
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

export const changeNetworkService = async () => {
  try {
    await (window as any).ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: config.network.DEFAULT_NETWORK.chainId }],
    });
    return { error: false, errorMessage: "" };
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await (window as any).ethereum.request({
          method: "wallet_addEthereumChain",
          params: [config.network.DEFAULT_NETWORK],
        });
        return { error: false, errorMessage: "" };
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log("Error in changeNetworkService --> ", error);
        return { error: true, errorMessage: (error as Error).message };
      }
    }
    // eslint-disable-next-line no-console
    console.log("Error in changeNetworkService --> ", switchError);
    return { error: true, errorMessage: (switchError as Error).message };
  }
};

export const getTokenBalanceService = async (walletAddress: string) => {
  try {
    const signer = getSigner();
    const defaultId = parseInt(config.network.DEFAULT_NETWORK.chainId);
    const erc20Contract = getERC20Contract(
      addresses[defaultId].usdc,
      signer
    );

    const walletBalance = await erc20Contract.balanceOf(walletAddress);
    const balanceInEth = ethers.utils.formatEther(walletBalance);

    return { error: false, errorMessage: "", balance: balanceInEth };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in getTokenBalanceService --> ", error);
    return { error: true, errorMessage: (error as Error).message, balance: 0 };
  }
};
