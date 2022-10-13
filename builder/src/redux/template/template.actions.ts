import { BigNumber } from "ethers";
import templateActionTypes from "./template.types";

export const buyTemplate = (payload: {
  listingId: BigNumber;
  buyoutPricePerToken: BigNumber;
}) => ({
  type: templateActionTypes.BUY_TEMPLATE,
  payload,
});

export const fetchTemplates = () => ({
  type: templateActionTypes.FETCH_TEMPLATES,
});

export const fetchOwnedTemplates = () => ({
  type: templateActionTypes.FETCH_OWNED_TEMPLATES,
});

export const mintTemplate = (payload: string) => ({
  type: templateActionTypes.MINT_TEMPLATE,
  payload,
});
