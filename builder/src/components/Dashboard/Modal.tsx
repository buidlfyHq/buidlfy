import React, { FC, useState } from "react";
import { Dialog } from "@headlessui/react";

interface IModal {
  contractConfig: { abi: string; address: string };
  setContractConfig: (contractConfig: object) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: FC<IModal> = ({
  contractConfig,
  setContractConfig,
  isOpen,
  setIsOpen,
}) => {
  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="min-h-screen px-4 text-center">
        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="inline-block h-screen align-middle" aria-hidden="true">
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
            Connect Contract
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Add ABI and deployed contract address to connect your smart
              contract.
            </p>
            <input
              className="w-full mt-2 py-1 px-2 bg-white/90 rounded border"
              placeholder="Paste ABI here..."
              value={contractConfig.abi}
              onChange={(e) =>
                setContractConfig({ ...contractConfig, abi: e.target.value })
              }
            />
            <input
              className="w-full mt-2 py-1 px-2 bg-white/90 rounded border"
              placeholder="Paste address here..."
              value={contractConfig.address}
              onChange={(e) =>
                setContractConfig({
                  ...contractConfig,
                  address: e.target.value,
                })
              }
            />
          </div>

          <div className="mt-4">
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              onClick={() => setIsOpen(false)}
            >
              Connect
            </button>
          </div>
        </section>
      </div>
    </Dialog>
  );
};

export default Modal;
