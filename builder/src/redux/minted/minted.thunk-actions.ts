import { createAsyncThunk } from '@reduxjs/toolkit';
import request, { gql } from 'graphql-request';
import { ethers } from 'ethers';
import config from 'config';
import { formatList } from 'redux/template/template.thunk-actions';
import { filterAllTemplates } from 'redux/template/template.reducers';
import { getCurrentTime } from './minted.utils';
import { approveERC1155Token, getMarketplaceContract, getSigner, isApprovedForAll, TOKENS_COUNT_ON_MINT } from 'redux/web3/web3.utils';
import { IRootState } from 'redux/root-state.interface';
import { ISelectedTemplate } from 'redux/template/template.interfaces';
import { IWorkspaceElement } from 'redux/workspace/workspace.interfaces';
import { SelectedTemplateDto } from 'redux/template/template.dto';

export const approveListingAsync = createAsyncThunk('minted/approveListing', async (address: string) => {
  try {
    const signer = getSigner();
    const isApproved = await isApprovedForAll(signer, address);
    if (!isApproved) {
      await approveERC1155Token(signer);
    }
    return;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error in approveListingService --> ', error);
    return;
  }
});

export const createListingAsync = createAsyncThunk('minted/createListing', async (amount: string, { dispatch, getState }) => {
  const state = getState() as IRootState;
  const currentAccount = state.web3.currentAccount;
  const selectedTemplate: ISelectedTemplate = state.template.selectedTemplate;
  const selectedTemplateDto = new SelectedTemplateDto(selectedTemplate);
  const buyoutPricePerToken = ethers.utils.parseEther(amount);

  await dispatch(approveListingAsync(currentAccount));

  try {
    const signer = getSigner();
    const marketplaceContract = getMarketplaceContract(signer);
    const token_id = parseInt(selectedTemplateDto.tokenId);
    const tx = await marketplaceContract.createListing(
      [
        config.address.buidlfyErc1155,
        token_id,
        getCurrentTime(),
        getCurrentTime(),
        TOKENS_COUNT_ON_MINT,
        config.address.usdt,
        buyoutPricePerToken,
        buyoutPricePerToken,
        0, // Always should be 0 cause Direct Listing
      ],
      {
        gasLimit: 3000000,
      },
    );
    console.log('tx: ', tx);
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in createListingService --> ', error);
    return '';
  }
});

export const fetchOwnedTemplatesAsync = createAsyncThunk('minted/fetchOwnedTemplates', async (_, { dispatch, getState }) => {
  const state = getState() as IRootState;
  const currentAccount = state.web3.currentAccount;
  const modalType = state.modal.modalType;

  try {
    const allTemplates = await (
      await fetch(
        `https://deep-index.moralis.io/api/v2/${currentAccount}/nft?chain=${config.network.DEFAULT_NETWORK.chainName}&format=decimal&token_addresses=${config.address.buidlfyErc1155}`,
        {
          method: 'GET',
          headers: {
            'X-API-Key': config.template.MORALIS_X_API_KEY,
            accept: 'application/json',
          },
        },
      )
    ).json();

    let templates = (
      await Promise.all(
        allTemplates.result.map(async (template: any) => {
          try {
            if (template.token_uri) {
              const templateObj: IWorkspaceElement = await (await fetch(template.token_uri)).json();

              return { ...template, ...templateObj };
            } else {
              return { ...template };
            }
          } catch (error) {
            console.error('error: ', error);
          }
        }),
      )
    ).filter((template: any) => template !== undefined);

    dispatch(filterAllTemplates(templates));

    if (modalType === 'select-wallet') {
      const selectedTemplate = state.template.selectedTemplate;
      if (selectedTemplate?.isOwned) {
        // yield put(toggleModalType('single'));
      } else {
        // yield put(toggleModalType('checkout'));ß
      }
    }

    // yield put(ownedTemplatesFetched(fetchedTemplates.templates));
    return templates;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in fetchOwnedTemplatesAsync --> ', error);
    return;
  }
});

export const fetchOwnedReviewTemplatesAsync = createAsyncThunk('minted/fetchOwnedReviewTemplates', async (_, { getState }) => {
  const state = getState() as IRootState;
  const currentAccount = state.web3.currentAccount;

  try {
    const query = gql`
      {
        listings(where: { listing_tokenOwner: "${currentAccount.toLowerCase()}", isAccepted: false }) {
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

    const res = await request(config.template.TEMPLATE_GRAPHQL_URL, query);
    const listings = await formatList(res.listings);
    if (listings.length !== 0) {
      return listings;
    }
    return [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in fetchOwnedReviewTemplatesAsync --> ', error);
    return;
  }
});

export const fetchOwnedListedTemplatesAsync = createAsyncThunk('minted/fetchOwnedListedTemplates', async (_, { getState }) => {
  const state = getState() as IRootState;
  const currentAccount = state.web3.currentAccount;

  try {
    const query = gql`
      {
        listings(where: { listing_tokenOwner: "${currentAccount.toLowerCase()}", isAccepted: true }) {
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

    const res = await request(config.template.TEMPLATE_GRAPHQL_URL, query);
    const listings = await formatList(res.listings);
    if (listings.length !== 0) {
      return listings;
    }
    return [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in fetchOwnedListedTemplatesAsync --> ', error);
    return;
  }
});
