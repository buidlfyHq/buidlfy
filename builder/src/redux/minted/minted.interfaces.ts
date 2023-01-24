import { ISelectedTemplate } from 'redux/template/template.interfaces';

export interface IMintedState {
  approveListingLoading: boolean;
  listTemplateHash: string;
  listTemplateLoading: boolean;
  ownedTemplateList: ISelectedTemplate[];
  ownedReviewTemplateList: ISelectedTemplate[];
  ownedListedTemplateList: ISelectedTemplate[];
  templateBannerImage: string;
}
