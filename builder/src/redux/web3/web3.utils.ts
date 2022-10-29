import { BigNumber, Contract, ethers, Signer } from "ethers";
import marketplaceAbi from "assets/abis/Marketplace.json";
import erc1155Abi from "assets/abis/ERC1155.json";
import erc20Abi from "assets/abis/ERC20.json";
import config from "config";

const DEFAULT_ID = parseInt(config.network.DEFAULT_NETWORK.chainId);

export const networks = {
  5: {
    chainId: `0x${Number(5).toString(16)}`,
    chainName: "goerli",
  },
  80001: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "mumbai",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: [
      "https://polygon-mumbai.g.alchemy.com/v2/i0JIYxK_EGtBX5aGG1apX4KuoH7j_7dq",
    ],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
  137: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "matic",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mainnet.maticvigil.com/"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
};

export const addresses = {
  5: {
    spheronErc1155: "0xa69374D7371DF89192F05C7b61a945f834bF2593",
    marketplace: "0x3b60689246D50eAeBA251cd6e12A3D0FfE206A00",
    usdc: "0x66BC3bA160eA851313A1c00bdA825AD87F5f4091",
  },
  80001: {
    spheronErc1155: "0xa69374D7371DF89192F05C7b61a945f834bF2593",
    marketplace: "0x3b60689246D50eAeBA251cd6e12A3D0FfE206A00",
    usdc: "0x66BC3bA160eA851313A1c00bdA825AD87F5f4091",
  },
  137: {
    spheronErc1155: "0xa69374D7371DF89192F05C7b61a945f834bF2593",
    marketplace: "0x3b60689246D50eAeBA251cd6e12A3D0FfE206A00",
    usdc: "0x66BC3bA160eA851313A1c00bdA825AD87F5f4091",
  },
};

export const abis = {
  erc1155: erc1155Abi,
  erc20: erc20Abi,
  marketplace: marketplaceAbi,
};

export const TOKENS_COUNT_ON_MINT = ethers.BigNumber.from(
  "1000000000000000000"
);

export const getMarketplaceContract = (signer: Signer): Contract => {
  const marketplaceContract = new Contract(
    addresses[DEFAULT_ID].marketplace,
    abis.marketplace,
    signer
  );
  return marketplaceContract;
};

export const getERC20Contract = (
  tokenAddress: string,
  signer: Signer
): Contract => {
  const erc20Contract = new Contract(tokenAddress, abis.erc20, signer);
  return erc20Contract;
};

export const getERC1155Contract = (signer: Signer): Contract => {
  const erc1155Contract = new Contract(
    addresses[DEFAULT_ID].spheronErc1155,
    abis.erc1155,
    signer
  );
  return erc1155Contract;
};

export const approveERC20Token = async (
  amount: string | BigNumber,
  signer: Signer
): Promise<any> => {
  const erc20Contract = getERC20Contract(addresses[DEFAULT_ID].usdc, signer);
  const tx = await erc20Contract.approve(
    addresses[DEFAULT_ID].marketplace,
    amount
  );

  return await tx.wait();
};

export const approveERC1155Token = async (signer: Signer): Promise<any> => {
  const erc1155Contract = getERC1155Contract(signer);
  const tx = await erc1155Contract.setApprovalForAll(
    addresses[DEFAULT_ID].marketplace,
    true
  );

  return await tx.wait();
};

export const isApprovedForAll = async (
  signer: Signer,
  userAddress: string
): Promise<any> => {
  const erc1155Contract = getERC1155Contract(signer);
  const tx = await erc1155Contract.isApprovedForAll(
    userAddress,
    addresses[DEFAULT_ID].marketplace
  );

  return await tx;
};

export const getSigner = () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  return signer;
};
