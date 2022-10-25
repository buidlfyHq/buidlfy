import { BigNumber } from "ethers";
import { IWorkspaceElement } from "redux/workspace/workspace.interfaces";

export interface ITemplateState {
  buyTemplateReceipt: string;
  buyTemplateLoading: boolean;
  mintTokenId: number;
  mintTemplateLoading: boolean;
  selectedTemplate: ISelectedTemplate;
  templateList: [];
}

export interface ISelectedTemplate {
  id?: string;
  token_id?: string;
  name: string;
  category: string;
  description: string;
  value: IWorkspaceElement[];
  image: string;
  listing_listingId: BigNumber;
  listing_buyoutPricePerToken: BigNumber;
  listing_tokenId?: string;
  listing_tokenOwner: string;
}
