import React, { FC, useEffect, useState } from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { encode as base64_encode } from "base-64";
import { Dialog } from "@headlessui/react";
import IItems from "interfaces/items";
import IColor from "interfaces/color";

interface INavbar {
  className: string;
  setClassName: React.Dispatch<React.SetStateAction<string>>;
  items: IItems[];
  setItems: (items: IItems[]) => void;
  contractConfig: { abi: string; address: string };
  backgroundColor: IColor;
}

const Navbar: FC<INavbar> = ({
  className,
  setClassName,
  items,
  setItems,
  contractConfig,
  backgroundColor
}) => {
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
  const [generatedConfig, setGeneratedConfig] = useState<string>("");

  useEffect(() => {
    if (contractConfig.abi) {
      try {
        setAbiJSON(JSON.parse(contractConfig.abi));
      } catch (error) {
        console.log(error);
      }
    }
  }, [contractConfig.abi]);

  // const showSidebar = () => {
  //   setClassName("");
  // };

  const handleSave = () => {
    // FIX: save full config to local storage
    if (items?.length > 0) {
      localStorage.setItem("items", JSON.stringify(items));
    }
  };

  const handleClear = () => {
    // FIX: remove full config from local storage
    localStorage.removeItem("items");
    setItems([]);
  };

  const handlePublish = () => {
    let config = {
      background: backgroundColor,
      builder: items,
      contract: {
        abi: abiJSON,
        address: contractConfig.address,
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
          ? `fixed left-[250px] w-[calc(100%-250px)] h-[60px] top-0 border-b flex flex-row justify-between items-center p-3 bg-white`
          : `h-[60px] w-full top-0 border-b flex flex-row justify-between items-center p-3`
      }
    >
      <div
        // onClick={showSidebar}
        className="p-2 text-slate-600 text-[18px] hover:bg-slate-100 hover:rounded-md cursor-pointer"
      >
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
          className="fixed inset-0 z-10 overflow-y-auto"
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
      </div>
    </main>
  );
};

export default Navbar;
