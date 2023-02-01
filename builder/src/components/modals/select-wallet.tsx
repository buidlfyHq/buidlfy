import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog } from '@headlessui/react';
import { CgClose } from 'react-icons/cg';
import { BiArrowBack } from 'react-icons/bi';
import Spinner from 'components/utils/assets/spinner';
import { fetchWalletDetailsAsync } from 'redux/web3/web3.thunk-actions';
import { toggleModal, toggleModalType } from 'redux/modal/modal.reducers';
import MetamaskImg from 'assets/icons/Metamask-icon.png';

const SelectWallet: FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleConnect = () => {
    setLoading(true);
    dispatch(fetchWalletDetailsAsync(''));
  };

  return (
    <Dialog.Panel className="flex flex-col justify-center items-center w-full max-w-[464px] my-20 mx-28 rounded-[8px] py-7 px-8 bg-white">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <BiArrowBack
            onClick={() => dispatch(toggleModalType('single'))}
            className="mb-2 text-[20px] duration-150 ease-linear scale-100 cursor-pointer hover:scale-125"
          />
          <CgClose className="text-[24px] cursor-pointer" onClick={() => dispatch(toggleModal(false))} />
        </div>
        <div className="text-[#14142B] font-[600] text-[22px] ">Connect to a wallet</div>
        <div
          onClick={handleConnect}
          className="flex items-center justify-between bg-[#F8F8FD] rounded-[8px] hover:bg-gray-100 p-4 text-[18px] mt-4 cursor-pointer hover:border hover:border-[#5799EB]"
        >
          <div>Metamask</div>
          <div className="p-1 rounded-[50%] flex">
            {loading && <Spinner />}
            <img src={MetamaskImg} alt="img_temp" width={40} height={40} />
          </div>
        </div>
        <div className="flex items-center mt-4">
          <div className="text-[16px] text-[#636A7E]">New to Ethereum?</div>
          <a href="#0" className="text-[16px] gradient-text ml-1">
            Learn more about wallets
          </a>
        </div>
      </div>
    </Dialog.Panel>
  );
};

export default SelectWallet;
