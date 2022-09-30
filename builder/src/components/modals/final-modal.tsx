import React, { FC } from "react";
import { Dialog } from "@headlessui/react";
import { ConfettiShower } from "components/utils/confetti-shower";
import { ReactComponent as FeatherIcon } from "assets/svgAsIcons/feather.svg";
import CongratulationsImg from "assets/congratulations.png";

interface IFinalModal {
  setOpenModal: (openModal: boolean) => void;
}

const FinalModal: FC<IFinalModal> = ({ setOpenModal }) => {
  return (
    <main className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-[10px]">
      <Dialog.Panel className="flex flex-col justify-center items-center w-full max-w-[1140px] my-20 mx-28 rounded-[24px] py-36 px-64 bg-white h-full max-h-[645px]">
        <ConfettiShower />
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
          onClick={() => setOpenModal(false)}
          className="flex items-center text-white px-12 py-5 text-[20px] font-[600] connect-wallet-button rounded-[60px] mt-10 cursor-pointer"
        >
          Start Creating Now
          <FeatherIcon className="ml-3" />
        </div>
      </Dialog.Panel>
    </main>
  );
};

export default FinalModal;
