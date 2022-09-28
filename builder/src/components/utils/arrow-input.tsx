import React, { FC } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

interface IArrowInput {
  text: string;
  value: number;
  handleChange: (e) => void;
  handleIncrement: (e) => void;
  handleDecrement: (e) => void;
}
const ArrowInput: FC<IArrowInput> = ({
  text,
  value,
  handleChange,
  handleIncrement,
  handleDecrement,
}) => {
  return (
    <div className="flex px-1">
      <div className="ml-3 margin-text w-[140px] flex items-center">{text}</div>
      <div className="flex justify-end text-gray-600 py-4">
        <input
          inputMode="numeric"
          value={`${value}px`}
          placeholder="0"
          className="margin-form pl-2 py-1.5 relative form-select appearance-none block w-[75px]"
          onChange={handleChange}
        />
        <AiOutlineCaretUp
          onClick={handleIncrement}
          className="text-[10px] arrow absolute left-[13.5rem] mt-[0.3rem] cursor-pointer"
        />
        <AiOutlineCaretDown
          onClick={handleDecrement}
          className="text-[10px] arrow absolute left-[13.5rem] mt-[0.9rem] cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ArrowInput;
