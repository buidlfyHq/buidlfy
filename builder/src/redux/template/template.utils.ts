export const filterTemplates = (template, payload) => {
  const isOwned = payload.filter(
    (owned: { token_id: string }) => owned.token_id == template.listing_tokenId
  )[0];

  if (isOwned) {
    return { ...template, isOwned: true };
  }
  return template;
};
