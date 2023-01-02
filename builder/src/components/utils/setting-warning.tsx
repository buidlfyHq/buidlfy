import { FC } from 'react';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import 'styles/components.css';

interface IWarningText {
  text: string;
}

const WarningText: FC<IWarningText> = ({ text }) => {
  return (
    <div className="bg-[#EFEDFD] rounded-[4px] pt-[1px] pb-3 px-2 mr-[0.6rem] ml-[0.3rem] mb-[0.5rem]">
      <div className="text-[10px] pt-[0.7rem] text-[#475385] flex">
        <span className="flex items-center">
          <IoMdInformationCircleOutline className="text-[15px]" />
        </span>

        <p className="ml-[0.3rem]">{text}</p>
      </div>
    </div>
  );
};

export default WarningText;
