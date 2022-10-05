import React, { FC, useState } from "react";
import { Dialog } from '@headlessui/react'
import { useDispatch } from "react-redux";
import { toggleModal, toggleModalType } from "redux/modal/modal.reducers";
import { CgClose } from "react-icons/cg";
import Approve1 from 'assets/approve-1.png'
import Approve2 from 'assets/approve-2.png'
import Spinner from "components/utils/spinner";

const CompleteListing: FC = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const handleApproval = () => {
    setLoading(true)
    setTimeout(() => dispatch(toggleModalType('listing-review')), 3000)
  }
  return (
    <Dialog.Panel className="flex flex-col justify-center items-center w-full max-w-[527px] min-w-[330px] my-20 sm:mx-28 mx-12 rounded-[15px] bg-white">
    <div className="flex items-start justify-end w-full py-5 px-6">
        <CgClose onClick={() => dispatch(toggleModal(false))} className="text-[18px] cursor-pointer" />
    </div>
    <div className="w-full items-center flex flex-col px-10">
        <div className="text-[#14142B] font-[600] text-[20px] mb-6">Complete your listing</div>
        <div className="flex w-full justify-between items-center text-[#14142B]  text-[14px] my-5">
            <div className="flex items-center gap-6">
                    <div className="h-[54px] w-[54px] flex items-center bg-[#9F74FB] rounded-[2px] p-4 text-[18px]">
                        {" "}
                    </div>
                    <div className="flex flex-col items-start">
                        <div className="text-[#14142B] opacity-50 font-[500] tex-[12px] ">Crypto</div>
                        <div className="text-[#14142B] font-[600] text-[14px] whitespace-nowrap">Cryptin Next Gen Template</div>
                        <div className="text-[#14142B] opacity-50 font-[500] tex-[12px] ">Quantity: 1</div>
                    </div>
            </div>
            <div className="flex flex-col items-end">
                <div className="text-[#14142B] opacity-50 font-[500] text-[12px] ">Price</div>
                <div className="text-[#14142B] font-[700] text-[14px]">123.00</div>
                <div className="text-[#14142B] opacity-50 font-[500] text-[12px] ">$1234767.00 USD</div>
            </div>
        </div>
        <div className="border-top-divider-publish w-full">
       
            <div className="flex gap-5 py-5">
              <div><img src={Approve1} alt="icon" width={35} height={35} /></div>
              <div className="flex flex-col items-start">
                <div className="text-[#202525] font-[500] text-[14px]">Approve Collection</div>
                <div className="text-[#14142B] opacity-50 text-[13px] mt-2.5">You’ll be asked to approve this collection from your wallet. You only need to approve each collection once. </div>
                { loading ? (
                  <div className="flex items-center gap-2 px-3.5 cursor-pointer py-3 bg-gray-200 text-[#14142B] mt-4 font-[500] text-[13px] rounded-[4px]">
                    <Spinner />
                    <span>waiting for approval...</span>
                  </div>
                ) : (
                  <div 
                    className="px-3.5 cursor-pointer py-2.5 connect-wallet-button text-white mt-4 font-[500] text-[13px] rounded-[4px]"
                    onClick={handleApproval}
                  >
                    Approve Collection
                  </div>
                )}
                
              </div>
            </div>

            <div className="flex items-center gap-5 py-5 border-top-divider-publish">
              <div><img src={Approve2} alt="icon" width={24} height={24} /></div>
              <div className="flex flex-col items-start">
                <div className="text-[#202525] font-[500] text-[14px]">Confirm Listing</div>
              </div>
            </div>

        </div>
          
          {/* <form className="flex flex-col">
            <div className="font-[500] text-[13px] text-[#23314B] ">Price Details</div>
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <img src={IconImg} alt="icon" width={24} height={24} />
              </div>
              <input
                  type="text"
                  id="simple-search"
                  className="border border-[#C4C4C4] text-[#23314B] text-[13px] rounded-[8px] focus:ring-[#dee0e9] focus:border-[#dee0e9] block w-full pl-11 py-2.5"
                  placeholder="Amount"
                  required
              />
            </div>
          </form> */}
          {/* <div className="bg-[#F7F6FC] rounded-[8px] py-5 px-6 mt-6">
            <div className="flex items-center justify-between">
                <div className="text-[#8E8E93] text-[14px]">Amount</div>
                <div className="text-[#1C1C1E] opacity-60 text-[14px] font-[500]">ETH 25</div>
            </div>
            <div className="flex items-center justify-between mt-3">
                <div className="text-[#8E8E93] text-[14px]">Platform Fee (5%)</div>
                <div className="text-[#1C1C1E] opacity-60 text-[14px] font-[500]">ETH 1.25</div>
            </div>
            <div className="flex items-center justify-between mt-3">
                <div className="text-[#1C1C1E] text-[14px] font-[500]">Total</div>
                <div className="text-[#1C1C1E] text-[16px] font-[700]">ETH 26.25</div>
            </div>
            <div className="flex items-center justify-end mt-3">
                <div className="text-[#14142B] opacity-50 text-[14px] font-[500]">~$12,343.00 USD</div>
            </div>
          </div> */}
          {/* <div className="flex items-center justify-end gap-4 mt-7">
            <div 
                  onClick={() => dispatch(toggleModal(false))}
                  className="bg-[#E7E7E7] text-[13px] py-3 px-10 text-[#1C1C1E] cursor-pointer rounded-[4px] font-[500]"
              >
                Cancel
            </div>
            <div 
                // onClick={() => dispatch(toggleModalType('listing-review'))}
                className="bg-[#8268E5] text-[13px] font-[500] text-white cursor-pointer py-3 px-6 rounded-[4px]"
            >
                Continue to list
            </div>
          </div> */}
        </div>
  </Dialog.Panel>
  );
};

export default CompleteListing;
