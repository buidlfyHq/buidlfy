import React, { useState, FC } from "react";
import { FaFileContract } from "react-icons/fa";
import Modal from "components/Dashboard/Modal";
import AbiMethods from "components/Dashboard/AbiMethods";
import AbiComponent from "components/Dashboard/AbiComponent";
import IItems from "interfaces/items";
import "../../styles/Components.css";
import "../../styles/Dashboard.css";

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
  setShowComponent: (showComponent: { id: string; value: IItems }) => void;
  contractConfig: { abi: string; address: string };
  setContractConfig: (contractConfig: { abi: string; address: string }) => void;
  selectedItem: IItems;
  items: IItems[];
  setItems: (items: IItems[]) => void;
  elementConfig: object;
}

const AdvanceComponent: FC<IAdvanceComponent> = ({
  contractConfig,
  setContractConfig,
  showComponent,
  setShowComponent,
  selector,
  setSelector,
  elementConfig,
  selectedItem,
  items,
  setItems,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // for connect contract modal

  return (
    <>
      <div className="flex justify-center"></div>
      <div className="flex items-center px-3 mt-1 text-black">
        <div
          onClick={() => setIsOpen(true)}
          className="w-54 border h-11 py-2 px-2 flex w-15"
        >
          <span className="mr-3 ml-4 mt-1">
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
      <AbiComponent
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
