import { BigNumber } from "ethers";
import { IWorkspaceElement } from "redux/workspace/workspace.interfaces";
import { ISelectedTemplate } from "./template.interfaces";

export class SelectedTemplateDto {
  id?: string;
  tokenId?: string;
  name: string;
  category: string;
  description: string;
  value: IWorkspaceElement[];
  image: string;
  listingId: BigNumber;
  buyoutPricePerToken: BigNumber;
  listingTokenId?: string;
  tokenOwner: string;

  constructor(selectedTemplate: ISelectedTemplate) {
    this.id = selectedTemplate.id;
    this.tokenId = selectedTemplate.token_id;
    this.name = selectedTemplate.name;
    this.category = selectedTemplate.category;
    this.description = selectedTemplate.description;
    this.value = selectedTemplate.value;
    this.image = selectedTemplate.image;
    this.listingId = selectedTemplate.listing_listingId;
    this.buyoutPricePerToken = selectedTemplate.listing_buyoutPricePerToken;
    this.listingTokenId = selectedTemplate.listing_tokenId;
    this.tokenOwner =
      selectedTemplate.listing_tokenOwner || selectedTemplate.owner_of;
  }
}
