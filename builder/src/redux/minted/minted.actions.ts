import mintedActionTypes from './minted.types';

export const listTemplate = (payload: string) => ({
  type: mintedActionTypes.LIST_TEMPLATE,
  payload,
});

export const fetchOwnedTemplates = () => ({
  type: mintedActionTypes.FETCH_OWNED_TEMPLATES,
});

export const fetchOwnedReviewTemplates = () => ({
  type: mintedActionTypes.FETCH_OWNED_REVIEW_TEMPLATES,
});

export const fetchOwnedListedTemplates = () => ({
  type: mintedActionTypes.FETCH_OWNED_LISTED_TEMPLATES,
});
