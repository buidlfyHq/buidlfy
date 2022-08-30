import React, { useState, FC } from "react";
import { FaFileContract } from "react-icons/fa";
import Modal from "features/dashboard/modal";
import AbiMethods from "components/dashboard/abi-methods";
import AbiComponents from "components/dashboard/abi-components";
import IItems from "interfaces/items";
import "styles/components.css";
import "styles/dashboard.css";

interface IAdvanceComponent {
  selector: {
    methodName: string;
    type: string;
    name: string;
    buttonId: string;
  };
  setSelector: (selector: {
    methodName: string;
    type: string;
    name: string;
    buttonId: string;
  }) => void;
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
  contractConfig: { abi: string; address: string };
  setContractConfig: (contractConfig: { abi: string; address: string }) => void;
  selectedItem: IItems;
  items: IItems[];
  setItems: (items: IItems[]) => void;
  elementConfig: object;
}

const AdvanceComponent: FC<IAdvanceComponent> = ({
  selector,
  setSelector,
  showComponent,
  setShowComponent,
  contractConfig,
  setContractConfig,
  selectedItem,
  items,
  setItems,
  elementConfig,
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
          <Modal
            contractConfig={contractConfig}
            setContractConfig={setContractConfig}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      </div>
      <br />
      <AbiMethods
        contractConfig={contractConfig}
        setShowComponent={setShowComponent}
        selectedItem={selectedItem}
        items={items}
        setItems={setItems}
      />
      <AbiComponents
        showComponent={showComponent}
        selector={selector}
        setSelector={setSelector}
        elementConfig={elementConfig}
        selectedItem={selectedItem}
        items={items}
        setItems={setItems}
      />
    </>
  );
};
export default AdvanceComponent;
