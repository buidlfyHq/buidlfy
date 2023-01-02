import { ethers, providers, Contract, Signer } from "ethers";
// work in progress
export const onLoad = (config: any) => {
  let provider: providers.Web3Provider,
    signer: providers.Provider | Signer,
    contract: Contract;

  const { ethereum } = window as any;
  provider = new ethers.providers.Web3Provider(ethereum);
  signer = provider.getSigner();
  contract = new ethers.Contract(
    config.contract.address,
    config.contract.abi,
    signer
  );

  return contract;
};
