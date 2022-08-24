import React, { FC } from "react";
import "styles/components.css";
import "styles/dashboard.css";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

interface IBorderComponent {
  borderWidth: number;
  setBorderWidth: (borderWidth: number) => void;
}

const BorderComponent: FC<IBorderComponent> = ({
  borderWidth,
  setBorderWidth,
}) => {
  const incrementWidthCounter = () => {
    setBorderWidth(borderWidth + 1);
  };

  const decrementWidthCounter = () => {
    if (borderWidth <= 0) {
      setBorderWidth(0);
    } else {
      setBorderWidth(borderWidth - 1);
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (borderWidth) {
      setBorderWidth(+e.target.value);
    }
  };

  const renderOptions = [1, 3, 5, 7, 9, 10, 12].map((number) => (
    <option key={number} value={number}>
      {number}
    </option>
  ));

  return (
    <div className="flex text-gray-600 w-full mt-4 mx-2">
      <span className="text-left text-xl text-gray-500 font-regular font-normal not-italic">
        {/* Border Radius */}
        <div className="flex mt-3">
          {/* <span
          onClick={decrementCounter}
          className="flex items-center justify-center shadow text-[18px] mr-3 w-8 h-10 font-regular text-black"
        >
          -
        </span> */}
          <div className="flex">
            <span className="font-text">Border Width:</span>
            <select
              value={borderWidth}
              onChange={(e) => handleWidthChange(e)}
              className="form-select font-div appearance-none block py-1.5 pl-[10.5rem] text-sm font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out focus:outline-none focus:shadow-none"
              aria-label="select"
            >
              <option selected>{borderWidth}</option>
              {renderOptions}
            </select>
            <AiOutlineCaretUp
              onClick={incrementWidthCounter}
              className="text-[10px] absolute right-[1.5rem] text-black mt-[0.3rem]"
            />
            <AiOutlineCaretDown
              onClick={decrementWidthCounter}
              className="text-[10px] absolute right-[1.5rem] mt-[0.9rem] text-black"
            />
          </div>
          {/* <span
              onClick={incrementCounter}
              className="flex ml-3 items-center justify-center shadow text-[18px] w-8 h-10 font-regular text-black"
            >
              +
            </span> */}
        </div>
      </span>
    </div>
  );
};
export default BorderComponent;
