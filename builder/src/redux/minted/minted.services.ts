import { BigNumber } from "ethers";
import request, { gql } from "graphql-request";
import config from "config";
import {
  approveERC1155Token,
  getMarketplaceContract,
  getSigner,
  isApprovedForAll,
  TOKENS_COUNT_ON_MINT,
} from "redux/web3/web3.utils";
import { getCurrentTime } from "./minted.utils";
import { formatList } from "redux/template/template.services";
import { IWorkspaceElement } from "redux/workspace/workspace.interfaces";

export const approveListingService = async (address: string): Promise<any> => {
  try {
    const signer = getSigner();
    const isApproved = await isApprovedForAll(signer, address);
    if (!isApproved) {
      await approveERC1155Token(signer);
    }

    return { error: false, errorMessage: "" };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error in approveListingService --> ", error);
    return {
      error: true,
      errorMessage: (error as Error).message,
    };
  }
};

export const createListingService = async (
  tokenId: string,
  buyoutPricePerToken: BigNumber
): Promise<any> => {
  try {
    const signer = getSigner();
    const marketplaceContract = getMarketplaceContract(signer);
    const token_id = parseInt(tokenId);
    const tx = await marketplaceContract.createListing(
      [
        config.address.buidlfyErc1155,
        token_id,
        getCurrentTime(),
        getCurrentTime(),
        TOKENS_COUNT_ON_MINT,
        config.address.usdt,
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

export const getOwnedTemplatesService = async (
  address: string
): Promise<any> => {
  try {
    const allTemplates = await (
      await fetch(
        `https://deep-index.moralis.io/api/v2/${address}/nft?chain=${config.network.DEFAULT_NETWORK.chainName}&format=decimal&token_addresses=${config.address.buidlfyErc1155}`,
        {
          method: "GET",
          headers: {
            "X-API-Key": config.template.MORALIS_X_API_KEY,
            accept: "application/json",
          },
        }
      )
    ).json();

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
