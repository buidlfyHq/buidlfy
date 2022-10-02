import React, { FC } from "react";
import { Dialog } from '@headlessui/react'
import { useDispatch } from "react-redux";
import { toggleModalType } from "redux/modal/modal.reducers";

// interface ICheckoutModal {
//     isOpenCheckout: boolean;
//     setIsOpenCheckout: (isOpenCheckout: boolean) => void;
//     setIsOpenFinalTemplate: (isOpenFinalTemplate: boolean) => void;
// }

const CheckoutModal: FC = () => {
  const dispatch = useDispatch()
  return (
    <main className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-[8px]">
      <Dialog.Panel className="flex flex-col justify-center items-center w-full max-w-[342px] my-20 mx-28 rounded-[15px] py-8 px-5 bg-white">
        <div className="w-full">
          <div className="flex flex-col">
              <div className="text-[#1C1C1E] font-[600] text-[18px]">Checkout</div>
              <div className="text-[#4E4B66] opacity-70 text-[12px]">
                  You are about to purchase a <span className="text-[#4E4B66] opacity-100 font-[600]">Template Name</span> from
              </div>
              <div className="flex items-center mt-2">
                <div className="bg-[#9CB0D7] w-[32px] h-[32px] rounded-[50%] mt-30">
                  {" "}
                </div>
                <div className="ml-2 text-[12px] text-[#14142B] opacity-70">
                  0xBBB6...e96e
                </div>
              </div>
              <div className="mt-5 flex items-center bg-[#F8F8FD] rounded-[7px] p-4 text-[18px]">
                  <div className="bg-[#9CB0D7] w-[32px] h-[32px] rounded-[50%] mt-30">
                      {" "}
                  </div>
                  <div className="flex flex-col justify-start ml-2 text-[12px]">
                      <div className="flex items-center">
                          <div className="text-[#AEAEB2]">0xBBB6...e96e</div>
                          <div className="text-white text-[10px] bg-[#1B7D66] rounded-[4px] px-2 py-1 ml-3">Connected</div>
                      </div>
                      <div className="text-[#14142B] opacity-70 text-[12px]">120 USDT</div>
                  </div>
              </div>
              <div className="flex items-center justify-between mt-5">
                  <div className="text-[#8E8E93] text-[14px]">Amount</div>
                  <div className="text-[#1C1C1E] text-[14px] font-[500]">ETH 25</div>
              </div>
              <div className="flex items-center justify-between mt-3">
                  <div className="text-[#8E8E93] text-[14px]">Platform Fee (5%)</div>
                  <div className="text-[#1C1C1E] text-[14px] font-[500]">ETH 1.25</div>
              </div>
              <div className="flex items-center justify-between mt-3">
                  <div className="text-[#1C1C1E] text-[14px] font-[500]">Total</div>
                  <div className="text-[#34C759] text-[14px] font-[500]">ETH 26.25</div>
              </div>
              <div 
                  onClick={() => dispatch(toggleModalType("final"))}
                  className="text-white cursor-pointer connect-wallet-button py-3 px-auto rounded-[7px] mt-8 text-center"
              >
                  Buy Now
              </div>
          </div>
        </div>
      </Dialog.Panel>
    </main>
  );
};

export default CheckoutModal;
