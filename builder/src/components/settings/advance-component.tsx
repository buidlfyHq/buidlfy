import React, { useState, FC, useEffect } from "react";
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
interface IContract {
  name: string;
  text;
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
  const [methodOpen, setMethodOpen] = useState<boolean>(true);
  const [newContractList, setNewContractList] = useState<IContract[]>([]);
  useEffect(() => {
    try {
      const contractList = localStorage.getItem("contractList");
      const newContract = JSON.parse(contractList);
      setNewContractList(newContract);
    } catch (error) {
      console.log(error, "error");
    }
  }, []);

  const handleClick = (abi: string) => {
    setContractConfig({ ...contractConfig, abi: JSON.parse(abi) });
    setMethodOpen(false);
  };
  return (
    <>
      {!methodOpen ? (
        <>
          <div className="flex justify-center mt-[3rem]" />

          <AbiMethods
            contractConfig={contractConfig}
            setShowComponent={setShowComponent}
            selectedItem={selectedItem}
            items={items}
            setItems={setItems}
            methodOpen={methodOpen}
            setMethodOpen={setMethodOpen}
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
      ) : (
        <>
          <div className="flex justify-center mt-[3rem]" />
          <h3 className="ml-[0.5rem]">
            <span className="setting-text">Import Contract</span>
          </h3>
          <p className="contract-text ml-[0.5rem]">
            Lorem ipsum dolor sit amet, sed do eiusmod
          </p>
          <div className="flex items-center px-3 mt-5 mb-[2rem] text-black">
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
                methodOpen={methodOpen}
                setMethodOpen={setMethodOpen}
                setNewContractList={setNewContractList}
              />
            </div>
          </div>
          <span className="setting-text mt-[3rem] ml-[0.5rem]">
            Import History
          </span>
          <p className="contract-text ml-[0.5rem]">
            You can select the old file to continue{" "}
          </p>
          <div className="grid grid-cols-3 gap-2 mt-[1rem]">
            {newContractList &&
              newContractList?.map((contract: IContract) => {
                const { name, text } = contract;
                return (
                  <div
                    onClick={() => handleClick(text)}
                    className="cursor-pointer flex flex-col justify-center items-center contract-list"
                  >
                    <div className="margin-text contract-name">{name}</div>
                  </div>
                );
              })}
          </div>
        </>
      )}
      <br />
    </>
  );
};
export default AdvanceComponent;
