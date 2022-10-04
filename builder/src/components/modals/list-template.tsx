import React, { FC } from "react";
import { Dialog } from '@headlessui/react'
import IconImg from 'assets/icon-crypto.png'
import { useDispatch } from "react-redux";
import { toggleModal } from "redux/modal/modal.reducers";

const ListTemplate: FC = () => {
  const dispatch = useDispatch()
  return (
      <Dialog.Panel className="flex flex-col justify-center items-center w-full max-w-[475px] min-w-[330px] my-20 sm:mx-28 mx-12 rounded-[15px] py-8 px-10 bg-white">
          <div className="w-full">
            <div className="flex flex-col">
                <div className="text-[#202525] font-[500] text-[20px]">List template for sale</div>
                <div className="flex items-center text-[#14142B] opacity-70 text-[14px] mt-1">
                    <div>Cryptin Next Gen Template</div>
                    <div className="ml-2 py-[6px] px-3 bg-gray-100 text-[12px] font-[500] rounded-[4px] text-[#14142B]">Crypto</div>
                </div>
                <div className="mt-4 mb-8 h-40 flex items-center bg-[#F8F8FD] rounded-[7px] p-4 text-[18px]">
                  {" "}
                </div>
                <form className="flex flex-col">
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
                </form>
                <div className="bg-[#F7F6FC] rounded-[8px] py-5 px-6 mt-6">
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
                </div>
                <div className="flex items-center justify-end gap-4 mt-7">
                  <div 
                        onClick={() => dispatch(toggleModal(false))}
                        className="bg-[#E7E7E7] text-[13px] py-3 px-10 text-[#1C1C1E] cursor-pointer rounded-[4px] font-[500]"
                    >
                      Cancel
                  </div>
                  <div 
                      // onClick={handleClick}
                      className="bg-[#8268E5] text-[13px] font-[500] text-white cursor-pointer py-3 px-6 rounded-[4px]"
                  >
                      Continue to list
                  </div>
                </div>
            </div>
          </div>
        </Dialog.Panel>
  );
};

export default ListTemplate;
