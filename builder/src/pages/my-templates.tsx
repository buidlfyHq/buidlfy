import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiChevronDown } from "react-icons/bi";
import makeBlockie from "ethereum-blockies-base64";
import MyTemplateTemplates from "features/my-templates/list-my-templates";
import SearchForm from "features/my-templates/search-form";
import { ReactComponent as ColorFeather } from "assets/svgAsIcons/feather-color.svg";

const MyTemplates: FC = () => {
  const navigate = useNavigate();
  const currentAccount = useSelector((state: any) => state.web3.currentAccount);

  useEffect(() => {
    if (!currentAccount) {
      return navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* nav */}
      <div className="flex justify-between px-36 py-6 h-[77px] border-bottom-divider sticky-top">
        <div className="font-[700] text-black text-[20px]">Buidlfy</div>
        <div className="flex items-center">
          <Link to="/" className="flex items-center px-10 py-3 bordered-button">
            <ColorFeather className="mr-3" />
            <div className="gradient-text">Builder</div>
          </Link>
          <div className="flex justify-center items-center my-2 ml-3">
            {currentAccount && (
              <img
                className="bg-black w-8 h-8 rounded-full"
                src={makeBlockie(currentAccount)}
                alt="Blockie"
              />
            )}
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
            <div className="py-3 cursor-pointer px-7">Listed Templates</div>
          </div>
        </div>
        <div className="w-full bg-lower-template">
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
          <MyTemplateTemplates />
        </div>
      </div>
    </div>
  );
};

export default MyTemplates;
