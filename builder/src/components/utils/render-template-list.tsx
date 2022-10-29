import { FC } from "react";
import { useSelector } from "react-redux";
import { TabType } from "pages/my-templates";
import { filterTemplates } from "utils/filter-templates";
import { IRootState } from "redux/root-state.interface";
import { ISelectedTemplate } from "redux/template/template.interfaces";
import TemplateCard from "features/my-templates/template-card";
import NoTemplateDesign from "./no-template-design";

interface IRenderTemplateList {
  tab: string;
}

const RenderTemplateList: FC<IRenderTemplateList> = ({ tab }) => {
  const ownedTemplateList = useSelector(
    (state: IRootState) => state.minted.ownedTemplateList
  );
  const ownedReviewTemplateList = useSelector(
    (state: IRootState) => state.minted.ownedReviewTemplateList
  );
  const ownedListedTemplateList = useSelector(
    (state: IRootState) => state.minted.ownedListedTemplateList
  );

  switch (tab) {
    case TabType.ALL:
      return (
        <>
          {ownedTemplateList.length > 0 ? (
            ownedTemplateList.map((template: ISelectedTemplate) => {
              const inReview =
                ownedReviewTemplateList.filter(
                  (t: ISelectedTemplate) =>
                    t.listing_tokenId === template.token_id
                )[0] !== undefined;
              const listed =
                ownedListedTemplateList.filter(
                  (t: ISelectedTemplate) =>
                    t.listing_tokenId === template.token_id
                )[0] !== undefined;

              return (
                <div key={template.token_id}>
                  <TemplateCard
                    template={template}
                    badge={filterTemplates(inReview, listed).badge}
                    list={filterTemplates(inReview, listed).list}
                  />
                </div>
              );
            })
          ) : (
            <NoTemplateDesign
            heading={'Sorry! No Minted Templates!'}
            desc={'Create a template and mint it in order to sell it on the Buildfy’s marketplace.'}
            buttonText={'Create & Mint Template'}
            />
          )}
        </>
      );
    case TabType.REVIEW:
      return (
        <>
          { ownedReviewTemplateList.length> 0 ? (ownedReviewTemplateList &&
            ownedReviewTemplateList.map((template: ISelectedTemplate) => (
              <div key={template.id}>
                <TemplateCard template={template} badge="In Review" />
              </div>
            ))) : (
              <NoTemplateDesign
              heading={'Sorry! No Review Templates!'}
              desc={'List a template to sell it on the Buildfy’s Marketplace'}
              />
            )}
        </>
      );
    case TabType.LISTED:
      return (
        <>
          { ownedListedTemplateList.length > 0 ? (ownedListedTemplateList &&
            ownedListedTemplateList.map((template: ISelectedTemplate) => (
              <div key={template.id}>
                <TemplateCard template={template} badge="Listed" />
              </div>
            ))) : (
              <NoTemplateDesign
              heading={'Sorry! No Listed Templates!'}
              desc={'Sorry, you don’t have anything yet!'}
              />
            )}
        </>
      );
    default:
      break;
  }
};

export default RenderTemplateList;
