import React, { FC } from "react";
import { Dialog } from "@headlessui/react";
import TickCircleImg from "assets/tick-circle.png";
import { useDispatch } from "react-redux";
import { toggleModal } from "redux/modal/modal.reducers";
import { Link } from "react-router-dom";
import Lottie from 'react-lottie';
import MintLottie from 'assets/lottie/mint-success.json'

const MintedTemplateModal: FC = () => {
  const dispatch = useDispatch()
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: MintLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  const handleClose = () => dispatch(toggleModal(false))
  return (
      <Dialog.Panel className="flex flex-col justify-center items-center w-full max-w-[670px] my-20 mx-28 rounded-[24px] py-16 px-10 bg-white max-h-[80vh]">
          <div>
          <Lottie 
            options={defaultOptions}
            height={200}
            width={200}
          />
            {/* <img src={TickCircleImg} alt="icon" width={80} height={80} /> */}
          </div>
          <div className="font-[600] text-[34px] text-[#1C1C1E]">
            Template is Minted!
          </div>
          <div className="text-[16px] leading-[32px] w-[400px] text-[#1C1C1E] opacity-60 mt-4 text-center">
            Congratulations, you have saved the template with us! 
            Please check the template in the my template section.
          </div>
          <Link to='/my-templates' onClick={handleClose}>
            <div className="text-[#7742E7] text-[18px] font-[500] flex bordered-button mt-8 items-center py-4 px-9">
              View My Templates
            </div>
          </Link>
          <div
            onClick={handleClose}
            className="text-[#8268E5] text-[18px] font-[500] mt-5 cursor-pointer"
          >
            Okay
          </div>
        </Dialog.Panel>
  );
};

export default MintedTemplateModal;
