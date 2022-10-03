import React, { FC, useState } from "react";
import { Dialog } from "@headlessui/react";
import HourGlassImg from "assets/hourglass.png";
import MintedTemplateModal from "./minted-template";
import { useDispatch } from "react-redux";
import { toggleModalType } from "redux/modal/modal.reducers";

const PublishSiteModal: FC<{generatedConfig:any}> = ({generatedConfig}) => {
  const dispatch = useDispatch()
  return (
    <main className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-[10px]">

        {/* Dialog Content */}
        <section className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex flex-col items-center justify-center">
            <img src={HourGlassImg} alt="icon" width={54} height={54} />
            <div className="font-[500] text-[20px] text-[#2C2D5E] mt-4">
              Site Publishing is in process
            </div>
            <div className="w-[300px] text-center text-[13px] text-[#2C2D5E] font-[300] opacity-60 mt-4">
              Site publishing could take up some minutes. Please bear with us
              once it is done.
            </div>
          </div>

          <Dialog.Title
            as="h3"
            className="mt-5 text-lg font-medium leading-6 text-gray-900"
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
                // setIsMintedOpen(true);
                dispatch(toggleModalType('publish-done'))
                navigator.clipboard.writeText(generatedConfig);
                // setIsOpen(false);
              }}
            >
              Click here to copy Config
            </button>
            {/* <MintedTemplateModal
              isMintedOpen={isMintedOpen}
              setIsMintedOpen={setIsMintedOpen}
            /> */}
          </div>
        </section>
      </main>
  );
};

export default PublishSiteModal;
