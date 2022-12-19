import { ethers, providers, Contract, Signer } from 'ethers';
// work in progress
export const onLoad = (contractDetails: any) => {
  let provider: providers.Web3Provider, signer: providers.Provider | Signer, contract: Contract;

  const { ethereum } = window as any;
  provider = new ethers.providers.Web3Provider(ethereum);
  signer = provider.getSigner();
  contract = new ethers.Contract(contractDetails.address, JSON.parse(contractDetails.abi), signer);

  return contract;
};
