import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TabType } from "pages/my-templates";
import { filterTemplates } from "utils/filter-templates";
import { updateWorkspaceElementsArray } from "redux/workspace/workspace.reducers";
import { IRootState } from "redux/root-state.interface";
import { ISelectedTemplate } from "redux/template/template.interfaces";
import { IWorkspaceElement } from "redux/workspace/workspace.interfaces";
import TemplateCard from "features/my-templates/template-card";

interface IRenderTemplateList {
  tab: string;
}

const RenderTemplateList: FC<IRenderTemplateList> = ({ tab }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ownedTemplateList = useSelector(
    (state: IRootState) => state.minted.ownedTemplateList
  );
  const ownedReviewTemplateList = useSelector(
    (state: IRootState) => state.minted.ownedReviewTemplateList
  );
  const ownedListedTemplateList = useSelector(
    (state: IRootState) => state.minted.ownedListedTemplateList
  );

  const openTemplate = (config: IWorkspaceElement[]) => {
    if (config) dispatch(updateWorkspaceElementsArray(config));
    return navigate("/");
  };

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
                <div
                  key={temp.token_id}
                  onClick={() => openTemplate(temp.value)}
                >
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
