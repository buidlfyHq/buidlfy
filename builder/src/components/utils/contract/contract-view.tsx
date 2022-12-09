import { FC } from 'react';
import { FaChevronRight } from 'react-icons/fa';

interface IContractView {
  handleShow: () => void;
  isViewMore: boolean;
}

const ContractView: FC<IContractView> = ({ handleShow, isViewMore }) => {
  return (
    <>
      {isViewMore ? (
        <span onClick={handleShow} className="text-[#458CDE] ml-[2rem] cursor-pointer flex items-center justify-end text-[9px] text-right underline">
          View More
          <FaChevronRight className="text-[7px] ml-[2px]" />
        </span>
      ) : null}
    </>
  );
};

export default ContractView;
