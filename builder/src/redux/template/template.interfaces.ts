import { BigNumber } from 'ethers';
import { IContractDetails } from 'redux/contract/contract.interfaces';
import { IHead, IWorkspaceElement } from 'redux/workspace/workspace.interfaces';

export interface ITemplateState {
  buyTemplateReceipt: string;
  buyTemplateLoading: boolean;
  mintTokenId: number;
  mintTemplateLoading: boolean;
  selectedTemplate: ISelectedTemplate;
  templateList: ISelectedTemplate[];
  fetchTemplateLoading: boolean;
  filteredTemplateList: ISelectedTemplate[];
}

export interface ISelectedTemplate {
  id?: string;
  token_id?: string;
  name: string;
  category: string;
  description: string;
  value: IWorkspaceElement[];
  backgroundColor: string;
  head: IHead;
  contract: IContractDetails;
  image: string;
  publishedUrl: string;
  listAmount?: string;
  listing_listingId: BigNumber;
  listing_buyoutPricePerToken: BigNumber;
  listing_tokenId?: string;
  listing_tokenOwner?: string;
  listing_assetContract?: string;
  owner_of?: string;
  isOwned?: boolean;
  token_address?: string;
}
