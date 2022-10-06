import { BigNumber } from "ethers";
import request, { gql } from "graphql-request";
import config from "config";
import {
  addresses,
  approveERC1155Token,
  approveERC20Token,
  getERC1155Contract,
  getMarketplaceContract,
  getSigner,
  TOKENS_COUNT_ON_MINT,
} from "redux/web3/web3.utils";
import { getCurrentTime } from "./template.utils";

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

export const getListedTemplatesService = async () => {
  // Removed: isAccepted from query
  try {
    const query = gql`
      {
        listings {
          id
          token {
            id
            contract
            identifier
            uri
          }
          lister
          listing_listingId
          listing_tokenOwner
          listing_assetContract
          listing_tokenId
          listing_startTime
          listing_endTime
          listing_quantity
          listing_currency
          listing_buyoutPricePerToken
          listing_tokenType
          listing_listingType
          isAccepted
        }
      }
    `;

    const res = await request(config.template.TEMPLATE_GRAPHQL_URL, query);
    return { error: false, errorMessage: "", listings: res.listings };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error in fetching --> ", error);
    return {
      error: true,
      errorMessage: (error as Error).message,
      listings: null,
    };
  }
};

export const getOwnedTemplatesService = async (address: string) => {
  // Removed: isAccepted from query
  try {
    const query = gql`
      {
        listings(where: { listing_tokenOwner: "${address.toLowerCase()}" }) {
          id
          token {
            id
            contract
            identifier
            uri
          }
          lister
          listing_listingId
          listing_tokenOwner
          listing_assetContract
          listing_tokenId
          listing_startTime
          listing_endTime
          listing_quantity
          listing_currency
          listing_buyoutPricePerToken
          listing_tokenType
          listing_listingType
          isAccepted
        }
      }
    `;

    const res = await request(config.template.TEMPLATE_GRAPHQL_URL, query);
    return { error: false, errorMessage: "", listings: res.listings };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error in fetching --> ", error);
    return {
      error: true,
      errorMessage: (error as Error).message,
      listings: null,
    };
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

// Filter unlisted templates
// {
//   listings(where: { isAccepted: true, listing_tokenOwner: "${address.toLowerCase()}, token: {id: "$(token_id)"} }) {
//     id
//     token {
//       id
//       contract
//       identifier
//       uri
//     }
//     lister
//     listing_listingId
//     listing_tokenOwner
//     listing_assetContract
//     listing_tokenId
//     listing_startTime
//     listing_endTime
//     listing_quantity
//     listing_currency
//     listing_buyoutPricePerToken
//     listing_tokenType
//     listing_listingType
//     isAccepted
//   }
// }
