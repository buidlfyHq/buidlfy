import React, { useState, FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaFileContract } from "react-icons/fa";
import Modal from "features/dashboard/modal";
import AbiMethods from "components/dashboard/abi-methods";
import AbiComponents from "components/dashboard/abi-components";
import {
  updateContractAbi,
  updateContractAddress,
} from "redux/contract/contract.reducers";
import { IWorkspaceElement } from "redux/workspace/workspace.interfaces";
import { useSelector } from "react-redux";
import { IRootState } from "redux/root-state.interface";
import { IContract } from "redux/contract/contract.interfaces";
import ContractList from "components/utils/contract-list";
import ContractView from "components/utils/contract-view";
import ContractHistory from "components/utils/contract-history";
import "styles/components.css";
import "styles/dashboard.css";

interface IAdvanceComponent {
  selectedElement: IWorkspaceElement;
}

const AdvanceComponent: FC<IAdvanceComponent> = ({ selectedElement }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false); // for connect contract modal
  const [methodOpen, setMethodOpen] = useState<boolean>(false);
  const [showComponent, setShowComponent] = useState<{
    id: string;
    value: {
      name: string;
      inputs: object[];
      outputs: object[];
      stateMutability: string;
    };
  }>(null); // for abi method component
  const [isViewMore, setIsViewMore] = useState<boolean>(false);
  const selectedContractAbi: string = useSelector(
    (state: IRootState) => state.contract.contractDetails.abi
  );
  const selectedContractAddress: string = useSelector(
    (state: IRootState) => state.contract.contractDetails.address
  );
  const updatedNewContractList: IContract[] = useSelector(
    (state: IRootState) => state.contract.contractList
  );
  useEffect(() => {
    try {
      setIsViewMore(!!(updatedNewContractList?.length >= 4));
    } catch (error) {
      console.log(error, "error");
    }
  }, []);

  const handleContractList = (abi: string, address: string) => {
    dispatch(updateContractAbi(JSON.parse(abi)));
    dispatch(updateContractAddress(JSON.parse(address)));
    setMethodOpen(false);
  };

  const handleShow = () => {
    setIsViewMore(false);
  };

  const paginatedContractList = isViewMore
    ? updatedNewContractList?.slice(0, 4)
    : updatedNewContractList;

  return (
    <>
      {selectedContractAbi && selectedContractAddress ? (
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
              />
            </div>
          </div>
          <ContractHistory newContractList={updatedNewContractList} />
          <div className="grid grid-row-3 gap-4 mt-[1rem] mx-3">
            {paginatedContractList &&
              paginatedContractList.map((contract: IContract) => {
                const { text, address } = contract;
                return (
                  <ContractList
                    contract={contract}
                    handleContractList={() => handleContractList(text, address)}
                  />
                );
              })}
            <ContractView isViewMore={isViewMore} handleShow={handleShow} />
          </div>
        </>
      )}
      <br />
    </>
  );
};
export default AdvanceComponent;
