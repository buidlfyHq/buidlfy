import React, { FC } from "react";
import { Dialog } from '@headlessui/react'

interface IListTemplate {
    isOpenListForSale: boolean;
    setIsOpenListForSale: (isOpenListForSale: boolean) => void;
}

const ListTemplate: FC<IListTemplate> = ({
    isOpenListForSale,
    setIsOpenListForSale,
}) => {
  const handleClick = () => {
    setIsOpenListForSale(false)
  }
  return (
    <Dialog
      className="relative z-50"
      open={isOpenListForSale}
      onClose={() => setIsOpenListForSale(false)}
    >
      <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-[8px]">
        <Dialog.Panel className="flex flex-col justify-center items-center w-full max-w-[527px] my-20 mx-28 rounded-[15px] py-8 px-10 bg-white">
          <div className="w-full">
            <div className="flex flex-col">
                <div className="text-[#202525] font-[500] text-[20px]">List template for sale</div>
                <div className="flex items-center text-[#14142B] opacity-70 text-[14px] mt-3">
                    <div>Cryptin Next Gen Template</div>
                    <div className="ml-2 py-[6px] px-3 bg-gray-100 text-[12px] font-[500] text-[#14142B]">Crypto</div>
                </div>
                <div className="flex items-center mt-2">
                    {" "}
                  {/* <div className="bg-[#9CB0D7] w-[32px] h-[32px] rounded-[50%] mt-30">
                    {" "}
                  </div>
                  <div className="ml-2 text-[12px] text-[#14142B] opacity-70">
                    0xBBB6...e96e
                  </div> */}
                </div>
                <div className="mt-5 h-24 flex items-center bg-[#F8F8FD] rounded-[7px] p-4 text-[18px]">
                    {/* <div className="bg-[#9CB0D7] w-[32px] h-[32px] rounded-[50%] mt-30"> */}
                        {" "}
                    {/* </div>
                    <div className="flex flex-col justify-start ml-2 text-[12px]">
                        <div className="flex items-center">
                            <div className="text-[#AEAEB2]">0xBBB6...e96e</div>
                            <div className="text-white text-[10px] bg-[#1B7D66] rounded-[4px] px-2 py-1 ml-3">Connected</div>
                        </div>
                        <div className="text-[#14142B] opacity-70 text-[12px]">120 USDT</div>
                    </div> */}
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
                    onClick={handleClick}
                    className="text-white cursor-pointer connect-wallet-button py-3 px-auto rounded-[7px] mt-8 text-center"
                >
                    Buy Now
                </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ListTemplate;
