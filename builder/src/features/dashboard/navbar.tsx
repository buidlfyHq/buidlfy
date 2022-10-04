import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { encode as base64_encode } from "base-64";
import { Dialog } from "@headlessui/react";
import MintTemplateModal from "components/modals/mint-template-form";
import PublishSiteModal from "components/modals/publish-site";
import { updateWorkspaceElementsArray } from "redux/workspace/workspace.reducers";
import { setSelectorToDefault } from "redux/contract/contract.reducers";
import { uploadFileToWeb3Storage } from "config/web3storage";
import { IRootState } from "redux/root-state.interface";
import { Menu } from '@headlessui/react'
import {
  ITemplate,
  IWorkspaceElement,
} from "redux/workspace/workspace.interfaces";
import { IContractDetails } from "redux/contract/contract.interfaces";
import "styles/components.css";
import { Link } from "react-router-dom";
import { toggleModal, toggleModalType } from "redux/modal/modal.reducers";
import TemplateModal from "./template-modal";

interface INavbar {
  className: string;
  workspaceBackgroundColor: string;
  head: {
    title: string;
    logo: string | ArrayBuffer;
  };
}

const Navbar: FC<INavbar> = ({ className, workspaceBackgroundColor, head }) => {
  const dispatch = useDispatch();
  const workspaceElements: IWorkspaceElement[] = useSelector(
    (state: IRootState) => state.workspace.workspaceElements
  );
  const contractDetails: IContractDetails = useSelector(
    (state: IRootState) => state.contract.contractDetails
  );

  const [abiJSON, setAbiJSON] = useState<
    {
      inputs: { internalType: string; name: string; type: string }[];
      name: string;
      outputs: { internalType: string; name: string; type: string }[];
      stateMutability: string;
      type: string;
    }[]
  >([]); // work in progress
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [generatedConfig, setGeneratedConfig] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [file, setFile] = useState<string>("");

  useEffect(() => {
    if (contractDetails.abi) {
      try {
        setAbiJSON(JSON.parse(contractDetails.abi));
      } catch (error) {
        console.log(error);
      }
    }
  }, [contractDetails.abi]);

  // find suitable type
  const onChangeImage = (e) => {
    if (e.target.files[0]) {
      if (e.target.files[0].size > 5242880) {
        // setSize(true);
      } else {
        // setSize(false);
        const reader = new FileReader();
        reader.addEventListener("load", async () => {
          const cid = await uploadFileToWeb3Storage(reader.result as string);
          setFile(cid);
        });
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    // FIX: save full config to local storage
    if (workspaceElements?.length > 0) {
      localStorage.setItem("items", JSON.stringify(workspaceElements));
    }
  };

  const handleSaveTemplateButton = () => {
    setIsModalOpen(true);
  };

  const handleSaveTemplate = () => {
    // FIX: save full config to local storage
    let newTemplates: ITemplate[] = [];
    if (workspaceElements?.length > 0) {
      localStorage.setItem("items", JSON.stringify(workspaceElements));
      const templates = localStorage.getItem("templates") || "";
      if (templates !== "") {
        newTemplates = JSON.parse(templates);
      } else {
        newTemplates = [];
      }
      let newTemplate = {
        name: inputValue,
        value: workspaceElements,
        image: file,
      };

      newTemplates.push(newTemplate);
      localStorage.setItem("templates", JSON.stringify(newTemplates));
    }
  };

  const handleClear = () => {
    // FIX: remove full config from local storage
    localStorage.removeItem("items");
    dispatch(updateWorkspaceElementsArray([]));
    dispatch(setSelectorToDefault());
  };

  const handlePublish = () => {
    let config = {
      head: {
        title: head.title,
        logo: head.logo,
      },
      background: workspaceBackgroundColor,
      builder: workspaceElements,
      contract: {
        abi: abiJSON,
        address: contractDetails.address,
      },
    };
    let stringifiedConfig = JSON.stringify(config);

    setGeneratedConfig(base64_encode(stringifiedConfig));
    dispatch(toggleModal(true))
    dispatch(toggleModalType('publish-process'))
  };

  const handleMintTemplateForm = () => {
    dispatch(toggleModal(true))
    dispatch(toggleModalType('mint-nft-form'))
  } 

  return (
    <main
      className={
        !className
          ? `fixed left-[80px] right-0 h-[60px] top-0 topnav flex flex-row justify-between items-center p-3 bg-white z-20`
          : `h-[57px] w-full top-0 topnav flex flex-row justify-between items-center p-3 z-20`
      }
    >
      <div className="p-2 text-slate-600 text-[18px] hover:bg-slate-100 hover:rounded-md cursor-pointer">
        {className && <AiOutlineDoubleRight />}
      </div>
      <div className="flex flex-row items-center h-[60px]">
        <div className="flex flex-row items-center">
          <div
            onClick={handleClear}
            className="flex items-center p-2 mx-3 my-2 cursor-pointer text-slate-500 hover:bg-slate-100 hover:text-slate-700 hover:rounded-md"
          >
            Clear
          </div>
          <div
            onClick={handleSave}
            className="flex items-center p-2 mx-3 my-2 cursor-pointer text-slate-500 hover:bg-slate-100 hover:text-slate-700 hover:rounded-md"
          >
            Save
          </div>
          <div
            onClick={handleSaveTemplateButton}
            className="flex items-center p-2 mx-3 my-2 cursor-pointer text-slate-500 hover:bg-slate-100 hover:text-slate-700 hover:rounded-md"
          >
            Save As Template
          </div>
        </div>
        {/* It will be used for the later code for undo, redo and preview of website */}
        {/* <div className="flex flex-row items-center mx-2 text-[18px] text-slate-600">
          <span className="p-2 mx-1 cursor-pointer hover:bg-slate-100 hover:rounded-md">
            <MdUndo />
          </span>
          <span className="p-2 mx-1 cursor-pointer hover:bg-slate-100 hover:rounded-md">
            <MdRedo />
          </span>
        </div>
        <div className="flex items-center p-2 mx-3 my-2 cursor-pointer text-slate-500 hover:bg-slate-100 hover:text-slate-700 hover:rounded-md">
          <span className="mr-1">
            <AiOutlineEye />
          </span>
          Preview
        </div> */}
        <div 
          className="bordered-button text-[14px] text-[#855FD8] font[500] py-2 px-6 cursor-pointer"
          onClick={handleMintTemplateForm}
        >
          Mint as NFT
        </div>
        <button
          className="py-2 px-7 ml-3 font-[500] text-[14px] text-white rounded-[10px] cursor-pointer connect-wallet-button whitespace-nowrap"
          onClick={handlePublish}
        >
          Publish
        </button>

        {/* profile menu */}
        
        <Menu>
          <Menu.Button className="relative">
            <div className="my-3 ml-2 bg-[#9CB0D7] w-[32px] h-[32px] rounded-[50%] mt-30">{" "}</div>
          </Menu.Button>
          <Menu.Items className="absolute h-full top-0 right-0 flex flex-col w-56 px-4 py-2 mt-16 shadow-lg mr-5 rounded-[8px] origin-top-right bg-white" >
            <Menu.Item>
              {({ active }) => (
                <Link to='/my-templates' className={`${active && 'bg-slate-100 rounded-[8px] cursor-pointer'} font-[500] px-4 py-2 font-[16px]`}>
                  My Templates
                </Link>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>

        <TemplateModal generatedConfig={generatedConfig} />
        <Dialog
          as="div"
          className="fixed inset-0 z-20 overflow-y-auto"
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            {/* Use the overlay to style a dim backdrop for your dialog */}
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            {/* Dialog Content */}
            <section className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="mt-2">
                <div className="px-1 mt-3 not-italic font-normal text-left text-gray-500 font-regular">
                  Name
                </div>
                <input
                  className="w-full px-2 py-1 mt-2 border rounded bg-white/90"
                  placeholder="Name"
                  value={inputValue}
                  onChange={(e) => handleInput(e)}
                />
                <div className="px-1 mt-6 not-italic font-normal text-left text-gray-500 font-regular">
                  Upload Image
                </div>
                {/* Input required and function added in next branch            */}
                <input
                  onChange={onChangeImage}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 file:cursor-pointer"
                  type="file"
                  id="formFile"
                />

                <img src={file} alt="Template" />
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={() => {
                    setIsModalOpen(false);
                    handleSaveTemplate();
                  }}
                >
                  Save As Template
                </button>
              </div>
            </section>
          </div>
        </Dialog>
      </div>
    </main>
  );
};

export default Navbar;
