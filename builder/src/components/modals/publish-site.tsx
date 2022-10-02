import React, { FC, useState } from "react";
import { Dialog } from "@headlessui/react";
import HourGlassImg from "assets/hourglass.png";
import MintedTemplateModal from "./minted-template";

interface IPublishSiteModal {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  generatedConfig: string;
}

const PublishSiteModal: FC<IPublishSiteModal> = ({
  isOpen,
  setIsOpen,
  generatedConfig,
}) => {
  const [isMintedOpen, setIsMintedOpen] = useState<boolean>(false);
  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-20 overflow-y-auto"
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
                setIsMintedOpen(true);
                navigator.clipboard.writeText(generatedConfig);
                setIsOpen(false);
              }}
            >
              Click here to copy Config
            </button>
            <MintedTemplateModal
              isMintedOpen={isMintedOpen}
              setIsMintedOpen={setIsMintedOpen}
            />
          </div>
        </section>
      </div>
    </Dialog>
  );
};

export default PublishSiteModal;
