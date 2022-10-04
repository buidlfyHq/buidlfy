import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Dialog } from "@headlessui/react";
import { toggleModal, toggleModalType } from "redux/modal/modal.reducers";
import { ReactComponent as ScratchIcon } from "assets/modalIcons/scratchIcon.svg";
import { ReactComponent as TemplateIcon } from "assets/modalIcons/templateIcon.svg";

const StartModal: FC = () => {
  const dispatch = useDispatch();

  return (
    // <main className="fixed inset-0 flex items-center justify-center p-4 bg-black/20 backdrop-blur-[2px]">
      <Dialog.Panel className="rounded-[24px] py-16 px-20 bg-white rounded flex flex-row justify-start items-center gap-16">
        <div className="flex flex-col items-center w-[300px] h-[280px] relative">
          <span className="absolute right-[-13%] w-[1px] h-[260px] bg-gray-200">
            {" "}
          </span>
          <ScratchIcon />
          <div className="mt-6 text-[22px] text-center text-[#14142B] font-[800]">
            Start from Scratch
          </div>
          <div className="mt-3 text-[15px] text-[#4E4B66] text-center">
            Create a website from scratch by using our easy no code builder
          </div>
          <div
            onClick={() => dispatch(toggleModal(false))}
            className="mt-10 rounded-[28px] bg-[#5D46E4] px-9 py-4 text-white text-[16px] text-center text-[600] cursor-pointer"
          >
            Create from Scratch
          </div>
        </div>
        <div className="flex flex-col items-center w-[300px] h-[280px]">
          <TemplateIcon />
          <div className="mt-6 text-[22px] text-center text-[#14142B] font-[800]">
            Start from a Template
          </div>
          <div className="mt-3 text-[15px] text-[#4E4B66] text-center">
            Select over 100 stunning templates to create a stunning wesite
          </div>
          <div
            onClick={() => dispatch(toggleModalType("template"))}
            className="mt-10 rounded-[28px] bg-[#5D46E4] px-9 py-4 text-white text-[16px] text-center text-[600] cursor-pointer"
          >
            Start from a template
          </div>
        </div>
      </Dialog.Panel>
    // </main>
  );
};

export default StartModal;
