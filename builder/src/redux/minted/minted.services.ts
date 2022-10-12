import { BigNumber } from "ethers";
import request, { gql } from "graphql-request";
import config from "config";
import {
  addresses,
  approveERC1155Token,
  getMarketplaceContract,
  getSigner,
  TOKENS_COUNT_ON_MINT,
} from "redux/web3/web3.utils";
import { IWorkspaceElement } from "redux/workspace/workspace.interfaces";
import { getCurrentTime } from "./minted.utils";

export const createListingService = async (
  tokenId: string,
  buyoutPricePerToken: BigNumber
): Promise<any> => {
  try {
    const signer = getSigner();
    const marketplaceContract = getMarketplaceContract(signer);
    const token_id = parseInt(tokenId);
    // Check for approval if yes, then don't call approve otherwise call approve
    await approveERC1155Token(signer);
    const tx = await marketplaceContract.createListing(
      [
        addresses.spheronErc1155,
        token_id,
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

export const formatList = async (listings) => {
  let templates = (
    await Promise.all(
      listings.map(async (template: any) => {
        if (
          template.listing_assetContract.toLowerCase() ===
          addresses.spheronErc1155.toLowerCase()
        ) {
          try {
            if (template.token.uri) {
              const templateObj: IWorkspaceElement = await (
                await fetch(template.token.uri)
              ).json();

              return { ...template, ...templateObj };
            } else {
              return { ...template };
            }
          } catch (error) {
            console.error("error: ", error);
          }
        }
      })
    )
  ).filter((template: any) => template !== undefined);

  return templates;
};

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

    // filtering out templates without images
    let templates = (
      await Promise.all(
        allTemplates.result.map(async (template: any) => {
          try {
            if (template.token_uri) {
              const templateObj: IWorkspaceElement = await (
                await fetch(template.token_uri)
              ).json();

              return { ...template, ...templateObj };
            } else {
              return { ...template };
            }
          } catch (error) {
            console.error("error: ", error);
          }
        })
      )
    ).filter((template: any) => template !== undefined);

    return { error: false, errorMessage: "", templates };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in getOwnedTemplatesService --> ", error);
    return { error: true, errorMessage: (error as Error).message, receipt: "" };
  }
};

// available for buying
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
    const listings = await formatList(res.listings);
    return { error: false, errorMessage: "", listings };
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

export const getOwnedReviewTemplatesService = async (address: string) => {
  try {
    const query = gql`
      {
        listings(where: { listing_tokenOwner: "${address.toLowerCase()}", isAccepted: false }) {
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
    const listings = await formatList(res.listings);
    return { error: false, errorMessage: "", listings };
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

export const getOwnedListedTemplatesService = async (address: string) => {
  // Removed: isAccepted from query
  try {
    const query = gql`
      {
        listings(where: { listing_tokenOwner: "${address.toLowerCase()}", isAccepted: true }) {
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
    const listings = await formatList(res.listings);
    return { error: false, errorMessage: "", listings };
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
