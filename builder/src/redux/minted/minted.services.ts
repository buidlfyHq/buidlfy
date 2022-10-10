import { BigNumber } from "ethers";
import {
  addresses,
  approveERC1155Token,
  getMarketplaceContract,
  getSigner,
  TOKENS_COUNT_ON_MINT,
} from "redux/web3/web3.utils";
import { getCurrentTime } from "./minted.utils";

export const getOwnedTemplatesService = async (): Promise<any> => {
  try {
    const allTemplates = await (
      await fetch(
        "https://deep-index.moralis.io/api/v2/0xd6c72729EbCC987b171eCF074993ce3C4e34b9f0/nft?chain=goerli&format=decimal&token_addresses=0xa69374d7371df89192f05c7b61a945f834bf2593",
        {
          method: "GET",
          headers: {
            "X-API-Key": "test",
            accept: "application/json",
          },
        }
      )
    ).json();
    
    return { error: false, errorMessage: "", templates: allTemplates.result };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in getOwnedTemplatesService --> ", error);
    return { error: true, errorMessage: (error as Error).message, receipt: "" };
  }
};

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
