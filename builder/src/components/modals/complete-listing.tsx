import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import { CgClose } from "react-icons/cg";
import Spinner from "components/utils/assets/spinner";
import { toggleModal } from "redux/modal/modal.reducers";
import { IRootState } from "redux/root-state.interface";
import Approve1 from "assets/approve-1.png";
import Approve2 from "assets/approve-2.png";

const CompleteListing: FC = () => {
  const dispatch = useDispatch();
  const approveListingLoading = useSelector(
    (state: IRootState) => state.minted.approveListingLoading
  );
  const listTemplateLoading = useSelector(
    (state: IRootState) => state.minted.listTemplateLoading
  );

  return (
    <Dialog.Panel className="flex flex-col justify-center items-center w-full max-w-[527px] min-w-[330px] my-20 sm:mx-28 mx-12 rounded-[15px] bg-white">
      <button
        className="flex items-start justify-end w-full px-6 py-5"
        onClick={() => dispatch(toggleModal(false))}
      >
        <CgClose className="text-[18px] cursor-pointer" />
      </button>

      <section className="flex flex-col items-center w-full px-10">
        <div className="text-[#14142B] font-[600] text-[20px] mb-6">
          Complete your listing
        </div>

        <section className="flex w-full justify-between items-center text-[#14142B]  text-[14px] my-5">
          <div className="flex items-center gap-6">
            <div className="h-[54px] w-[54px] flex items-center bg-[#9F74FB] rounded-[2px] p-4 text-[18px]">
              {" "}
            </div>
            <div className="flex flex-col items-start">
              <div className="text-[#14142B] opacity-50 font-[500] tex-[12px] ">
                Crypto
              </div>
              <div className="text-[#14142B] font-[600] text-[14px] whitespace-nowrap">
                Cryptin Next Gen Template
              </div>
              <div className="text-[#14142B] opacity-50 font-[500] tex-[12px] ">
                Quantity: 1
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-[#14142B] opacity-50 font-[500] text-[12px] ">
              Price
            </div>
            <div className="text-[#14142B] font-[700] text-[14px]">123.00</div>
            <div className="text-[#14142B] opacity-50 font-[500] text-[12px] ">
              $1234767.00 USD
            </div>
          </div>
        </section>

        {/* Approve */}
        <section className="w-full border-top-divider-publish">
          <aside className="flex gap-5 py-5">
            <div>
              <img src={Approve1} alt="icon" width={35} height={35} />
            </div>
            <div className="flex flex-col items-start">
              <div className="text-[#202525] font-[500] text-[14px]">
                Approve Collection
              </div>
              <div className="text-[#14142B] opacity-50 text-[13px] mt-2.5">
                You’ll be asked to approve this collection from your wallet. You
                only need to approve each collection once.{" "}
              </div>
              {approveListingLoading && (
                <div className="flex items-center gap-2 px-3.5 cursor-pointer py-3 bg-gray-200 text-[#14142B] mt-4 font-[500] text-[13px] rounded-[4px]">
                  <Spinner />
                  <span>waiting for approval...</span>
                </div>
              )}
            </div>
          </aside>

          {/* Confirm */}
          <aside className="flex gap-5 py-5">
            <div>
              <img src={Approve2} alt="icon" width={24} height={24} />
            </div>
            <div className="flex flex-col items-start">
              <div className="text-[#202525] font-[500] text-[14px]">
                Confirm Listing
              </div>
              <div className="text-[#14142B] opacity-50 text-[13px] mt-2.5">
                You need to confirm that you want to list this template on
                buidlfy.
              </div>
              {!approveListingLoading && listTemplateLoading && (
                <div className="flex items-center gap-2 px-3.5 cursor-pointer py-5 bg-gray-200 text-[#14142B] mt-4 font-[500] text-[13px] rounded-[4px]">
                  <Spinner />
                  <span>confirming...</span>
                </div>
              )}
            </div>
          </aside>
        </section>
      </section>
    </Dialog.Panel>
  );
};

export default CompleteListing;
