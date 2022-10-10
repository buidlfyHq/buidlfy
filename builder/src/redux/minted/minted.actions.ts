import mintedActionTypes from "./minted.types";

export const listTemplate = () => ({
  type: mintedActionTypes.LIST_TEMPLATE,
});

export const fetchOwnedTemplates = () => ({
  type: mintedActionTypes.FETCH_OWNED_TEMPLATES,
});
