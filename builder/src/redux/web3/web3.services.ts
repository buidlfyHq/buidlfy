import { ethers } from "ethers";
import { networks } from "./web3.utils";

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
    console.log("Error in connectWalletService --> ", error);
    return { error: true, errorMessage: (error as Error).message, account: "" };
  }
};

export const changeNetworkService = async (chainId: number) => {
  try {
    const network = { ...networks[chainId] };
    delete network.logo;
    delete network.networkId;
    await (window as any).ethereum.request({
      method: "wallet_addEthereumChain",
      params: [network],
    });
    return { error: false, errorMessage: "" };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in changeNetworkService --> ", error);
    return { error: true, errorMessage: (error as Error).message };
  }
};

export const getTokenBalanceService = async (
  walletAddress: string,
  selectedToken,
  selectedNetwork
) => {
  try {
    // const provider = new ethers.providers.Web3Provider(
    //   (window as any).ethereum
    // );
    // const vendor = new paymentLib.Vendor(
    //   provider,
    //   provider.getSigner(),
    //   getNetworkConfig(selectedNetwork.chainName).BICONOMY_KEY
    // );
    // const subscription = new paymentLib.Subscription(
    //   vendor
    // );

    // subscription.subscriptionAt(
    //   getNetworkConfig(selectedNetwork.chainName)
    //     ?.SUBSCRIPTION_CONTRACT_ADDRESS as string, // subscriptionPayment contact
    //   getNetworkConfig(selectedNetwork.chainName)
    //     ?.SUBSCRIPTION_DATA_CONTRACT_ADDRESS as string, // subscriptionData contract
    //   selectedToken.address, // argo token
    //   selectedToken.decimals // decimals
    // );
    // const balance = await subscription.getUserBalance(walletAddress);
    // return { error: false, errorMessage: "", balance };
  } catch (error) {
    // eslint-disable-next-line no-console
    // console.log('Error in getTokenBalanceService --> ', error);
    // return { error: true, errorMessage: (error as Error).message, balance: 0 };
  }
};
