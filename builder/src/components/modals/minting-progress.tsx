import React, { FC, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { toggleModalType } from "redux/modal/modal.reducers";
import LottieComponent from "components/utils/lottie";
import Hourglass from 'assets/lottie/hourglass.json'

const MintingProgressModal: FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    setTimeout(() => {
      dispatch(toggleModalType('minted-complete'))
    }, 3000)
  }, [])
  return (
      <Dialog.Panel className="flex flex-col justify-center items-center w-full max-w-[582px] my-20 sm:mx-28 mx-14 rounded-[4px] py-16 px-10 bg-white">
          <LottieComponent lottie={Hourglass} width={75} height={75} />
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
  );
};

export default MintingProgressModal;
