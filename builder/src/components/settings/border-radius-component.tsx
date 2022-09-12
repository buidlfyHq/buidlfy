import React, { FC } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { replaceValue } from "components/utils/render-setting";
import "styles/components.css";
import "styles/dashboard.css";

interface IBorderRadiusComponent {
  borderRadius: number;
  setBorderRadius: (borderRadius: number) => void;
}

const BorderRadiusComponent: FC<IBorderRadiusComponent> = ({
  borderRadius,
  setBorderRadius,
}) => {
  // Derive best type of e
  const handleRadius = (e, action: replaceValue) => {
    if (action == replaceValue.INCREMENT) {
      setBorderRadius(borderRadius + 1);
    } else if (action == replaceValue.DECREMENT) {
      if (borderRadius <= 0) {
        setBorderRadius(0);
      } else {
        setBorderRadius(borderRadius - 1);
      }
    } else if (action == replaceValue.CHANGE) {
      setBorderRadius(+e.target.value);
    }
  };

  const options = [2, 4, 5, 7, 8, 10, 15, 20, 25].map((number) => (
    <option key={number} value={number}>
      {number}
    </option>
  ));

  return (
    <>
      <div className="flex text-gray-600 w-full mt-4 mx-2">
        <span className="text-left text-xl text-gray-500 font-regular font-normal not-italic">
          <div className="flex mt-3">
            <div className="flex">
              <span className="font-text">Border Radius:</span>
              <select
                value={borderRadius}
                onClick={(e) => handleRadius(e, replaceValue.CHANGE)}
                className="form-select font-div appearance-none block py-1.5 pl-[10.5rem] text-sm font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out focus:outline-none focus:shadow-none"
                aria-label="Default select example"
              >
                <option selected>{borderRadius}</option>
                {options}
              </select>
              <AiOutlineCaretUp
                onClick={(e) => handleRadius(e, replaceValue.INCREMENT)}
                className="text-[10px] absolute left-[13.2rem] text-black mt-[0.3rem]"
              />
              <AiOutlineCaretDown
                onClick={(e) => handleRadius(e, replaceValue.DECREMENT)}
                className="text-[10px] absolute left-[13.2rem] mt-[0.9rem] text-black"
              />
            </div>
          </div>
        </span>
      </div>
    </>
  );
};
export default BorderRadiusComponent;
