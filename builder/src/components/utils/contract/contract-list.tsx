import { FC } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { IContract } from 'redux/contract/contract.interfaces';

interface IContractList {
  contract: IContract;
  handleContractList: () => void;
}

const ContractList: FC<IContractList> = ({ contract, handleContractList }) => {
  return (
    <div onClick={handleContractList} className="cursor-pointer flex flex-col justify-center contract-list">
      <span className="flex items-center">
        <span className="contract-name ml-[1rem] grow flex">{contract.name}</span>
        <FaChevronRight className="text-[10px] text-[#100F11] mr-[0.5rem]" />
      </span>
    </div>
  );
};

export default ContractList;
