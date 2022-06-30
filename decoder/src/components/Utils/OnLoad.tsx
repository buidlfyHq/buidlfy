import { ethers, providers, Contract, Signer } from "ethers";

export const onLoad = (config) => {
  let provider: providers.Web3Provider,
    signer: providers.Provider | Signer,
    contract: Contract;

  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  contract = new ethers.Contract(
    config.contract.address,
    config.contract.abi,
    signer
  );

  return contract;
};
