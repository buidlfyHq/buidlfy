import { FC, useState } from "react";
import { Dialog } from "@headlessui/react";
import "styles/components.css";

interface IOracleModal {
  isOracleOpen: boolean;
  setIsOracleOpen: (isOracleOpen: boolean) => void;
}

const OracleModal: FC<IOracleModal> = ({ isOracleOpen, setIsOracleOpen }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-20 overflow-y-auto"
      open={isOracleOpen}
      onClose={() => setIsOracleOpen(false)}
    >
      <div className="min-h-screen px-4 text-right">
        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        {/* Use the overlay to style a dim backdrop for your dialog */}
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-10" />

        {/* Dialog Content */}
        <section className="inline-block w-[345px] mr-[12rem] mt-[10rem] max-w-md py-6 px-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <Dialog.Title as="h3" className="modal-heading">
            Connect Oracle
          </Dialog.Title>
          <div className="mt-2">
            <p className="modal-subheading mb-5">
              Add oracle id to connect your oracle.
            </p>
            <label className="modal-label">Oracle ID</label>
            <br />
            <input
              className="modal-input pl-2 h-[2.5rem] mt-1 mb-4"
              placeholder="Please add oracle id"
              value={inputValue}
              onChange={handleInput}
            />
          </div>

          <button
            disabled={!inputValue}
            className={`mt-4 rounded-[44px] contract-button font-medium text-white text-[14px] py-2 px-[7.5rem] ${
              inputValue ? "" : "opacity-40"
            }`}
            onClick={() => setIsOracleOpen(false)}
          >
            Connect
          </button>
        </section>
      </div>
    </Dialog>
  );
};

export default OracleModal;
