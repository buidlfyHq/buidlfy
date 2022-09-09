import React, { FC } from "react";
import "styles/components.css";
import "styles/dashboard.css";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

interface IBorderRadiusComponent {
  borderRadius: number;
  setBorderRadius: (borderRadius: number) => void;
}

const BorderRadiusComponent: FC<IBorderRadiusComponent> = ({
  borderRadius,
  setBorderRadius,
}) => {
  const incrementCounter = () => {
    setBorderRadius(borderRadius + 1);
  };

  const decrementCounter = () => {
    if (borderRadius <= 0) {
      setBorderRadius(0);
    } else {
      setBorderRadius(borderRadius - 1);
    }
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (borderRadius) {
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
                onChange={(e) => handleSizeChange(e)}
                className="form-select font-div appearance-none block py-1.5 pl-[10.5rem] text-sm font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out focus:outline-none focus:shadow-none"
                aria-label="Default select example"
              >
                <option selected>{borderRadius}</option>
                {options}
              </select>
              <AiOutlineCaretUp
                onClick={incrementCounter}
                className="text-[10px] absolute left-[13.2rem] text-black mt-[0.3rem]"
              />
              <AiOutlineCaretDown
                onClick={decrementCounter}
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
