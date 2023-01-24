import { createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import config from 'config';
import { approveERC20Token, getERC1155Contract, getMarketplaceContract, getSigner } from 'redux/web3/web3.utils';
import { IRootState } from 'redux/root-state.interface';
import { ISelectedTemplate } from './template.interfaces';
import { SelectedTemplateDto } from './template.dto';
import { inReviewQuery, listedQuery } from './template.utils';
import request from 'graphql-request';
import { IWorkspaceElement } from 'redux/workspace/workspace.interfaces';

export const buySelectedTemplateAsync = createAsyncThunk('template/buySelectedTemplate', async (_, { getState }) => {
  const state = getState() as IRootState;
  const selectedTemplate: ISelectedTemplate = state.template.selectedTemplate;
  const selectedTemplateDto = new SelectedTemplateDto(selectedTemplate);

  try {
    const signer = getSigner();
    const marketplaceContract = getMarketplaceContract(signer);

    // skip approval if template is free
    if (parseFloat(ethers.utils.formatUnits(selectedTemplateDto.buyoutPricePerToken)) !== 0) {
      await approveERC20Token(selectedTemplateDto.buyoutPricePerToken, signer);
    }

    const address = await signer.getAddress();
    const tx = await marketplaceContract.buy(
      selectedTemplateDto.listingId,
      address,
      1,
      config.address.usdt,
      selectedTemplateDto.buyoutPricePerToken,
      {
        gasLimit: 3000000,
      },
    );

    // tx.hash -> before transaction is complete

    // transaction is complete
    const receipt = await tx.wait();
    // yield put(toggleModalType('final'));

    return receipt;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in transaction --> ', error);
  }
});

export const mintTemplateAsync = createAsyncThunk('template/mintTemplate', async (uri: string) => {
  try {
    const signer = getSigner();
    const erc1155Contract = getERC1155Contract(signer);
    const tx = await erc1155Contract.mint(uri);
    const receipt = await tx.wait();
    const tokenId = parseInt(receipt.logs[1].topics[1].toString());
    // yield put(toggleModalType('minted-complete'));
    return tokenId;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in mintTemplateAsync --> ', error);
  }
});

// available for buying
export const fetchListedTemplatesAsync = createAsyncThunk('template/fetchListedTemplates', async (_, { dispatch }) => {
  try {
    const query = process.env.REACT_APP_TEMPLATE_LIST_TYPE === 'in-review' ? inReviewQuery : listedQuery;
    const res = await request(config.template.TEMPLATE_GRAPHQL_URL, query);
    const listings = await formatList(res.listings);
    return listings;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in fetchListedTemplatesAsync --> ', error);
  }
});

export const formatList = async listings => {
  let templates = (
    await Promise.all(
      listings.map(async (template: any) => {
        if (template.listing_assetContract.toLowerCase() === config.address.buidlfyErc1155.toLowerCase()) {
          try {
            if (template.token.uri) {
              const templateObj: IWorkspaceElement = await (await fetch(template.token.uri)).json();

              return { ...template, ...templateObj };
            } else {
              return { ...template };
            }
          } catch (error) {
            console.error('error: ', error);
          }
        }
      }),
    )
  ).filter((template: any) => template !== undefined);

  return templates;
};
