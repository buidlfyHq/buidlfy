import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog } from '@headlessui/react';
import { toggleModal, toggleModalType } from 'redux/modal/modal.reducers';
import { ReactComponent as ScratchIcon } from 'assets/modal-icons/scratch-icon.svg';
import { ReactComponent as TemplateIcon } from 'assets/modal-icons/template-icon.svg';

const StartModal: FC = () => {
  const dispatch = useDispatch();

  return (
    <Dialog.Panel className="rounded-[24px] py-16 px-20 bg-white rounded-[24px] flex flex-row justify-start items-center gap-16">
      <div className="flex flex-col items-center w-[300px] h-[280px] relative">
        <span className="absolute right-[-13%] w-[1px] h-[260px] bg-gray-200"> </span>
        <ScratchIcon />
        <div className="mt-6 text-[22px] text-center text-[#14142B] font-[800]">Start from Scratch</div>
        <div className="mt-3 text-[15px] text-[#4E4B66] text-center">Create a website from scratch by using our easy no code builder</div>
        <div
          onClick={() => dispatch(toggleModal(false))}
          className="mt-10 rounded-[28px] connect-wallet-button px-9 py-4 text-white text-[16px] text-center font-[600] cursor-pointer"
        >
          Create from Scratch
        </div>
      </div>
      <div className="flex flex-col items-center w-[300px] h-[280px]">
        <TemplateIcon />
        <div className="mt-6 text-[22px] text-center text-[#14142B] font-[800]">Start from a Template</div>
        <div className="mt-3 text-[15px] text-[#4E4B66] text-center">Select over with different templates to create a stunning wesite</div>
        <div
          onClick={() => dispatch(toggleModalType('template'))}
          className="mt-10 rounded-[28px] connect-wallet-button px-9 py-4 text-white text-[16px] text-center font-[600] cursor-pointer"
        >
          Start from a template
        </div>
      </div>
    </Dialog.Panel>
  );
};

export default StartModal;
