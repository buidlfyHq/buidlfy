import { BigNumber } from "ethers";
import request, { gql } from "graphql-request";
import config from "config";
import {
  addresses,
  approveERC20Token,
  getERC1155Contract,
  getMarketplaceContract,
  getSigner,
} from "redux/web3/web3.utils";
import { IWorkspaceElement } from "redux/workspace/workspace.interfaces";

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

export const formatList = async (listings) => {
  let templates = (
    await Promise.all(
      listings.map(async (template: any) => {
        if (
          template.listing_assetContract.toLowerCase() ===
          addresses.spheronErc1155.toLowerCase()
        ) {
          try {
            const templateObj: IWorkspaceElement = await (
              await fetch(template.token.uri)
            ).json();

            return { ...template, ...templateObj };
          } catch (error) {
            console.error("error: ", error);
          }
        }
      })
    )
  ).filter((template: any) => template !== undefined);

  return templates;
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
