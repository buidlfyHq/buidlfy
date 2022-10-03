import React, { FC } from "react";
import { Dialog } from "@headlessui/react";
import UprightImg from "assets/upright.png";
import CongratulationsImg from "assets/congratulations.png";

const SitePublishedModal: FC = () => {
  return (
      <main className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-[10px]">
        <Dialog.Panel className="flex flex-col justify-center items-center w-full max-w-[580px] my-20 mx-28 rounded-[4px] py-16 px-10 bg-white">
          <div>
            <img
              src={CongratulationsImg}
              alt="img_temp"
              width={50}
              height={50}
            />
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
              href="www.app.buildfy.com/sitename"
              className="outline-none"
            >
              www.app.buildfy.com/sitename
            </a>
            <img
              src={UprightImg}
              alt="upright_arrow"
              className="ml-2"
              width={8}
              height={8}
            />
          </div>
          <div className="connect-wallet-button text-white px-16 py-3 text-[14px] font-[600] rounded-[8px] mt-6 cursor-pointer">
            Visit Site
          </div>
        </Dialog.Panel>
      </main>
  );
};

export default SitePublishedModal;