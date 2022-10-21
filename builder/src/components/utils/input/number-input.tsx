import { FC } from "react";
import ArrowInput from "./arrow-input";

interface INumberInput {
  text: string;
  value: number;
  handleChange: (e: number) => void;
  handleIncrement: () => void;
  handleDecrement: () => void;
  disableInput?: boolean;
}

const NumberInput: FC<INumberInput> = ({
  text,
  value,
  handleChange,
  handleIncrement,
  handleDecrement,
  disableInput,
}) => {
  return (
    <div className="flex px-1 py-4">
      <div className="ml-3 margin-text flex w-[135px] mt-[5px] items-center">
        {text}
      </div>
      <ArrowInput
        disableInput={disableInput}
        value={value}
        handleChange={handleChange}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />
    </div>
  );
};

export default NumberInput;
