import { BigNumber, ethers } from "ethers";
import request, { gql } from "graphql-request";
import config from "config";
import {
  approveERC20Token,
  getERC1155Contract,
  getMarketplaceContract,
  getSigner,
} from "redux/web3/web3.utils";
import { inReviewQuery, listedQuery } from "./template.utils";
import { IWorkspaceElement } from "redux/workspace/workspace.interfaces";

export const initiateTransactionService = async (
  listingId: BigNumber,
  buyoutPricePerToken: BigNumber
) => {
  try {
    const signer = getSigner();
    const marketplaceContract = getMarketplaceContract(signer);

    // skip approval if template is free
    if (parseFloat(ethers.utils.formatUnits(buyoutPricePerToken)) !== 0) {
      await approveERC20Token(buyoutPricePerToken, signer);
    }

    const address = await signer.getAddress();
    const tx = await marketplaceContract.buy(
      listingId,
      address,
      1,
      config.address.usdt,
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
    console.error("Error in mintTemplateService --> ", error);
    return { error: true, errorMessage: (error as Error).message, receipt: "" };
  }
};

export const formatList = async (listings) => {
  let templates = (
    await Promise.all(
      listings.map(async (template: any) => {
        if (
          template.listing_assetContract.toLowerCase() ===
          config.address.buidlfyErc1155.toLowerCase()
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

// available for buying
export const getListedTemplatesService = async () => {
  try {
    const query =
      process.env.REACT_APP_TEMPLATE_LIST_TYPE === "in-review"
        ? inReviewQuery
        : listedQuery;
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
