import React, { FC } from "react";
import { Dialog } from "@headlessui/react";
import { VscArrowRight } from "react-icons/vsc";
import EyeImg from "assets/eye.png";
import TempexImg from "assets/tempex.png";
import InfoCircleImg from "assets/info-circle.png";

interface ISingleTemplateDetails {
  setModalType: (modalType: string) => void;
}

const SingleTemplateDetails: FC<ISingleTemplateDetails> = ({
  setModalType,
}) => {
  return (
    <main className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-[10px]">
      <Dialog.Panel className="w-full max-w-[1200px] my-20 mx-28 rounded-[24px] py-10 px-14 bg-white">
        <div className="flex items-center justify-between">
          <div className="text-[22px] font-[500] text-[#14142B]">
            Cryptin Next Generation Web Template
          </div>
          <div className="preview-button flex items-center py-2.5 px-6 rounded-[24px] cursor-pointer">
            <img src={EyeImg} alt="icon" width={18} height={18} />
            <div className="ml-2">Preview</div>
          </div>
        </div>
        <div className="mt-5">
          <img
            src={TempexImg}
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
                  Stevan Mark - 0xBBB6...e96e
                </div>
              </div>
              <div className="mt-8 text-[#4E4B66] opacity-70 text-[13px] max-w-[400px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Elementum felis, sed ullamcorper tempus faucibus in imperdiet
                semper justo mauris sed.
              </div>
            </div>
            <div>
              <div className="w-full mt-8 text-center text-[14px] text-[#202525] bg-[#E6EAF4] rounded-[4px] font-[600] py-4 cursor-pointer">
                $149.00
              </div>
              <div
                onClick={() => setModalType("final")}
                className="w-full flex justify-center items-center mt-5 text-center text-[22px] text-white cursor-pointer rounded-[8px] font-[500] py-4 connect-wallet-button"
              >
                <div className="text-[14px]">Connect Wallet to buy </div>
                <VscArrowRight className="ml-2 text-[18px]" />
              </div>
              <div className="flex mt-3 bg-gray-100 rounded-[4px] items-center text-[#4E4B66] opacity-70 text-[13px] py-3 px-4">
                <img src={InfoCircleImg} alt="icon" width={17} height={17} />
                <div className="ml-2">
                  To buy this you must connect your wallet
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-7">
          <div className="w-auto py-2 px-3.5 bg-gray-100 text-[#5799EB] rounded-[3px] text-[14px] font-[500]">
            Web3
          </div>
          <div className="w-auto py-2 px-3.5 bg-gray-100 text-[#5799EB] rounded-[3px] text-[14px] font-[500]">
            Crypto
          </div>
        </div>
      </Dialog.Panel>
    </main>
  );
};

export default SingleTemplateDetails;
