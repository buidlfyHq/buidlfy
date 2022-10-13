import { FC } from "react";
import { useDispatch } from "react-redux";
import { Dialog } from "@headlessui/react";
import { CgClose } from "react-icons/cg";
import ListTemplates from "components/utils/list-templates";
import { toggleModal } from "redux/modal/modal.reducers";
import { ReactComponent as SearchIcon } from "assets/svgAsIcons/search-icon.svg";

const TEMPLATE_CATEGORIES = [
  "ALL",
  "SAAS",
  "WEB3",
  "CMS",
  "PORTFOLIO",
  "SHOP",
  "OTHER",
];

const SelectTemplateModal: FC = () => {
  const dispatch = useDispatch();

  return (
    <Dialog.Panel className="flex flex-col items-center w-full max-w-[1400px] mx-28 my-20 rounded-[24px] bg-white">
      <div className="flex flex-col items-center w-full px-12 pt-12">
        <div className="flex items-start justify-end w-full">
          <CgClose
            onClick={() => dispatch(toggleModal(false))}
            className="text-[24px] cursor-pointer"
          />
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
        <ListTemplates />
      </div>
    </Dialog.Panel>
  );
};

export default SelectTemplateModal;
