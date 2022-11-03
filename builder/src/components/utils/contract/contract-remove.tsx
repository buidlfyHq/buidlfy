import { FC } from "react";
import { useSelector } from "react-redux";
import { IContract } from "redux/contract/contract.interfaces";
import { IRootState } from "redux/root-state.interface";

interface IContractRemove {
  handleClearContract: () => void;
}

const ContractRemove: FC<IContractRemove> = ({ handleClearContract }) => {
  const updatedNewContractList: IContract[] = useSelector(
    (state: IRootState) => state.contract.contractList
  );

  return (
    <>
      {updatedNewContractList ? (
        <span
          onClick={handleClearContract}
          className="cursor-pointer navbar-text flex items-center justify-end text-[9px] text-right hover:text-slate-700"
        >
          Remove All
        </span>
      ) : null}
    </>
  );
};

export default ContractRemove;
