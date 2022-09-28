import React, { FC } from "react";
import { Dialog } from "@headlessui/react";
import { IoArrowBack } from "react-icons/io5";
import { VscArrowRight } from "react-icons/vsc";
import SignleTempImg from "assets/modalIcons/single-temp-img.png";

interface MintedTemplateModal {
  isOpenSingleTemplate: boolean;
  setIsOpenSingleTemplate: (isOpenSingleTemplate: boolean) => void;
  setIsOpenFinalTemplate: (isOpenFinalTemplate: boolean) => void;
}

const SingleTemplateDetails: FC<MintedTemplateModal> = ({
  isOpenSingleTemplate,
  setIsOpenSingleTemplate,
  setIsOpenFinalTemplate,
}) => {
  const handleSubmit = () => {
    setIsOpenFinalTemplate(true);
  };

  return (
    <Dialog
      className="relative z-50"
      open={isOpenSingleTemplate}
      onClose={() => setIsOpenSingleTemplate(false)}
    >
      <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-[10px]">
        <Dialog.Panel className="grid grid-cols-12 gap-12 w-full max-w-[1200px] my-20 mx-28 rounded-[24px] py-12 px-10 bg-white max-h-[80vh]">
          <div className="flex flex-col justify-start col-span-4">
            <div className="flex items-center justify-start w-full mt-8 cursor-pointer">
              <IoArrowBack className="text-[16px] text-[#4E4B66]" />
              <div className="ml-2 text-[13px] font-[500] text-[#4E4B66]">
                Go Back
              </div>
            </div>
            <div className="mt-8 flex justify-between items-center font-[500]">
              <div className="text-[24px] text-[#000000] whitespace-nowraps">
                Template Name
              </div>
              <div className=" min-w-[68px] text-center text-[13px] text-[#14142B] bg-[#E6EAF4] rounded-[3px] font-[500] px-3 py-2">
                Portfolio
              </div>
            </div>
            <div className="flex items-center mt-3">
              <div className="bg-[#9CB0D7] w-[32px] h-[32px] rounded-[50%] mt-30">
                {" "}
              </div>
              <div className="ml-2 text-[14px] text-[#14142B] opacity-70">
                Stevan Mark - 0xBBB6...e96e
              </div>
            </div>
            <div className="mt-12 text-[#4E4B66] opacity-70 text-[13px] max-w-[250px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
              felis, sed ullamcorper tempus faucibus in imperdiet semper justo
              mauris sed.
            </div>
            <div className="w-full mt-8 text-center text-[14px] text-[#202525] bg-[#E6EAF4] rounded-[4px] font-[600] py-4">
              $149.00
            </div>
            <div className="w-full mt-10 text-center text-[20px] text-[#202525] font-[500] py-4 rounded-[8px] preview-button cursor-pointer">
              Preview in browser
            </div>
            <div
              onClick={handleSubmit}
              className="w-full flex justify-center items-center mt-5 text-center text-[22px] text-white cursor-pointer rounded-[8px] font-[500] py-4 connect-wallet-button"
            >
              <div className="text-[14px]">Connect Wallet to buy </div>
              <VscArrowRight className="ml-2 text-[18px]" />
            </div>
            <div className="mt-3 text-[#4E4B66] opacity-70 text-[13px]">
              To buy this you must connect your wallet
            </div>
          </div>
          <div className="flex justify-center col-span-8">
            <img src={SignleTempImg} alt="img_temp" width={735} height={763} />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default SingleTemplateDetails;
