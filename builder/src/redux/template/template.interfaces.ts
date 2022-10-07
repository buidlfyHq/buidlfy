import { BigNumber } from "ethers";
import { IWorkspaceElement } from "redux/workspace/workspace.interfaces";

export interface ITemplateState {
  buyTemplateHash: string;
  buyTemplateLoading: boolean;
  mintTokenId: number;
  mintTemplateLoading: boolean;
  templateList: []; // ADD: suitable type
  ownedTemplateList: []; // ADD: suitable type
  selectedTemplate: ISelectedTemplate;
}

export interface ISelectedTemplate {
  id: string;
  name: string;
  value: IWorkspaceElement[];
  image: string;
  listing_listingId: BigNumber;
  listing_buyoutPricePerToken: BigNumber;
}
