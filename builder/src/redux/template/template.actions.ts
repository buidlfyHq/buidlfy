import templateActionTypes from "./template.types";

export const buyTemplate = () => ({
  type: templateActionTypes.BUY_TEMPLATE,
});

export const mintTemplate = (payload: string) => ({
  type: templateActionTypes.MINT_TEMPLATE,
  payload,
});
