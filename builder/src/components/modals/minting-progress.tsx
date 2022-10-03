import React, { FC } from "react";
import { Dialog } from "@headlessui/react";
import HourGlassImg from "assets/hourglass.png";
import { useDispatch } from "react-redux";
import { toggleModalType } from "redux/modal/modal.reducers";

const MintingProgressModal: FC = () => {
  const dispatch = useDispatch()
  setTimeout(() => {
    dispatch(toggleModalType('minted-complete'))
  }, 3000)
  return (
      <main className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-[10px]">
        <Dialog.Panel className="flex flex-col justify-center items-center w-full max-w-[582px] my-20 sm:mx-28 mx-14 rounded-[4px] py-16 px-10 bg-white">
          <div>
            <img src={HourGlassImg} alt="icon" width={54} height={54} />
          </div>
          <div className="font-[500] text-[20px] text-[#14142B] mt-5">
            Mint in process
          </div>
          <div className="text-[13px] text-[#14142B] opacity-60 mt-4 text-center w-[314px]">
          Site miniting could take up some minutes. Please bear with us once it is done.
          </div>
          <div className="relative w-full bg-[#E0E0E0] rounded-full h-2.5 mb-4 mt-8 w-[50%] overflow-hidden">
            <div className="animate-loading absolute bg-[#666BD3] h-2.5 rounded-full" style={{width: '45%'}}></div>
          </div>
        </Dialog.Panel>
      </main>
  );
};

export default MintingProgressModal;
