import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setSiteHead,
  updateWorkspaceBackgroundColor,
  updateWorkspaceElementsArray,
} from "redux/workspace/workspace.reducers";
import {
  updateContractAbi,
  updateContractAddress,
} from "redux/contract/contract.reducers";
import { toggleModal, toggleModalType } from "redux/modal/modal.reducers";
import { setSelectedTemplate } from "redux/template/template.reducers";
import { ISelectedTemplate } from "redux/template/template.interfaces";
import { IHead, IWorkspaceElement } from "redux/workspace/workspace.interfaces";
import { IContractDetails } from "redux/contract/contract.interfaces";
import Polygon from "assets/icons/polygon.png";

interface ITemplateCard {
  template: ISelectedTemplate;
  badge: string;
  list?: boolean;
}

const TemplateCard: FC<ITemplateCard> = ({ template, badge, list }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleListOnBuidlfy = (template: ISelectedTemplate) => {
    dispatch(setSelectedTemplate(template));
    dispatch(toggleModal(true));
    dispatch(toggleModalType("list-single"));
  };

  const openTemplate = (
    config: IWorkspaceElement[],
    backgroundColor: string,
    head: IHead,
    contract: IContractDetails
  ) => {
    if (config) {
      dispatch(updateWorkspaceElementsArray(config));
      dispatch(updateWorkspaceBackgroundColor(backgroundColor));
      dispatch(setSiteHead(head));
      dispatch(updateContractAbi(contract?.abi));
      dispatch(updateContractAddress(contract?.address));
    }
    return navigate("/");
  };

  return (
    <div className="bg-white border border-[#E8EAED] rounded-[16px] p-2 shadow-template-box relative">
      <div className="relative rounded-[16px] h-auto cursor-pointer">
        <div className="absolute right-0 flex justify-end my-2 mx-4 py-1 px-3 text-[#14142B] text-[10px] bg-[#FFE6B0] rounded-[5px]">
          {badge}
        </div>
        <div className="absolute flex flex-col items-center justify-center w-full h-full font-[13px] font-[600] opacity-0 duration-300 hover:opacity-100">
          {list ? (
            <div
              className="py-2 px-8 mt-4 rounded-[8px] connect-wallet-button text-white"
              onClick={() => handleListOnBuidlfy(template)}
            >
              List on Buidlfy
            </div>
          ) : (
            <div className="py-2 px-10 mt-4 rounded-[8px] connect-wallet-button text-white">
              View Details
            </div>
          )}
          <div
            className="py-2 px-10 mt-4 rounded-[8px] bg-white text-[#7743E7]"
            onClick={() =>
              openTemplate(
                template.value,
                template.backgroundColor,
                template.head,
                template.contract
              )
            }
          >
            Use Template
          </div>
        </div>
        <img
          src={template.image}
          alt="img_temp"
          className="rounded-[16px] w-full"
          width={314}
          height={200}
        />
      </div>
      <div className="flex justify-between items-center font-bold text-[#000000] mt-4 px-2">
        <div className="flex items-center">
          <a
            target="_blank"
            href={`https://mumbai.polygonscan.com/address/${template.token_address}`}
            className="mr-3 border rounded-full p-2"
          >
            <img src={Polygon} width={12} height={12} />
          </a>
          <div className="text-[14px] text-[#14142B] opacity-80 font-[600]">
            {template.name}
          </div>
        </div>
        <div className="text-[12px] text-[#14142B] py-2 px-4 bg-gray-100 font-[500] rounded-[4px]">
          {template?.category || "NA"}
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
