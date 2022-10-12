import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Dialog } from "@headlessui/react";
import { toggleModal } from "redux/modal/modal.reducers";
import LottieComponent from "components/utils/lottie";
import CongratulationsImg from "assets/icons/congratulations.png";
import ConfettiLottie from 'assets/lottie/confetti.json'
import { ReactComponent as FeatherIcon } from "assets/svgAsIcons/feather.svg";

const FinalModal: FC = () => {
  const dispatch = useDispatch();
  return (
      <Dialog.Panel id="#confetti" className="relative flex flex-col justify-center items-center w-full max-w-[1140px] my-20 mx-28 rounded-[24px] py-20 lg:py-36 lg:px-64 px-28 bg-white ">
        {/* commented confetti-shower as confused which to use confetti or lottie */}
        {/* <ConfettiShower /> */}
        <LottieComponent lottie={ConfettiLottie} width={1200} height={600} className={'absolute w-full h-full'} />
        <div>
          <img src={CongratulationsImg} alt="img_temp" width={50} height={60} />
        </div>
        <div className="font-[700] text-[40px] text-[#14142B] mt-9">
          Congratulations!
        </div>
        <div className="font-[700] max-w-[540px] text-center text-[16px] text-[#14142B] opacity-60 mt-6">
          Templated has been purchased and it is ready to use. Please click on
          the button given below to start using the template
        </div>
        <div
          onClick={() => dispatch(toggleModal(false))}
          className="flex items-center text-white px-12 py-5 text-[20px] font-[600] connect-wallet-button rounded-[60px] mt-10 cursor-pointer"
        >
          Start Creating Now
          <FeatherIcon className="ml-3" />
        </div>
      </Dialog.Panel>
    
  );
};

export default FinalModal;