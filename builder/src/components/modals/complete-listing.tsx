import { FC, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { CgClose } from "react-icons/cg";
import Spinner from "components/utils/assets/spinner";
import { toggleModal, toggleModalType } from "redux/modal/modal.reducers";
import Approve1 from "assets/approve-1.png";
import Approve2 from "assets/approve-2.png";

const CompleteListing: FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [confirmWait, setConfirmWait] = useState<boolean>(false);
  const [approvalText, setApprovalText] =
    useState<string>("Approve Collection");

  const handleApproval = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setApprovalText("Approved");
      setConfirm(true);
    }, 3000);
  };

  const handleConfirm = () => {
    setConfirmWait(true);
    setTimeout(() => {
      setConfirm(false);
      dispatch(toggleModalType("listing-review"));
    }, 3000);
  };

  return (
    <Dialog.Panel className="flex flex-col justify-center items-center w-full max-w-[527px] min-w-[330px] my-20 sm:mx-28 mx-12 rounded-[15px] bg-white">
      <div className="flex items-start justify-end w-full px-6 py-5">
        <CgClose
          onClick={() => dispatch(toggleModal(false))}
          className="text-[18px] cursor-pointer"
        />
      </div>
      <div className="flex flex-col items-center w-full px-10">
        <div className="text-[#14142B] font-[600] text-[20px] mb-6">
          Complete your listing
        </div>
        <div className="flex w-full justify-between items-center text-[#14142B]  text-[14px] my-5">
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
        </div>
        <div className="w-full border-top-divider-publish">
          <div className="flex gap-5 py-5">
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
              {loading ? (
                <div className="flex items-center gap-2 px-3.5 cursor-pointer py-3 bg-gray-200 text-[#14142B] mt-4 font-[500] text-[13px] rounded-[4px]">
                  <Spinner />
                  <span>waiting for approval...</span>
                </div>
              ) : (
                <div
                  className="px-3.5 cursor-pointer py-2.5 connect-wallet-button text-white mt-4 font-[500] text-[13px] rounded-[4px]"
                  onClick={handleApproval}
                >
                  {approvalText}
                </div>
              )}
            </div>
          </div>

          {!confirm ? (
            <div className="flex items-center gap-5 py-5 border-top-divider-publish">
              <div>
                <img src={Approve2} alt="icon" width={24} height={24} />
              </div>
              <div className="flex flex-col items-start">
                <div className="text-[#202525] font-[500] text-[14px]">
                  Confirm Listing
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-5 py-5">
              <div>
                <img src={Approve1} alt="icon" width={24} height={24} />
              </div>
              <div className="flex flex-col items-start">
                <div className="text-[#202525] font-[500] text-[14px]">
                  Confirm Listing
                </div>
                <div className="text-[#14142B] opacity-50 text-[13px] mt-2.5">
                  YOu need to confirm that you want to list this template on
                  buidlfy.
                </div>
                {confirmWait ? (
                  <div className="flex items-center gap-2 px-3.5 cursor-pointer py-5 bg-gray-200 text-[#14142B] mt-4 font-[500] text-[13px] rounded-[4px]">
                    <Spinner />
                    <span>confirming...</span>
                  </div>
                ) : (
                  <div
                    className="px-3.5 cursor-pointer py-2.5 connect-wallet-button text-white mt-4 font-[500] text-[13px] rounded-[4px]"
                    onClick={handleConfirm}
                  >
                    Confirm Listing
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Dialog.Panel>
  );
};

export default CompleteListing;
