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
  console.log(value, "value");
  const handleInputChange = (newValue) => {
    console.log(newValue, "newValue");
    const replaceValue = +newValue.replace(/[^0-9]/g, "");
    console.log(replaceValue, "rv");
    handleChange(replaceValue);
  };

  return (
    <div className="flex px-1">
      <div className="ml-3 margin-text flex w-[135px] items-center">{text}</div>
      <div className="flex justify-end text-gray-600 py-4">
        <div className="relative flex flex-wrap items-stretch">
          <input
            type="text"
            placeholder="0"
            value={value}
            onChange={handleChange}
            className="margin-form pl-2 py-1.5 relative form-select appearance-none block w-[75px]"
          />
          <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
            <i className="fas fa-user"></i>
          </span>
          {/* <span className="z-10 h-full leading-snug text-[9.7px] absolute text-center text-black absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-10 py-2.5">
            px
          </span> */}
        </div>
        {/* <input
          //   type="text"
          //   inputMode="numeric"
          value={`${value}px`}
          placeholder="0"
          className="margin-form pl-2 py-1.5 relative form-select appearance-none block w-[75px]"
          onChange={(e) => handleInputChange(e.target.value)}
        /> */}
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
