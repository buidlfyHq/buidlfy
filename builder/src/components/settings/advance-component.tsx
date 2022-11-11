import React, { useState, FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaFileContract } from "react-icons/fa";
import ContractModal from "features/dashboard/contract-modal";
import AbiMethods from "components/dashboard/abi-methods";
import AbiComponents from "components/dashboard/abi-components";
import {
  updateContractAbi,
  updateContractAddress,
  updateContractList,
  updateContractNetwork,
} from "redux/contract/contract.reducers";
import { IWorkspaceElement } from "redux/workspace/workspace.interfaces";
import { useSelector } from "react-redux";
import { IRootState } from "redux/root-state.interface";
import { IContract } from "redux/contract/contract.interfaces";
import ContractList from "components/utils/contract/contract-list";
import ContractView from "components/utils/contract/contract-view";
import ContractHistory from "components/utils/contract/contract-history";
import ContractRemove from "components/utils/contract/contract-remove";
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
  const selectedContractNetwork: string = useSelector(
    (state: IRootState) => state.contract.contractDetails.network
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

  const handleContractList = (
    abi: string,
    address: string,
    network: string
  ) => {
    dispatch(updateContractAbi(JSON.parse(abi)));
    dispatch(updateContractAddress(JSON.parse(address)));
    dispatch(updateContractNetwork(JSON.parse(network)));
    setMethodOpen(false);
  };

  const handleShow = () => {
    setIsViewMore(false);
  };

  const paginatedContractList = isViewMore
    ? updatedNewContractList?.slice(0, 4)
    : updatedNewContractList;

  const handleClearContract = () => {
    localStorage.removeItem("contractList");
    dispatch(updateContractList(null));
    setIsViewMore(false);
  };
  return (
    <>
      {selectedContractAbi &&
      selectedContractAddress &&
      selectedContractNetwork ? (
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
            Integrate your Frontend with smart contracts.
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
              <ContractModal
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
                const { text, address, network } = contract;
                return (
                  <ContractList
                    contract={contract}
                    handleContractList={() =>
                      handleContractList(text, address, network)
                    }
                  />
                );
              })}
            <div className="flex items-center justify-end">
              <ContractRemove handleClearContract={handleClearContract} />
              <ContractView isViewMore={isViewMore} handleShow={handleShow} />
            </div>
          </div>
        </>
      )}
      <br />
    </>
  );
};
export default AdvanceComponent;
