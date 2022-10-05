import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiChevronDown } from "react-icons/bi";
import makeBlockie from "ethereum-blockies-base64";
import TemplateModal from "features/dashboard/template-modal";
import { toggleModal, toggleModalType } from "redux/modal/modal.reducers";
import { ReactComponent as ColorFeather } from "assets/svgAsIcons/feather-color.svg";
import Temp1 from "assets/icons/temp-1.png";

const TEMPLATES = [Temp1, Temp1, Temp1];

const MyTemplates: FC = () => {
  const dispatch = useDispatch();
  const currentAccount = useSelector((state: any) => state.web3.currentAccount);

  const handleListOnBuidlfy = () => {
    dispatch(toggleModal(true));
    dispatch(toggleModalType("list-single"));
  };

  return (
    <div className="min-h-screen">
      {/* nav */}
      <div className="flex justify-between px-36 py-6 h-[77px] border-bottom-divider sticky-top">
        <div className="font-[700] text-black text-[20px]">Buidlfy</div>
        <div className="flex items-center">
          <div className="flex items-center px-10 py-3 bordered-button">
            <ColorFeather className="mr-3" />
            <div className="gradient-text">Builder</div>
          </div>
          <div className="flex justify-center items-center my-2 ml-3">
            <img
              className="bg-black w-8 h-8 rounded-full"
              src={makeBlockie(currentAccount)}
              alt="Blockie"
            />
          </div>
        </div>
      </div>

      {/* mid sec */}
      <div className="flex flex-col items-center py-16 px-36">
        <div className="font-[600] text-[28px] text-[#14142B]">
          My Templates
        </div>
        <div className="max-w-[412px] text-[13px] text-[#14142A] opacity-60 text-center mt-4 ">
          Create a beautiful website that meets your needs by choosing from over
          100 beautiful templates.
        </div>
      </div>

      <div>
        <div className="py-0 px-36">
          <div className="flex justify-center mt-6 text-black font-[600] text-[15px] gap-8">
            <div className="py-3 cursor-pointer px-7">Minted Templates</div>
            <div className="py-3 cursor-pointer px-7">In Review</div>
            <div className="py-3 cursor-pointer px-7">Published</div>
          </div>
        </div>
        <div className="w-full bg-lower-template">
          <div className="flex items-center justify-center gap-5 pt-12 pb-4 px-36">
            <div>
              <form className="flex items-center">
                <div className="relative ">
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
                  <input
                    type="text"
                    id="simple-search"
                    className="search rounded-full focus:ring-[#dee0e9] focus:border-[#dee0e9] block w-full pl-10 p-2.5 "
                    placeholder="Search"
                    required
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center whitespace-nowrap py-4 px-5 text-[#14142A] text-[15px] bg-white rounded-[10px]">
              Sort by: Time
              <BiChevronDown className="ml-2 text-[18px]" />
            </div>
            <div className="flex items-center whitespace-nowrap py-4 px-5 text-[#14142A] text-[15px] bg-white rounded-[10px]">
              All categories
              <BiChevronDown className="ml-2 text-[18px]" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-10 px-40 pb-12 pt-7">
            {TEMPLATES.map((temp, index) => {
              return (
                <div
                  key={index}
                  className="bg-white border border-[#E8EAED] rounded-[16px] p-2 cursor-pointer shadow-template-box relative"
                >
                  <div className="relative rounded-[16px] h-auto">
                    <div className="absolute right-0 flex justify-end my-2 mx-4 py-1 px-3 text-[#14142B] text-[10px] bg-[#FFE6B0] rounded-[5px]">
                      In Review
                    </div>
                    <div className="absolute flex flex-col items-center justify-center w-full h-full font-[13px] font-[600]">
                      <div className="py-2 px-10 rounded-[8px] bg-white text-[#7743E7]">
                        View Details
                      </div>
                      <div
                        className="py-2 px-8 mt-4 rounded-[8px] connect-wallet-button text-white"
                        onClick={handleListOnBuidlfy}
                      >
                        List on Buidlfy
                      </div>
                    </div>
                    <img
                      src={temp}
                      alt="img_temp"
                      className="rounded-[16px] w-full"
                    />
                  </div>
                  <div className="flex justify-between items-center font-bold text-[#000000] mt-4 px-2">
                    <div className="text-[14px] text-[#14142B] opacity-80 font-[600]">
                      Cryptin Next Gen Template
                    </div>
                    <div className="text-[12px] text-[#14142B] py-2 px-4 bg-gray-100 font-[500] rounded-[4px]">
                      Crypto
                    </div>
                  </div>
                  <TemplateModal />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTemplates;
