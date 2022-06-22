import React, { FC, useState } from "react";
import { Dialog } from "@headlessui/react";
import { AiOutlineDoubleRight, AiOutlineEye } from "react-icons/ai";
import { MdUndo, MdRedo } from "react-icons/md";
import { encode as base64_encode } from "base-64";

const Navbar: FC<{
  className: string;
  setClassName: any;
  items;
  contractConfig;
}> = ({ className, setClassName, items, contractConfig }) => {
  const abiJSON = contractConfig.abi ? JSON.parse(contractConfig.abi) : null;
  const [isOpen, setIsOpen] = useState(false);
  const [generatedConfig, setGeneratedConfig] = useState<string>("");

  const showSidebar = () => {
    setClassName("");
  };

  return (
    <main
      className={
        className === ""
          ? `fixed left-[250px] w-[calc(100%-250px)] h-[60px] top-0 border-b z-1200 flex flex-row justify-between items-center p-3`
          : `h-[60px] w-full top-0 border-b z-1200 flex flex-row justify-between items-center p-3`
      }
    >
      <div
        onClick={showSidebar}
        className="p-2 text-slate-600 text-[18px] hover:bg-slate-100 hover:rounded-md cursor-pointer"
      >
        {className !== "" && <AiOutlineDoubleRight />}
      </div>
      <div className="flex flex-row">
        <div className="flex flex-row items-center mx-2 text-[18px] text-slate-600">
          <span className="mx-1 p-2 hover:bg-slate-100 hover:rounded-md cursor-pointer">
            <MdUndo />
          </span>
          <span className="mx-1 p-2 hover:bg-slate-100 hover:rounded-md cursor-pointer">
            <MdRedo />
          </span>
        </div>
        <div className="flex items-center p-2 mx-3 my-3 cursor-pointer text-slate-500 hover:bg-slate-100 hover:text-slate-700 hover:rounded-md">
          <span className="mr-1">
            <AiOutlineEye />
          </span>
          Preview
        </div>

        <button
          className="btn rounded cursor-pointer whitespace-nowrap px-4 h-10 my-5"
          onClick={() => {
            let config = {
              builder: items,
              contract: {
                abi: abiJSON,
                address: contractConfig.address,
              },
            };
            let stringifiedConfig = JSON.stringify(config);
            setGeneratedConfig(base64_encode(stringifiedConfig));
            setIsOpen(true);
          }}
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
                <p className="text-sm text-gray-500 overflow-auto h-10">
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
