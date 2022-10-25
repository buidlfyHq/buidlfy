import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateWorkspaceElementsArray } from "redux/workspace/workspace.reducers";
import { toggleModal, toggleModalType } from "redux/modal/modal.reducers";
import { setSelectedTemplate } from "redux/template/template.reducers";
import { ISelectedTemplate } from "redux/template/template.interfaces";
import { IWorkspaceElement } from "redux/workspace/workspace.interfaces";

interface ITemplateCard {
  temp: ISelectedTemplate;
  badge: string;
  list?: boolean;
}

const TemplateCard: FC<ITemplateCard> = ({ temp, badge, list }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleListOnBuidlfy = (template: ISelectedTemplate) => {
    dispatch(setSelectedTemplate(template));
    dispatch(toggleModal(true));
    dispatch(toggleModalType("list-single"));
  };

  const openTemplate = (config: IWorkspaceElement[]) => {
    if (config) dispatch(updateWorkspaceElementsArray(config));
    return navigate("/");
  };

  return (
    <div className="bg-white border border-[#E8EAED] rounded-[16px] p-2 cursor-pointer shadow-template-box relative">
      <div className="relative rounded-[16px] h-auto">
        <div className="absolute right-0 flex justify-end my-2 mx-4 py-1 px-3 text-[#14142B] text-[10px] bg-[#FFE6B0] rounded-[5px]">
          {badge}
        </div>
        <div className="absolute flex flex-col items-center justify-center w-full h-full font-[13px] font-[600]">
          <div className="py-2 px-10 rounded-[8px] bg-white text-[#7743E7]">
            View Details
          </div>
          {list && (
            <div
              className="py-2 px-8 mt-4 rounded-[8px] connect-wallet-button text-white"
              onClick={() => handleListOnBuidlfy(temp)}
            >
              List on Buidlfy
            </div>
          )}
          <div
            className="py-2 px-10 mt-4 rounded-[8px] bg-white text-[#7743E7]"
            onClick={() => openTemplate(temp.value)}
          >
            Use Template
          </div>
        </div>
        <img
          src={temp.image}
          alt="img_temp"
          className="rounded-[16px] w-full"
        />
      </div>
      <div className="flex justify-between items-center font-bold text-[#000000] mt-4 px-2">
        <div className="text-[14px] text-[#14142B] opacity-80 font-[600]">
          {temp.name}
        </div>
        <div className="text-[12px] text-[#14142B] py-2 px-4 bg-gray-100 font-[500] rounded-[4px]">
          {temp?.category || "NA"}
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;