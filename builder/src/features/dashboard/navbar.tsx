import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { encode as base64_encode } from "base-64";
import { Dialog } from "@headlessui/react";
import { updateWorkspaceElementsArray } from "redux/workspace/workspace.reducers";
import { setSelectorToDefault } from "redux/selector/selector.reducers";
import { uploadFileToWeb3Storage } from "config/web3storage";
import IWorkspace from "interfaces/workspace";
import ITemplate from "interfaces/template";
import IColor from "interfaces/color";

interface INavbar {
  className: string;
  backgroundColor: string;
  head: {
    title: string;
    logo: string | ArrayBuffer;
  };
}

const Navbar: FC<INavbar> = ({ className, backgroundColor, head }) => {
  const dispatch = useDispatch();
  const workspaceElements: IWorkspace[] = useSelector(
    (state: any) => state.workspace.workspaceElements
  );
  const contract: { abi: string; address: string } = useSelector(
    (state: any) => state.contract
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [generatedConfig, setGeneratedConfig] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [file, setFile] = useState<string>("");

  useEffect(() => {
    if (contract.abi) {
      try {
        setAbiJSON(JSON.parse(contract.abi));
      } catch (error) {
        console.log(error);
      }
    }
  }, [contract.abi]);

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
    if (workspaceElements.length > 0) {
      localStorage.setItem("items", JSON.stringify(workspaceElements));
    }
  };

  const handleSaveTemplateButton = () => {
    setIsModalOpen(true);
  };

  const handleSaveTemplate = () => {
    // FIX: save full config to local storage
    let newTemplates: Array<ITemplate> = [];
    if (workspaceElements.length > 0) {
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
      background: backgroundColor,
      builder: workspaceElements,
      contract: {
        abi: abiJSON,
        address: contract.address,
      },
    };
    let stringifiedConfig = JSON.stringify(config);

    setGeneratedConfig(base64_encode(stringifiedConfig));
    setIsOpen(true);
  };

  return (
    <main
      className={
        !className
          ? `fixed left-[80px] right-0 h-[60px] top-0 border-b flex flex-row justify-between items-center p-3 bg-white z-20`
          : `h-[57px] w-full top-0 border-b flex flex-row justify-between items-center p-3 z-20`
      }
    >
      <div className="p-2 text-slate-600 text-[18px] hover:bg-slate-100 hover:rounded-md cursor-pointer">
        {className && <AiOutlineDoubleRight />}
      </div>
      <div className="flex flex-row h-[60px]">
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
        <button
          className="h-10 px-4 my-2 rounded cursor-pointer btn whitespace-nowrap"
          onClick={handlePublish}
        >
          Publish
        </button>
        <Dialog
          as="div"
          className="fixed inset-0 z-20 overflow-y-auto"
          open={isOpen}
          onClose={() => setIsOpen(false)}
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
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Generated base64 Config{" "}
              </Dialog.Title>
              <div className="mt-2">
                <p className="h-10 overflow-auto text-sm text-gray-500">
                  {generatedConfig}
                </p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedConfig);
                    setIsOpen(false);
                  }}
                >
                  Click here to copy Config
                </button>
              </div>
            </section>
          </div>
        </Dialog>
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
                <div className="px-1 text-left mt-3 text-gray-500 font-regular font-normal not-italic">
                  Name
                </div>
                <input
                  className="w-full mt-2 py-1 px-2 bg-white/90 rounded border"
                  placeholder="Name"
                  value={inputValue}
                  onChange={(e) => handleInput(e)}
                />
                <div className="px-1 text-left mt-6 text-gray-500 font-regular font-normal not-italic">
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
