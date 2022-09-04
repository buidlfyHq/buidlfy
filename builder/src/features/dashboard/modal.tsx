import React, { FC, useState } from "react";
import { Dialog } from "@headlessui/react";
import upload from "assets/upload-img.png";
import "styles/components.css";

interface IModal {
  contractConfig: { abi: string; address: string };
  setContractConfig: (contractConfig: object) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  methodOpen: boolean;
  setMethodOpen: (methodOpen: boolean) => void;
  setNewContractList: (newContractList: IContract[]) => void;
}
interface IContract {
  name: string;
  text;
}
const Modal: FC<IModal> = ({
  contractConfig,
  setContractConfig,
  isOpen,
  setIsOpen,
  methodOpen,
  setMethodOpen,
  setNewContractList,
}) => {
  // const [showInput, setShowInput] = useState<boolean>(false);
  const [showUpload, setShowUpload] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>("");
  const [files, setFiles] = useState<string | ArrayBuffer>("");
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleSaveContract = () => {
    // FIX: save full config to local storage
    let newContractList: Array<IContract> = [];
    let newContract: IContract = {
      name: inputValue,
      text: JSON.stringify(contractConfig.abi),
    };
    // localStorage.setItem("items", JSON.stringify(items));
    const contractList = localStorage.getItem("contractList") || "";
    if (contractList !== "") {
      newContractList = JSON.parse(contractList);
    } else {
      newContractList = [];
    }
    newContractList.push(newContract);
    localStorage.setItem("contractList", JSON.stringify(newContractList));
    setNewContractList(newContractList);
  };
  const handleShow = () => {
    setShowUpload(false);
  };
  const handleSetAbi = (abi: string) => {
    // keep type = function, remove other types
    const filteredAbi = JSON.parse(abi).filter(
      (m: { type: string }) => m.type === "function"
    );
    setContractConfig({ ...contractConfig, abi: JSON.stringify(filteredAbi) });
  };
  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      setFiles(e.target.result);
      handleSetAbi(e.target.result.toString());
    };
  };

  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-20 overflow-y-auto"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="min-h-screen px-4 text-right">
        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        {/* Use the overlay to style a dim backdrop for your dialog */}
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-10" />

        {/* Dialog Content */}
        <section className="inline-block w-[340px] mr-[12rem] mt-[10rem] max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <Dialog.Title as="h3" className="modal-heading">
            Connect Contract
          </Dialog.Title>
          <div className="mt-2">
            <p className="modal-subheading mb-5">
              Add ABI and deployed contract address to connect your smart
              contract.
            </p>
            <label className="modal-label">Contract Name</label>
            <br />
            <input
              value={inputValue}
              onChange={(e) => handleInput(e)}
              className="modal-input pl-2 mt-1 mb-4"
              placeholder="Please add a name"
            />
            <br /> <label className="modal-label mt-[3rem]">Abi Code</label>
            <br />
            {showUpload ? (
              <div className="modal-upload">
                <label>
                  <div className="flex justify-center">
                    <img
                      className="modal-img align-middle mt-[2rem]"
                      src={upload}
                    />
                  </div>
                  <span className="modal-text mt-[1.5rem]">
                    Please upload the json file here
                  </span>

                  <div className="flex justify-center">
                    <input
                      onChange={(e) => handleChange(e)}
                      className="upload-input"
                      type="file"
                      id="inputTag"
                    />
                    <button className="contract-button mt-[0.75rem] px-5 py-1">
                      Browse
                    </button>
                    <br />
                  </div>
                  {files ? (
                    <div className="modal-text">File Uploaded</div>
                  ) : null}
                </label>
                {/* {"uploaded file content -- " + files} */}
                <span
                  onClick={() => handleShow()}
                  className="modal-text mt-[0.5rem] cursor-pointer"
                >
                  Add Code Manually
                </span>
              </div>
            ) : (
              <textarea
                className="upload-modal-input p-2"
                placeholder="Paste ABI here..."
                value={contractConfig.abi}
                onChange={(e) => handleSetAbi(e.target.value)}
              />
            )}
            <br />
            <label className="modal-label">Address</label>
            <br />
            <input
              className="modal-input pl-2 mt-1"
              placeholder="Paste Address here..."
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
              className="contract-button inline-flex flex contract-button py-2 px-[7.5rem]"
              onClick={() => {
                setIsOpen(false);
                setMethodOpen(false);
                handleSaveContract();
              }}
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
