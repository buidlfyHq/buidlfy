import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from '@headlessui/react';
import { setSiteHead, updateWorkspaceBackgroundColor, updateWorkspaceElementsArray } from 'redux/workspace/workspace.reducers';
import { toggleModal } from 'redux/modal/modal.reducers';
import { IRootState } from 'redux/root-state.interface';
import CongratulationsImg from 'assets/icons/congratulations.png';
import { ReactComponent as FeatherIcon } from 'assets/svg-as-icons/feather.svg';
import { updateContractAbi, updateContractAddress, updateContractNetwork } from 'redux/contract/contract.reducers';

const FinalModal: FC = () => {
  const dispatch = useDispatch();
  const selectedTemplate = useSelector((state: IRootState) => state.template.selectedTemplate);

  const handleClick = () => {
    dispatch(updateWorkspaceElementsArray(selectedTemplate.value));
    dispatch(updateWorkspaceBackgroundColor(selectedTemplate.backgroundColor));
    dispatch(setSiteHead(selectedTemplate.head));
    dispatch(updateContractAbi(JSON.stringify(selectedTemplate.contract.abi)));
    dispatch(updateContractAddress(selectedTemplate.contract.address));
    dispatch(updateContractNetwork(selectedTemplate.contract.network));
    dispatch(toggleModal(false));
  };

  return (
    <Dialog.Panel
      id="#confetti"
      className="relative flex flex-col justify-center items-center w-full max-w-[1140px] my-20 mx-28 rounded-[24px] py-20 lg:py-36 lg:px-64 px-28 bg-white "
    >
      <div>
        <img src={CongratulationsImg} alt="img_temp" width={50} height={60} />
      </div>
      <div className="font-[700] text-[40px] text-[#14142B] mt-9">Congratulations!</div>
      <div className="font-[700] max-w-[540px] text-center text-[16px] text-[#14142B] opacity-60 mt-6">
        Templated has been purchased and it is ready to use. Please click on the button given below to start using the template
      </div>
      <button
        onClick={handleClick}
        className="flex items-center text-white px-12 py-5 text-[20px] font-[600] connect-wallet-button rounded-[60px] mt-10 cursor-pointer"
      >
        Start Creating Now
        <FeatherIcon className="ml-3" />
      </button>
    </Dialog.Panel>
  );
};

export default FinalModal;
