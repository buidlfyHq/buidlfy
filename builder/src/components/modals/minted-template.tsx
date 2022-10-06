import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dialog } from "@headlessui/react";
import { toggleModal } from "redux/modal/modal.reducers";
import TickCircleImg from "assets/icons/tick-circle.png";

const MintedTemplateModal: FC = () => {
  const dispatch = useDispatch()
  const handleClose = () => dispatch(toggleModal(false))
  return (
      <main className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-[10px]">
        <Dialog.Panel className="flex flex-col justify-center items-center w-full max-w-[670px] my-20 mx-28 rounded-[24px] py-16 px-10 bg-white max-h-[80vh]">
          <div>
            <img src={TickCircleImg} alt="icon" width={80} height={80} />
          </div>
          <div className="font-[600] text-[34px] text-[#1C1C1E] mt-10">
            Template is Minted!
          </div>
          <div className="text-[16px] leading-[32px] w-[400px] text-[#1C1C1E] opacity-60 mt-4 text-center">
            Congratulations, you have saved the template with us! 
            Please check the template in the my template section.
          </div>
          <Link to='/my-templates' onClick={handleClose} className="gradient-text text-[18px] fomt-[500] flex preview-button mt-8 rounded-[16px] items-center py-3 px-4">
            View My Templates
          </Link>
          <div
            onClick={handleClose}
            className="text-[#8268E5] text-[18px] font-[500] mt-5 cursor-pointer"
          >
            Okay
          </div>
        </Dialog.Panel>
      </main>
  );
};

export default MintedTemplateModal;
