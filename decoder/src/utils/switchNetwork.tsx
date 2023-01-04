import { networks } from "config/network";
import BuilderConfig from "config";

export const switchNetwork = async (networkId?: number) => {
  const config = JSON.parse(BuilderConfig);
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
