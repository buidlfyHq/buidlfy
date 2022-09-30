import React, { FC } from "react";
import { Dialog } from "@headlessui/react";
import TickCircleImg from "assets/tick-circle.png";
import InfoCircleImg from "assets/info-circle.png";

interface IMintedTemplateModal {
  isMintedOpen: boolean;
  setIsMintedOpen: (isMintedOpen: boolean) => void;
}

const MintedTemplateModal: FC<IMintedTemplateModal> = ({
  isMintedOpen,
  setIsMintedOpen,
}) => {
  return (
    <Dialog
      className="relative z-50"
      open={isMintedOpen}
      onClose={() => setIsMintedOpen(false)}
    >
      <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-[10px]">
        <Dialog.Panel className="flex flex-col justify-center items-center w-full max-w-[670px] my-20 mx-28 rounded-[24px] py-16 px-10 bg-white max-h-[80vh]">
          <div>
            <img src={TickCircleImg} alt="icon" width={80} height={80} />
          </div>
          <div className="font-[600] text-[34px] text-[#1C1C1E] mt-10">
            Template is Minted!
          </div>
          <div className="text-[18px] text-[#1C1C1E] opacity-60 mt-4">
            Congratulations, you have saved the template with us!
          </div>
          <div className="flex w-full bg-gray-100 mt-8 rounded-[4px] items-center py-3 px-4">
            <img src={InfoCircleImg} alt="icon" width={17} height={17} />
            <div className="text-[14px] text-[#1C1C1E] opacity-60 ml-4">
              Our team will review the template before making it available on
              the market place, we’ll notify you once it is ready to go on the
              market place.
            </div>
          </div>
          <div
            onClick={() => setIsMintedOpen(false)}
            className="bg-[#8268E5] text-white px-16 py-3 text-[14px] font-[600] rounded-[8px] mt-12 cursor-pointer"
          >
            Okay
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default MintedTemplateModal;
