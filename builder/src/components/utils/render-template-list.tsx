import { FC } from "react";
import { useSelector } from "react-redux";
import { TabType } from "pages/my-templates";
import { filterTemplates } from "utils/filter-templates";
import { IRootState } from "redux/root-state.interface";
import { ISelectedTemplate } from "redux/template/template.interfaces";
import TemplateCard from "features/my-templates/template-card";

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
          {ownedTemplateList &&
            ownedTemplateList.map((temp: ISelectedTemplate) => {
              const inReview =
                ownedReviewTemplateList.filter(
                  (t: ISelectedTemplate) => t.listing_tokenId === temp.token_id
                )[0] !== undefined;
              const listed =
                ownedListedTemplateList.filter(
                  (t: ISelectedTemplate) => t.listing_tokenId === temp.token_id
                )[0] !== undefined;

              return (
                <div key={temp.token_id}>
                  <TemplateCard
                    temp={temp}
                    badge={filterTemplates(inReview, listed).badge}
                    list={filterTemplates(inReview, listed).list}
                  />
                </div>
              );
            })}
        </>
      );
    case TabType.REVIEW:
      return (
        <>
          {ownedReviewTemplateList &&
            ownedReviewTemplateList.map((temp: ISelectedTemplate) => (
              <div key={temp.id}>
                <TemplateCard temp={temp} badge="In Review" />
              </div>
            ))}
        </>
      );
    case TabType.LISTED:
      return (
        <>
          {ownedListedTemplateList &&
            ownedListedTemplateList.map((temp: ISelectedTemplate) => (
              <div key={temp.id}>
                <TemplateCard temp={temp} badge="Listed" />
              </div>
            ))}
        </>
      );
    default:
      break;
  }
};

export default RenderTemplateList;