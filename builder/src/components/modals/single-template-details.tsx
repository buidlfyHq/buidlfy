import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import { Dialog } from "@headlessui/react";
import { VscArrowRight } from "react-icons/vsc";
import { Tag } from "components/utils/tag-component";
import { truncateString } from "utils/truncate-string";
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
import { SelectedTemplateDto } from "redux/template/template.dto";
import { IRootState } from "redux/root-state.interface";
import EyeImg from "assets/icons/eye.png";
import InfoCircleImg from "assets/icons/info-circle.png";
import USDTIcon from "assets/icons/usdt.png";
import { BiArrowBack } from "react-icons/bi";

interface ISingleTemplateDetails {
  list: boolean;
}

const SingleTemplateDetails: FC<ISingleTemplateDetails> = ({ list }) => {
  const dispatch = useDispatch();
  const selectedTemplate = useSelector(
    (state: IRootState) => state.template.selectedTemplate
  );
  const selectedTemplateDto = new SelectedTemplateDto(selectedTemplate);
  const amount = selectedTemplateDto.buyoutPricePerToken && parseFloat(
    ethers.utils.formatUnits(selectedTemplateDto.buyoutPricePerToken)
  );

  const handleListAndBuy = () => {
    if (list) {
      dispatch(toggleModalType("list-template-for-sale"));
    } else {
      if (selectedTemplateDto?.isOwned) {
        if (selectedTemplateDto?.value) {
          dispatch(updateWorkspaceElementsArray(selectedTemplateDto?.value));
          dispatch(
            updateWorkspaceBackgroundColor(selectedTemplateDto?.backgroundColor)
          );
          dispatch(setSiteHead(selectedTemplateDto?.head));
          dispatch(updateContractAbi(selectedTemplateDto?.contract?.abi));
          dispatch(
            updateContractAddress(selectedTemplateDto?.contract?.address)
          );
          dispatch(toggleModal(false));
        }
      } else {
        dispatch(toggleModalType("select-wallet"));
      }
    }
  };

  return (
    <Dialog.Panel className="w-full max-w-[1200px] my-20 mx-28 rounded-[24px] py-10 px-14 bg-white">
      <BiArrowBack
        onClick={() => dispatch(toggleModalType("template"))}
        className="mb-2 text-[20px] duration-150 ease-linear scale-100 cursor-pointer hover:scale-125"
      />
      <div className="flex items-center justify-between">
        <div className="text-[22px] font-[500] text-[#14142B]">
          {selectedTemplateDto.name}
        </div>
        {selectedTemplateDto.publishedUrl && (
          <a
            target="_blank"
            href={`https://${selectedTemplateDto.publishedUrl}`}
            className="button-singleTemp flex items-center py-2.5 px-6 cursor-pointer"
          >
            <img src={EyeImg} alt="icon" width={18} height={18} />
            <div className="ml-2 gradient-text font-[500]">Preview</div>
          </a>
        )}
      </div>
      <div className="mt-5">
        <img
          src={selectedTemplateDto.image}
          className="w-full max-h-[509px] h-auto rounded-[28px]"
          alt="icon"
          height={669}
        />
        <div className="flex justify-between">
          <div className="mt-5">
            <div className="flex items-center mt-3">
              <div className="bg-[#9CB0D7] w-[32px] h-[32px] rounded-[50%] mt-30">
                {" "}
              </div>
              <div className="ml-2 text-[14px] text-[#14142B] opacity-70">
                {truncateString(selectedTemplateDto.tokenOwner)}
              </div>
            </div>
            <div className="mt-8 text-[#4E4B66] opacity-70 text-[13px] max-w-[400px]">
              {selectedTemplateDto?.description}
            </div>
          </div>
          <div>
            {!list ? (
              <div className="flex items-center justify-between w-full mt-8 text-center bg-[#E6EAF4] rounded-[8px] py-4 px-4 cursor-pointer">
                {selectedTemplateDto?.isOwned ? (
                  <div>Template already purchased.</div>
                ) : (
                  <>
                    <div className="flex items-center gap-2.5">
                      <img src={USDTIcon} alt="icon" width={24} height={24} />
                      <div className="text-[18px] font-[600] text-[#14142B]">
                        {amount !== 0 ? `${amount} USDT` : "Free"}
                      </div>
                    </div>
                    <div className="text-[14px] font-[600] text-[#14142B] opacity-70">
                      {amount !== 0 ? ` ~$ ${amount}` : null}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="mt-16"> </div>
            )}
            <button
              onClick={handleListAndBuy}
              className="w-full flex justify-center gap-10 items-center mt-5 text-center text-[22px] text-white cursor-pointer rounded-[8px] font-[500] py-4 connect-wallet-button"
            >
              <div className="text-[14px]">
                {!list
                  ? selectedTemplateDto?.isOwned
                    ? "Use Template"
                    : "Connect Wallet to Buy"
                  : "List on Buidlfy"}
              </div>
              <VscArrowRight className="ml-2 text-[22px]" />
            </button>
            <div className="flex mt-3 bg-[#F7F7FF] rounded-[8px] items-center text-[#14142B] opacity-80 text-[13px] py-3 px-4">
              <img src={InfoCircleImg} alt="icon" width={17} height={17} />
              <div className="ml-2">
                To buy this you must connect your wallet
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-7">
        {selectedTemplateDto?.category && (
          <Tag name={selectedTemplateDto?.category} />
        )}
      </div>
    </Dialog.Panel>
  );
};

export default SingleTemplateDetails;
