import React, { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiChevronDown } from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";
import makeBlockie from "ethereum-blockies-base64";
import SearchForm from "features/my-templates/search-form";
import RenderTemplateList from "components/utils/render-template-list";
import logo from "assets/icons/buidlfy.png";
import { ReactComponent as ColorFeather } from "assets/svgAsIcons/feather-color.svg";

export enum TabType {
  ALL = "all",
  REVIEW = "review",
  LISTED = "listed",
}

const MyTemplates: FC = () => {
  const navigate = useNavigate();
  const currentAccount = useSelector((state: any) => state.web3.currentAccount);
  const [tab, setTab] = useState<string>("all");

  useEffect(() => {
    if (!currentAccount) {
      return navigate("/");
    }
  }, []);

  return (
    <main className="min-h-screen overflow-y-auto">
      {/* nav */}
      <section className="flex justify-between px-36 py-6 h-[77px] border-bottom-divider sticky-top">
        <div className="flex justify-center items-center my-2">
          <img src={logo} className="w-[2.4rem] mx-[1.3rem] rounded-full hover:shadow-lg" alt="logo" />
        </div>
        <div className="flex items-center">
          <Link to="/" className="flex items-center px-10 py-3 bordered-button">
            <ColorFeather className="mr-3" />
            <div className="gradient-text">Builder</div>
          </Link>
          <div className="flex justify-center items-center my-2 ml-3">
            {currentAccount && (
              <img
                className="bg-black w-8 h-8 rounded-full hover:shadow-lg"
                src={makeBlockie(currentAccount)}
                alt="Blockie"
              />
            )}
          </div>
        </div>
      </section>

      {/* mid sec */}
      <section className="px-36 py-6">
        <div className="flex items-center justify-center font-[600] text-[28px] text-[#14142B]">
          My Templates
          <Link to="/">
            <IoIosAddCircleOutline className="text-[24px] ml-2 mt-[4px]" />
          </Link>
        </div>
      </section>

      <section>
        <section className="py-0 px-36">
          <div className="flex justify-center mt-4 text-black font-[600] text-[15px] gap-8">
            <button
              className={`py-3 cursor-pointer px-7 outline-none ${
                tab === TabType.ALL
                  ? "border-b-4 border-purple-500 gradient-text"
                  : null
              }`}
              onClick={() => setTab(TabType.ALL)}
            >
              All Templates
            </button>
            <button
              className={`py-3 cursor-pointer px-7 outline-none ${
                tab === TabType.REVIEW
                  ? "border-b-4 border-purple-500 gradient-text"
                  : null
              }`}
              onClick={() => setTab(TabType.REVIEW)}
            >
              In Review
            </button>
            <button
              className={`py-3 cursor-pointer px-7 outline-none ${
                tab === TabType.LISTED
                  ? "border-b-4 border-purple-500 gradient-text"
                  : null
              }`}
              onClick={() => setTab(TabType.LISTED)}
            >
              Listed Templates
            </button>
          </div>
        </section>
        <section className="w-full bg-lower-template">
          <div className="flex items-center justify-center gap-5 pt-12 pb-4 px-36">
            <div>
              <SearchForm />
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
            <RenderTemplateList tab={tab} />
          </div>
        </section>
      </section>
    </main>
  );
};

export default MyTemplates;
