import React, { useState, FC } from "react";
import { FaFileContract } from "react-icons/fa";
import Modal from "features/dashboard/modal";
import AbiMethods from "components/dashboard/abi-methods";
import AbiComponents from "components/dashboard/abi-components";
import { IWorkspaceElement } from "redux/workspace/workspace.interfaces";
import "styles/components.css";
import "styles/dashboard.css";

interface IAdvanceComponent {
  showComponent: {
    id: string;
    value: {
      name: string;
      inputs: object[];
      outputs: object[];
      stateMutability: string;
    };
  };
  setShowComponent: (showComponent: {
    id: string;
    value: {
      name: string;
      inputs: object[];
      outputs: object[];
      stateMutability: string;
    };
  }) => void;
  selectedItem: IWorkspaceElement;
}

const AdvanceComponent: FC<IAdvanceComponent> = ({
  showComponent,
  setShowComponent,
  selectedItem,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // for connect contract modal

  return (
    <>
      <div className="flex justify-center mt-[3rem]" />
      <h3 className="ml-[0.5rem]">
        <span className="setting-text">Import Contract</span>
      </h3>
      <p className="contract-text ml-[0.5rem]">
        Lorem ipsum dolor sit amet, sed do eiusmod
      </p>
      <div className="flex items-center px-3 mt-5 text-black">
        <div
          onClick={() => setIsOpen(true)}
          className="flex contract-button w-full py-2.5 pl-6 pr-7 ml-2"
        >
          <span className="mt-1 ml-4 mr-3">
            <FaFileContract />
          </span>{" "}
          Import Contract
          <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
      <br />
      <AbiMethods
        setShowComponent={setShowComponent}
        selectedItem={selectedItem}
      />
      <AbiComponents
        showComponent={showComponent}
        selectedItem={selectedItem}
      />
    </>
  );
};
export default AdvanceComponent;
