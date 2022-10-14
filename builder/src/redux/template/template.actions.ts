import templateActionTypes from "./template.types";

export const buyTemplate = (payload: any) => ({
  type: templateActionTypes.BUY_TEMPLATE,
  payload,
});

export const mintTemplate = (payload: any) => ({
  type: templateActionTypes.MINT_TEMPLATE,
  payload,
});
