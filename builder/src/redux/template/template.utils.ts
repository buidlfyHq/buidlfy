import { gql } from "graphql-request";

export const filterTemplates = (template, payload) => {
  const isOwned = payload.filter(
    (owned: { token_id: string }) => owned.token_id == template.listing_tokenId
  )[0];

  if (isOwned) {
    return { ...template, isOwned: true };
  }
  return template;
};

export const inReviewQuery = gql`
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

export const listedQuery = gql`
  {
    listings(where: { isAccepted: true }) {
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
