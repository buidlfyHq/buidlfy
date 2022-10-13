import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import { CgClose } from "react-icons/cg";
import { connectWallet } from "redux/web3/web3.actions";
import { toggleModal, toggleModalType } from "redux/modal/modal.reducers";
import { IRootState } from "redux/root-state.interface";
import MetamaskImg from "assets/icons/Metamask-icon.png";

const SelectWallet: FC = () => {
  const dispatch = useDispatch();
  const currentAccount = useSelector((state: IRootState) => state.web3.currentAccount);

  useEffect(() => {
    if (currentAccount) {
      dispatch(toggleModalType("checkout"));
    }
  }, [currentAccount]);

  return (
    <main className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-[8px]">
      <Dialog.Panel className="flex flex-col justify-center items-center w-full max-w-[464px] my-20 mx-28 rounded-[8px] py-7 px-8 bg-white">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div className="text-[#14142B] font-[600] text-[22px] ">
              Connect to a wallet
            </div>
            <CgClose
              className="text-[24px] cursor-pointer"
              onClick={() => dispatch(toggleModal(false))}
            />
          </div>
          <div
            onClick={() => dispatch(connectWallet())}
            className="flex items-center justify-between bg-[#F8F8FD] rounded-[8px] hover:bg-gray-100 p-4 text-[18px] mt-4 cursor-pointer hover:border hover:border-[#5799EB]"
          >
            <div>Metamask</div>
            <div className="p-1 bg-white rounded-[50%]">
              <img src={MetamaskImg} alt="img_temp" width={40} height={40} />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div className="text-[16px] text-[#636A7E]">New to Ethereum?</div>
            <a href="#" className="text-[16px] gradient-text ml-1">
              Learn more about wallets
            </a>
          </div>
        </div>
      </Dialog.Panel>
    </main>
  );
};

export default SelectWallet;
