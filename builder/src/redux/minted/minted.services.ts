import { BigNumber } from "ethers";
import {
  addresses,
  approveERC1155Token,
  getMarketplaceContract,
  getSigner,
  TOKENS_COUNT_ON_MINT,
} from "redux/web3/web3.utils";
import { getCurrentTime } from "./minted.utils";

export const createListingService = async (
  tokenId: number,
  buyoutPricePerToken: BigNumber
): Promise<any> => {
  try {
    const signer = getSigner();
    const marketplaceContract = getMarketplaceContract(signer);
    // Check for approval if yes, then don't call approve otherwise call approve
    await approveERC1155Token(signer);
    const tx = await marketplaceContract.createListing(
      [
        addresses.spheronErc1155,
        tokenId,
        getCurrentTime(),
        getCurrentTime(),
        TOKENS_COUNT_ON_MINT,
        addresses.usdc,
        buyoutPricePerToken,
        buyoutPricePerToken,
        0, // Always should be 0 cause Direct Listing
      ],
      {
        gasLimit: 3000000,
      }
    );
    console.log("tx: ", tx);
    const receipt = await tx.wait();
    return { error: false, errorMessage: "", receipt };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in createListingService --> ", error);
    return { error: true, errorMessage: (error as Error).message, receipt: "" };
  }
};