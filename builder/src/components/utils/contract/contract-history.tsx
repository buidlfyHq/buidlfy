import React, { FC } from "react";
import { IContract } from "redux/contract/contract.interfaces";

interface IContractHistory {
  newContractList: IContract[];
}

const ContractHistory: FC<IContractHistory> = ({ newContractList }) => {
  return (
    <>
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
    </>
  );
};

export default ContractHistory;
