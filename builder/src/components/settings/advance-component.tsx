import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaFileContract } from "react-icons/fa";
import AbiMethods from "components/dashboard/abi-methods";
import AbiComponents from "components/dashboard/abi-components";
import ContractModal from "components/dashboard/contract-modal";
import OracleModal from "components/dashboard/oracle-modal";
import ContractList from "components/utils/contract/contract-list";
import ContractView from "components/utils/contract/contract-view";
import ContractHistory from "components/utils/contract/contract-history";
import ContractRemove from "components/utils/contract/contract-remove";
import OracleComponents from "components/dashboard/oracle-components";
import {
  updateContractAbi,
  updateContractAddress,
  updateContractList,
} from "redux/contract/contract.reducers";
import { IRootState } from "redux/root-state.interface";
import { IWorkspaceElement } from "redux/workspace/workspace.interfaces";
import { IContract } from "redux/contract/contract.interfaces";
import "styles/components.css";
import "styles/dashboard.css";

interface IAdvanceComponent {
  selectedElement: IWorkspaceElement;
}

const AdvanceComponent: FC<IAdvanceComponent> = ({ selectedElement }) => {
  const dispatch = useDispatch();
  const selectedContractAbi: string = useSelector(
    (state: IRootState) => state.contract.contractDetails.abi
  );
  const selectedContractAddress: string = useSelector(
    (state: IRootState) => state.contract.contractDetails.address
  );
  const updatedNewContractList: IContract[] = useSelector(
    (state: IRootState) => state.contract.contractList
  );
  const oracleId = useSelector(
    (state: IRootState) => state.oracle.oracleConfig.inputs[0]?.id
  );

  const [isOpen, setIsOpen] = useState<boolean>(false); // for connect contract modal
  const [isOracleOpen, setIsOracleOpen] = useState<boolean>(false); // for connect oracle modal
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

  useEffect(() => {
    try {
      setIsViewMore(!!(updatedNewContractList?.length >= 4));
    } catch (error) {
      console.log(error, "error");
    }
  }, []); // eslint-disable-line

  const handleContractList = (abi: string, address: string) => {
    dispatch(updateContractAbi(JSON.parse(abi)));
    dispatch(updateContractAddress(JSON.parse(address)));
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
      {selectedContractAbi && selectedContractAddress ? (
        <>
          <div className="flex justify-center mt-[3rem]" />
          <AbiMethods
            setShowComponent={setShowComponent}
            selectedElement={selectedElement}
            setIsOpen={setIsOpen}
          />
          <AbiComponents
            showComponent={showComponent}
            elementId={selectedElement.i}
          />
        </>
      ) : (
        <>
          {oracleId ? (
            <>
              <div className="flex justify-center mt-[3rem]" />
              <OracleComponents
                selectedElement={selectedElement}
                setIsOracleOpen={setIsOracleOpen}
              />
            </>
          ) : (
            <>
              <>
                <div className="flex justify-center mt-[3rem]" />
                <h3 className="ml-[0.5rem] mt-[2rem]">
                  <span className="setting-text">Import Contract</span>
                </h3>
                <p className="contract-text ml-[0.5rem]">
                  Integrate your Frontend with smart contracts.
                </p>
                <div className="flex items-center px-3 mt-5 text-black">
                  <div
                    onClick={() => setIsOpen(true)}
                    className="flex cursor-pointer contract-button w-full py-2.5 pl-6 pr-7 ml-2"
                  >
                    <span className="mt-1 ml-4 mr-3">
                      <FaFileContract />
                    </span>
                    Import Contract
                    <ContractModal isOpen={isOpen} setIsOpen={setIsOpen} />
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
                          handleContractList={() =>
                            handleContractList(text, address)
                          }
                        />
                      );
                    })}
                  <div className="flex items-center justify-end">
                    <ContractRemove handleClearContract={handleClearContract} />
                    <ContractView
                      isViewMore={isViewMore}
                      handleShow={handleShow}
                    />
                  </div>
                </div>
              </>
              <>
                <div className="flex justify-center mt-[2rem]" />
                <h3 className="ml-[0.5rem] flex items-center">
                  <span className="setting-text">Import Oracle</span>
                  <span className="text-[10px] text-[#14142B] ml-2 py-1 px-3 bg-gray-200 font-bold rounded-[28px]">
                    Powered by iExec
                  </span>
                </h3>
                <p className="contract-text ml-[0.5rem]">
                  Integrate your Frontend with oracles.
                </p>
                <div className="flex items-center px-3 mt-5 mb-[2rem] text-black">
                  <div
                    onClick={() => setIsOracleOpen(true)}
                    className="flex cursor-pointer contract-button w-full py-2.5 pl-6 pr-7 ml-2"
                  >
                    <span className="mt-1 ml-4 mr-3">
                      <FaFileContract />
                    </span>
                    Import Oracle
                    <OracleModal
                      isOracleOpen={isOracleOpen}
                      setIsOracleOpen={setIsOracleOpen}
                    />
                  </div>
                </div>
              </>
            </>
          )}
        </>
      )}
      <br />
    </>
  );
};
export default AdvanceComponent;
