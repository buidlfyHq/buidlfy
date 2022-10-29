import { FC } from "react";
import { useSelector } from "react-redux";
import { TabType } from "pages/my-templates";
import { filterTemplates } from "utils/filter-templates";
import { IRootState } from "redux/root-state.interface";
import { ISelectedTemplate } from "redux/template/template.interfaces";
import TemplateCard from "features/my-templates/template-card";
import NoTemplateImg from 'assets/no-temp-default.png'
import { ReactComponent as ColorFeather } from "assets/svgAsIcons/feather.svg";

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
            <div className="flex flex-col items-center col-span-3">
              <img
                src={NoTemplateImg}
                alt="img_temp"
                width={60}
                height={60}
                className="my-5"
              />
              <div className="text-[24px] text-center gradient-text-no-template font-[600] mt-2">
              Sorry! No Minted Templates!
              </div>
              <div className="text-[14px] text-center text-[#14142B] opacity-70 mt-2 px-2">
              Create a template and mint it in order to sell it on the Buildfy’s marketplace.
              </div>
              <div className="flex items-center gap-3 text-[14px] px-6 py-3 mt-6 connect-wallet-button font-[600] text-white rounded-[8px] cursor-pointer">
              Create & Mint Template
              <ColorFeather className="w-[18px]" />
              </div>
            </div>
          )}
        </>
      );
    case TabType.REVIEW:
      return (
        <>
          {ownedReviewTemplateList &&
            ownedReviewTemplateList.map((template: ISelectedTemplate) => (
              <div key={template.id}>
                <TemplateCard template={template} badge="In Review" />
              </div>
            ))}
        </>
      );
    case TabType.LISTED:
      return (
        <>
          {ownedListedTemplateList &&
            ownedListedTemplateList.map((template: ISelectedTemplate) => (
              <div key={template.id}>
                <TemplateCard template={template} badge="Listed" />
              </div>
            ))}
        </>
      );
    default:
      break;
  }
};

export default RenderTemplateList;
