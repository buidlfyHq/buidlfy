import React, { FC } from "react";
import ArrowInput from "./arrow-input";

interface INumberInput {
  text: string;
  value: number;
  handleChange: (e: number) => void;
  handleIncrement: () => void;
  handleDecrement: () => void;
}
const NumberInput: FC<INumberInput> = ({
  text,
  value,
  handleChange,
  handleIncrement,
  handleDecrement,
}) => {
  return (
    <div className="flex px-1 py-4">
      <div className="ml-3 margin-text flex w-[135px] mt-[5px] items-center">
        {text}
      </div>
      <ArrowInput
        value={value}
        handleChange={handleChange}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />
    </div>
  );
};

export default NumberInput;
