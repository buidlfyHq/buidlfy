import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { encode as base64_encode } from 'base-64';
import { Dialog } from '@headlessui/react';
import { CgClose } from 'react-icons/cg';
import { initiatePublish } from 'redux/publish/publish.action';
import { toggleModal, toggleModalType } from 'redux/modal/modal.reducers';
import { updatePublishConfig } from 'redux/publish/publish.reducers';
import { IRootState } from 'redux/root-state.interface';
import { fontOptions } from 'components/utils/font-option';
import 'styles/components.css';

const PublishConfirmModal: FC = () => {
  const dispatch = useDispatch();
  const workspaceElements = useSelector((state: IRootState) => state.workspace.workspaceElements);
  const workspaceBackgroundColor = useSelector((state: IRootState) => state.workspace.workspaceBackgroundColor);
  const head = useSelector((state: IRootState) => state.workspace.head);
  const contractDetails = useSelector((state: IRootState) => state.contract.contractDetails);
  const currentStep = useSelector((state: IRootState) => state.publish.currentStep);

  const [abiJSON, setAbiJSON] = useState<
    {
      inputs: { internalType: string; name: string; type: string }[];
      name: string;
      outputs: { internalType: string; name: string; type: string }[];
      stateMutability: string;
      type: string;
    }[]
  >([]);

  useEffect(() => {
    if (contractDetails.abi) {
      try {
        setAbiJSON(JSON.parse(contractDetails.abi));
      } catch (error) {
        console.log(error);
      }
    }
  }, [contractDetails.abi]); // eslint-disable-line

  useEffect(() => {
    if (currentStep > 0) {
      handleProcessModal();
    }
  }, [currentStep]); // eslint-disable-line

  const handleProcessModal = () => {
    dispatch(toggleModal(true));
    dispatch(toggleModalType('publish-process'));
  };

  const handlePublish = () => {
    const fontsList = [];
    workspaceElements.forEach(workspaceElement => {
      const elementFontFamily = workspaceElement?.style?.fontFamily;
      const font = fontOptions.find(fontOption => fontOption.value === elementFontFamily);
      if (!fontsList.includes(font?.label)) {
        fontsList.push(font?.label);
      }
    });
    localStorage.removeItem('deployment');
    let config = {
      head: {
        title: head.title,
        logo: head.logo,
      },
      fonts: fontsList,
      background: workspaceBackgroundColor,
      builder: workspaceElements,
      contract: {
        abi: abiJSON,
        address: contractDetails.address,
        network: contractDetails.network,
      },
    };
    let stringifiedConfig = JSON.stringify(config);
    // Keep this commented log. Helpful while testing.
    console.log(base64_encode(stringifiedConfig));

    // dispatch(updatePublishConfig(base64_encode(stringifiedConfig)));
    // // will add config , done for testing purposes
    // localStorage.setItem('config', base64_encode(stringifiedConfig));

    // if (currentStep === 0) {
    //   handleProcessModal();
    //   dispatch(initiatePublish({ configDetails: base64_encode(stringifiedConfig) }));
    // } else {
    //   handleProcessModal();
    // }
  };

  return (
    <>
      <Dialog.Panel className="rounded-[24px] py-5 px-5 bg-white rounded flex flex-row justify-start items-center gap-6">
        <div className="flex flex-col items-center w-[350px] h-[140px] relative">
          <div className="flex justify-end w-full mr-2">
            <CgClose onClick={() => dispatch(toggleModal(false))} className="text-[1rem] cursor-pointer text-[#14142B] " />
          </div>
          <p className="mt-4 font-semibold">Are you sure you want to continue deploying?</p>
          <div className="flex justify-end w-full mt-8 mr-2">
            <button
              className="bordered-button py-2 px-7 my-2 ml-3 text-[14px] text-[#855FD8] font[500] rounded-[10px] whitespace-nowrap"
              onClick={() => dispatch(toggleModal(false))}
            >
              Cancel
            </button>
            <button
              onClick={handlePublish}
              className="py-2 px-7 my-2 ml-3 font-[500] text-[14px] text-white rounded-[10px] connect-wallet-button whitespace-nowrap add-btn"
            >
              Publish
            </button>
          </div>
        </div>
      </Dialog.Panel>
    </>
  );
};

export default PublishConfirmModal;
