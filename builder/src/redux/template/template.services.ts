import { BigNumber } from "ethers";
import {
  addresses,
  approveERC20Token,
  getERC1155Contract,
  getMarketplaceContract,
  getSigner,
} from "redux/web3/web3.utils";

export const initiateTransactionService = async (
  listingId: BigNumber,
  buyoutPricePerToken: BigNumber
) => {
  try {
    const signer = getSigner();
    const marketplaceContract = getMarketplaceContract(signer);
    await approveERC20Token(buyoutPricePerToken, signer);
    const address = await signer.getAddress();

    const tx = await marketplaceContract.buy(
      listingId,
      address,
      1,
      addresses.usdc,
      buyoutPricePerToken,
      {
        gasLimit: 3000000,
      }
    );

    // tx.hash -> before transaction is complete

    // transaction is complete
    const receipt = await tx.wait();
    return { error: false, errorMessage: "", receipt };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error in transaction --> ", error);
    return { error: true, errorMessage: (error as Error).message, receipt: "" };
  }
};

export const mintTemplateService = async (uri: string) => {
  try {
    const signer = getSigner();
    const erc1155Contract = getERC1155Contract(signer);
    const tx = await erc1155Contract.mint(uri);
    const receipt = await tx.wait();
    return { error: false, errorMessage: "", receipt };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in mintTemplateService --> ", error);
    return { error: true, errorMessage: (error as Error).message, receipt: "" };
  }
};
