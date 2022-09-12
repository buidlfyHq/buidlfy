import React, { FC } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { replaceValue } from "components/utils/render-setting";
import "styles/components.css";
import "styles/dashboard.css";

interface IBorderComponent {
  borderWidth: number;
  setBorderWidth: (borderWidth: number) => void;
}

const BorderComponent: FC<IBorderComponent> = ({
  borderWidth,
  setBorderWidth,
}) => {
  // Derive best type of e
  const handleWidth = (e, action: replaceValue) => {
    if (action == replaceValue.INCREMENT) {
      setBorderWidth(borderWidth + 1);
    } else if (action == replaceValue.DECREMENT) {
      if (borderWidth <= 0) {
        setBorderWidth(0);
      } else {
        setBorderWidth(borderWidth - 1);
      }
    } else if (action == replaceValue.CHANGE) {
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
        <div className="flex mt-3">
          <div className="flex">
            <span className="font-text">Border Width:</span>
            <select
              value={borderWidth}
              onClick={(e) => handleWidth(e, replaceValue.CHANGE)}
              className="form-select font-div appearance-none block py-1.5 pl-[10.5rem] text-sm font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out focus:outline-none focus:shadow-none"
              aria-label="select"
            >
              <option selected>{borderWidth}</option>
              {renderOptions}
            </select>
            <AiOutlineCaretUp
              onClick={(e) => handleWidth(e, replaceValue.INCREMENT)}
              className="text-[10px] absolute left-[13.2rem] text-black mt-[0.3rem]"
            />
            <AiOutlineCaretDown
              onClick={(e) => handleWidth(e, replaceValue.DECREMENT)}
              className="text-[10px] absolute left-[13.2rem] mt-[0.9rem] text-black"
            />
          </div>
        </div>
      </span>
    </div>
  );
};
export default BorderComponent;
