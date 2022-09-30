import React, { FC } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

interface IArrowInput {
  value: number;
  handleChange: (e: number) => void;
  handleIncrement: () => void;
  handleDecrement: () => void;
}
const ArrowInput: FC<IArrowInput> = ({
  value,
  handleChange,
  handleIncrement,
  handleDecrement,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const replaceValue = +e.target.value.replace(/[^0-9]/g, "");
    handleChange(replaceValue);
  };

  return (
    <div className="flex justify-end text-gray-600 py-[5px]">
      <input
        value={`${value}px`}
        placeholder="0"
        className="margin-form pl-2 py-1.5 relative form-select appearance-none block w-[75px]"
        onChange={(e) => handleInputChange(e)}
      />
      <AiOutlineCaretUp
        onClick={handleIncrement}
        className="text-[10px] arrow absolute mr-[0.5rem] mt-[0.3rem] cursor-pointer"
      />
      <AiOutlineCaretDown
        onClick={handleDecrement}
        className="text-[10px] arrow absolute mr-[0.5rem] mt-[0.9rem] cursor-pointer"
      />
    </div>
  );
};

export default ArrowInput;
