import React, { useState, FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaFileContract } from "react-icons/fa";
import Modal from "features/dashboard/modal";
import AbiMethods from "components/dashboard/abi-methods";
import AbiComponents from "components/dashboard/abi-components";
import { updateContractAbi } from "redux/contract/contract.reducers";
import { IWorkspaceElement } from "redux/workspace/workspace.interfaces";
import "styles/components.css";
import "styles/dashboard.css";

interface IAdvanceComponent {
  selectedElement: IWorkspaceElement;
}

interface IContract {
  name: string;
  text; // type to be added
}

const AdvanceComponent: FC<IAdvanceComponent> = ({ selectedElement }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false); // for connect contract modal
  const [methodOpen, setMethodOpen] = useState<boolean>(true);
  const [newContractList, setNewContractList] = useState<IContract[]>([]);
  const [showComponent, setShowComponent] = useState<{
    id: string;
    value: {
      name: string;
      inputs: object[];
      outputs: object[];
      stateMutability: string;
    };
  }>(null); // for abi method component

  useEffect(() => {
    try {
      const contractList = localStorage.getItem("contractList");
      const newContract = JSON.parse(contractList);
      setNewContractList(newContract);
    } catch (error) {
      console.log(error, "error");
    }
  }, []);

  const handleContractList = (abi: string) => {
    dispatch(updateContractAbi(JSON.parse(abi)));
    setMethodOpen(false);
  };

  return (
    <>
      {!methodOpen ? (
        <>
          <div className="flex justify-center mt-[3rem]" />
          <AbiMethods
            setShowComponent={setShowComponent}
            selectedElement={selectedElement}
            setMethodOpen={setMethodOpen}
            setIsOpen={setIsOpen}
          />
          <AbiComponents
            showComponent={showComponent}
            elementId={selectedElement.i}
          />
        </>
      ) : (
        <>
          <div className="flex justify-center mt-[3rem]" />
          <h3 className="ml-[0.5rem] mt-[2rem]">
            <span className="setting-text">Import Contract</span>
          </h3>
          <p className="contract-text ml-[0.5rem]">
            Lorem ipsum dolor sit amet, sed do eiusmod
          </p>
          <div className="flex items-center px-3 mt-5 mb-[2rem] text-black">
            <div
              onClick={() => setIsOpen(true)}
              className="flex cursor-pointer contract-button w-full py-2.5 pl-6 pr-7 ml-2"
            >
              <span className="mt-1 ml-4 mr-3">
                <FaFileContract />
              </span>
              Import Contract
              <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                methodOpen={methodOpen}
                setMethodOpen={setMethodOpen}
                setNewContractList={setNewContractList}
              />
            </div>
          </div>
          {newContractList ? (
            <>
              <span className="setting-text mt-[3rem] ml-[0.5rem]">
                Import History
              </span>
              <p className="contract-text ml-[0.5rem]">
                You can select the old file to continue
              </p>
            </>
          ) : null}

          <div className="grid grid-cols-3 gap-4 mt-[1rem] mx-3">
            {newContractList &&
              newContractList?.map((contract: IContract) => {
                const { name, text } = contract;
                return (
                  <div
                    onClick={() => handleContractList(text)}
                    className="cursor-pointer flex flex-col justify-center items-center contract-list"
                  >
                    <span className="contract-name">{name}</span>
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
