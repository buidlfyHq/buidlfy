import React, { FC } from "react";
import ArrowInput from "./arrow-input";

interface ISpaceInput {
  text: string;
  value: number;
  handleChange: (e) => void;
  handleIncrement: (e) => void;
  handleDecrement: (e) => void;
}
const SpaceInput: FC<ISpaceInput> = ({
  text,
  value,
  handleChange,
  handleIncrement,
  handleDecrement,
}) => {
  return (
    // <div className="flex px-1">
    //   <div className="ml-3 margin-text flex w-[135px] items-center">{text}</div>
    //   <ArrowInput
    //     value={value}
    //     handleChange={handleChange}
    //     handleIncrement={handleIncrement}
    //     handleDecrement={handleDecrement}
    //   />
    // </div>
    <div className="flex items-center w-full px-3 py-4 text-gray-600">
      <span className="px-1 text-left ">
        <span className="margin-text">Margin</span>
        <div className="flex mt-3">
          <h6 className="mr-2 margin-subtext">L</h6>
          <ArrowInput
            value={value}
            handleChange={handleChange}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
          <h6 className="ml-5 mr-2 margin-subtext">R</h6>
          <ArrowInput
            value={value}
            handleChange={handleChange}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
        </div>
        <div className="flex mt-3">
          <h6 className="mr-2 margin-subtext">T</h6>
          <ArrowInput
            value={value}
            handleChange={handleChange}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
          <h6 className="ml-5 mr-2 margin-subtext">B</h6>
          <ArrowInput
            value={value}
            handleChange={handleChange}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
        </div>
      </span>
    </div>
  );
};

export default SpaceInput;
