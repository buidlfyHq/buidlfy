import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Dialog } from "@headlessui/react";
import { CgClose } from "react-icons/cg";
import { toggleModalType, toggleModal } from "redux/modal/modal.reducers";
import {ReactComponent as SearchIcon} from 'assets/svgAsIcons/search-icon.svg'
import Temp1 from "assets/icons/temp-1.png";
import Temp2 from "assets/icons/temp-2.png";
import Temp3 from "assets/icons/temp-3.png";

const TEMPLATE_CATEGORIES = [
  "ALL",
  "SAAS",
  "WEB3",
  "CMS",
  "PORTFOLIO",
  "SHOP",
  "OTHER",
];

const TEMPLATES = [Temp1, Temp2, Temp3, Temp3, Temp1, Temp2];

const SelectTemplateModal: FC = () => {
  const dispatch = useDispatch();
  return (
    <Dialog.Panel className="flex flex-col items-center w-full max-w-[1400px] mx-28 my-20 rounded-[24px] bg-white">
      <div className="flex flex-col items-center w-full px-12 pt-12">
        <div className="flex items-start justify-end w-full">
          <CgClose onClick={() => dispatch(toggleModal(false))} className="text-[24px] cursor-pointer" />
        </div>
        <div className="text-center w-[412px]">
          <div className="text-[#14142B] font-[600] text-[28px] leading-[44px]">
            Select a template
          </div>
          <div className="mt-3 text-[#4E4B66] text-[14px]">
            Select over 100 stunning templates to create a stunning wesite to
            fit your needs.
          </div>
        </div>
        <form className="flex items-center mt-5">
          <div className="relative w-full mx-3">
            <input
              type="text"
              id="simple-search"
              className="search outline-none rounded-[37px] block w-full py-4 px-8 h-[50px]"
              placeholder="Search by template name"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <SearchIcon />
            </div>
          </div>
        </form>
        <div className="flex gap-2 mt-9">
          <div className="text-[14px] font-bold relative px-5 py-2 whitespace-nowrap cursor-pointer">
            MY CREATIONS
            <span className="absolute w-[6px] h-[6px] bg-[#85858B] opacity-60 rounded-[50%] right-[-5%] top-[45%]">
              {""}
            </span>
          </div>
          <div className="text-[14px] font-bold relative px-5 py-2 whitespace-nowrap cursor-pointer">
            PURCHASED
            <span className="absolute w-[1px] h-[20px] bg-[#85858B] opacity-60 right-[-5%] top-[25%]">
              {""}
            </span>
          </div>
          <div className="flex ml-2">
            {TEMPLATE_CATEGORIES.map((category, index) => {
              return (
                <div
                  key={index}
                  className="text-[14px] font-bold px-5 py-2 hover:bg-[#ECEFFF] hover:rounded-[4px] cursor-pointer"
                >
                  {category}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <hr className="bg-hr h-[2px] w-full mt-6" />
      <div className="w-full bg-lower-template">
        <div className="grid grid-cols-3 gap-4 px-10 pb-12 pt-7">
          {TEMPLATES.map((temp, index) => {
            return (
              <div
                onClick={() => dispatch(toggleModalType("single"))}
                key={index}
                className="bg-white border border-[#E8EAED] rounded-[16px] p-2 cursor-pointer shadow-template-box"
              >
                <img
                  src={temp}
                  alt="img_temp"
                  className="w-full rounded-[16px]"
                  width={314}
                  height={200}
                />
                <div className="flex justify-between items-center font-bold text-[#000000] mt-4 px-2">
                  <div className="text-[13px] text-[#14142B] opacity-80 ">
                    Cryptin Next Gen Template
                  </div>
                  <div className="text-[10px] text-[#14142B] py-2 px-3 bg-gray-100 rounded-[28px]">
                    Crypto
                  </div>
                </div>
                <div className="text-[18px] font-[600] text-[#14142B] mt-2 px-2 pb-1">
                  $399.00
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Dialog.Panel>
  );
};

export default SelectTemplateModal;
