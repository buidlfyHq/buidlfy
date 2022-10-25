import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import { Dialog } from "@headlessui/react";
import { VscArrowRight } from "react-icons/vsc";
import { Tag } from "components/utils/tag-component";
import { toggleModalType } from "redux/modal/modal.reducers";
import { IRootState } from "redux/root-state.interface";
import EyeImg from "assets/icons/eye.png";
import InfoCircleImg from "assets/icons/info-circle.png";

interface ISingleTemplateDetails {
  list: boolean;
}

const SingleTemplateDetails: FC<ISingleTemplateDetails> = ({ list }) => {
  const dispatch = useDispatch();
  const selectedTemplate = useSelector(
    (state: IRootState) => state.template.selectedTemplate
  );

  const handleSubmit = () => {
    list
      ? dispatch(toggleModalType("list-template-for-sale"))
      : dispatch(toggleModalType("select-wallet"));
  };

  return (
    <Dialog.Panel className="w-full max-w-[1200px] my-20 mx-28 rounded-[24px] py-10 px-14 bg-white">
      <div className="flex items-center justify-between">
        <div className="text-[22px] font-[500] text-[#14142B]">
          {selectedTemplate.name}
        </div>
        <button className="button-singleTemp flex items-center py-2.5 px-6 cursor-pointer">
          <img src={EyeImg} alt="icon" width={18} height={18} />
          <div className="ml-2 gradient-text font-[500]">Preview</div>
        </button>
      </div>
      <div className="mt-5">
        <img
          src={selectedTemplate.image}
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
                0xBBB6...e96e
              </div>
            </div>
            <div className="mt-8 text-[#4E4B66] opacity-70 text-[13px] max-w-[400px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
              felis, sed ullamcorper tempus faucibus in imperdiet semper justo
              mauris sed.
            </div>
          </div>
          <div>
            {!list ? (
              <div className="flex items-center justify-between w-full mt-8 text-center bg-[#E6EAF4] rounded-[8px] py-4 px-4 cursor-pointer">
                <div className="text-[18px] font-[600] text-[#14142B]">
                  {ethers.utils.formatUnits(
                    selectedTemplate.listing_buyoutPricePerToken
                  )}{" "}
                  USDC
                </div>
                <div className="text-[14px] font-[600] text-[#14142B] opacity-70">
                  ~$
                  {ethers.utils.formatUnits(
                    selectedTemplate.listing_buyoutPricePerToken
                  )}
                </div>
              </div>
            ) : (
              <div className="mt-16"> </div>
            )}
            <button
              onClick={handleSubmit}
              className="w-full flex justify-center gap-10 items-center mt-5 text-center text-[22px] text-white cursor-pointer rounded-[8px] font-[500] py-4 connect-wallet-button"
            >
              <div className="text-[14px]">
                {!list ? "Connect Wallet to Buy" : "List on Buidlfy"}
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
        <Tag name={"Web3"} />
        <Tag name={"Crypto"} />
      </div>
    </Dialog.Panel>
  );
};

export default SingleTemplateDetails;
