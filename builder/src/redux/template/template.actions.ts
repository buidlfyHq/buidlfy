import templateActionTypes from "./template.types";

export const buyTemplate = (payload: any) => ({
  type: templateActionTypes.BUY_TEMPLATE,
  payload,
});

export const fetchTemplates = () => ({
  type: templateActionTypes.FETCH_TEMPLATES,
});

export const fetchOwnedTemplates = () => ({
  type: templateActionTypes.FETCH_OWNED_TEMPLATES,
});

export const mintTemplate = (payload: any) => ({
  type: templateActionTypes.MINT_TEMPLATE,
  payload,
});
