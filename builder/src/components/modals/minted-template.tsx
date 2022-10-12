import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dialog } from "@headlessui/react";
import Lottie from "react-lottie";
import { toggleModal } from "redux/modal/modal.reducers";
import MintLottie from "assets/lottie/mint-success.json";

const DEFAULT_OPTIONS = {
  loop: false,
  autoplay: true,
  animationData: MintLottie,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const MintedTemplateModal: FC = () => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(toggleModal(false));

  return (
    <Dialog.Panel className="flex flex-col justify-center items-center w-full max-w-[670px] my-20 mx-28 rounded-[24px] py-16 px-10 bg-white max-h-[80vh]">
      <div>
        <Lottie options={DEFAULT_OPTIONS} height={200} width={200} />
      </div>
      <div className="font-[600] text-[34px] text-[#1C1C1E]">
        Template is Minted!
      </div>
      <div className="text-[16px] leading-[32px] w-[400px] text-[#1C1C1E] opacity-60 mt-4 text-center">
        Congratulations, you have saved the template with us! Please check the
        template in the my template section.
      </div>
      <Link to="/my-templates" onClick={handleClose}>
        <button className="text-[#7742E7] text-[18px] font-[500] flex bordered-button mt-8 items-center py-4 px-9">
          View My Templates
        </button>
      </Link>
      <button
        onClick={handleClose}
        className="text-[#8268E5] text-[18px] font-[500] mt-5 cursor-pointer"
      >
        Okay
      </button>
    </Dialog.Panel>
  );
};

export default MintedTemplateModal;
