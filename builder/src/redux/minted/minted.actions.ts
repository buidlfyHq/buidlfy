import mintedActionTypes from "./minted.types";

export const listTemplate = () => ({
  type: mintedActionTypes.LIST_TEMPLATE,
});

export const fetchOwnedTemplates = () => ({
  type: mintedActionTypes.FETCH_OWNED_TEMPLATES,
});

export const fetchTemplates = () => ({
  type: mintedActionTypes.FETCH_TEMPLATES,
});

export const fetchOwnedReviewTemplates = () => ({
  type: mintedActionTypes.FETCH_OWNED_REVIEW_TEMPLATES,
});

export const fetchOwnedListedTemplates = () => ({
  type: mintedActionTypes.FETCH_OWNED_LISTED_TEMPLATES,
});
