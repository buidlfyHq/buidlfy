import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Dialog } from "@headlessui/react";
import { CgClose } from "react-icons/cg";
import LottieComponent from "components/utils/lottie";
import { toggleModal } from "redux/modal/modal.reducers";
import UprightImg from "assets/icons/upright.png";
import HourGlassImg from "assets/lottie/hourglass.json";

const SitePublishedModal: FC = () => {
  const dispatch = useDispatch();
  const newDomainName = localStorage.getItem("domainName");

  return (
    <Dialog.Panel className="flex flex-col justify-center items-center w-full max-w-[580px] my-20 mx-28 rounded-[4px]  bg-white">
      <button
        className="flex items-start justify-end w-full pr-4 pt-4"
        onClick={() => dispatch(toggleModal(false))}
      >
        <CgClose className="text-[24px] cursor-pointer text-[#14142B]" />
      </button>
      <div className="flex flex-col justify-center items-center py-16 px-10">
        <div>
          <LottieComponent lottie={HourGlassImg} width={75} height={75} />
        </div>
        <div className="font-[500] text-[20px] text-[#2C2D5E] mt-3">
          Site is published!
        </div>
        <div className="text-[13px] text-[#2C2D5E] font-[300] mt-2">
          Please open the link given below to see your site
        </div>
        <div className="flex items-center py-2 mt-5 another-bg link-bg px-7">
          <a
            target="_blank"
            href={`https://${newDomainName}`}
            className="outline-none"
          >
            {newDomainName}
          </a>
          <img
            src={UprightImg}
            alt="upright_arrow"
            className="ml-2"
            width={8}
            height={8}
          />
        </div>
        <a
          target="_blank"
          href={`https://${newDomainName}`}
          className="connect-wallet-button text-white px-16 py-3 text-[14px] font-[600] rounded-[8px] mt-6 cursor-pointer"
        >
          Visit Site
        </a>
      </div>
    </Dialog.Panel>
  );
};

export default SitePublishedModal;
