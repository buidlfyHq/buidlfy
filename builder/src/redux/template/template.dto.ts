import { BigNumber } from "ethers";
import { IContractDetails } from "redux/contract/contract.interfaces";
import { IHead, IWorkspaceElement } from "redux/workspace/workspace.interfaces";
import { ISelectedTemplate } from "./template.interfaces";

export class SelectedTemplateDto {
  id?: string;
  tokenId?: string;
  name: string;
  category: string;
  description: string;
  value: IWorkspaceElement[];
  backgroundColor: string;
  head: IHead;
  contract: IContractDetails;
  image: string;
  publishedUrl: string;
  amount: string;
  listingId: BigNumber;
  buyoutPricePerToken: BigNumber;
  listingTokenId?: string;
  tokenOwner: string;
  isOwned?: boolean;

  constructor(selectedTemplate: ISelectedTemplate) {
    this.id = selectedTemplate.id;
    this.tokenId = selectedTemplate.token_id;
    this.name = selectedTemplate.name;
    this.category = selectedTemplate.category;
    this.description = selectedTemplate.description;
    this.value = selectedTemplate.value;
    this.backgroundColor = selectedTemplate.backgroundColor;
    this.head = selectedTemplate.head;
    this.contract = selectedTemplate.contract;
    this.image = selectedTemplate.image;
    this.publishedUrl = selectedTemplate.publishedUrl;
    this.amount = selectedTemplate.amount;
    this.listingId = selectedTemplate.listing_listingId;
    this.buyoutPricePerToken = selectedTemplate.listing_buyoutPricePerToken;
    this.listingTokenId = selectedTemplate.listing_tokenId;
    this.tokenOwner =
      selectedTemplate.listing_tokenOwner || selectedTemplate.owner_of;
    this.isOwned = selectedTemplate?.isOwned;
  }
}
