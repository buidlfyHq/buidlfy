import { BigNumber, Contract, ethers, Signer } from "ethers";
import marketplaceAbi from "assets/abis/Marketplace.json";
import erc1155Abi from "assets/abis/ERC1155.json";
import erc20Abi from "assets/abis/ERC20.json";

export const addresses = {
  spheronErc1155: "0xa69374D7371DF89192F05C7b61a945f834bF2593",
  marketplace: "0x3b60689246D50eAeBA251cd6e12A3D0FfE206A00",
  usdc: "0x66BC3bA160eA851313A1c00bdA825AD87F5f4091",
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
    addresses.marketplace,
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
    addresses.spheronErc1155,
    abis.erc1155,
    signer
  );
  return erc1155Contract;
};

export const approveERC20Token = async (
  amount: string | BigNumber,
  signer: Signer
): Promise<any> => {
  const erc20Contract = getERC20Contract(addresses.usdc, signer);
  const tx = await erc20Contract.approve(addresses.marketplace, amount);

  return await tx.wait();
};
