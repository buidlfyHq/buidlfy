import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import { CgClose } from "react-icons/cg";
import { toggleModalType } from "redux/modal/modal.reducers";
import { setSelectedTemplate } from "redux/template/template.reducers";
import { ISelectedTemplate } from "redux/template/template.interfaces";

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
  const templateList = useSelector((state: any) => state.minted.templateList);

  const handleSelectTemplate = (template: ISelectedTemplate) => {
    dispatch(setSelectedTemplate(template));
    dispatch(toggleModalType("single"));
  };

  return (
    <main className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] overflow-y-auto">
      <Dialog.Panel className="flex flex-col items-center w-full max-w-[1200px] my-20 mx-28 rounded-[24px] bg-white mt-96">
        <div className="flex flex-col items-center px-10 pt-12">
          <div className="flex items-start justify-end w-full">
            <CgClose className="text-[24px] cursor-pointer" />
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
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
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
            {templateList &&
              templateList.map((temp: ISelectedTemplate) => {
                return (
                  <div
                    key={temp.id}
                    className="bg-white border border-[#E8EAED] rounded-[16px] p-2 cursor-pointer shadow-template-box"
                    onClick={() => handleSelectTemplate(temp)}
                  >
                    <img
                      src={temp.image}
                      alt="img_temp"
                      className="w-full rounded-[16px]"
                      width={314}
                      height={200}
                    />
                    <div className="flex justify-between items-center font-bold text-[#000000] mt-4 px-2">
                      <div className="text-[13px] text-[#14142B] opacity-80 ">
                        {temp.name}
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
    </main>
  );
};

export default SelectTemplateModal;
