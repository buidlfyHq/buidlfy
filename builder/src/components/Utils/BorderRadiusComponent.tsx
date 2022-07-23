import React, { FC } from "react";
import "styles/Dashboard.css";
import "styles/Components.css";

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
    <option value={number}>{number}</option>
  ));

  return (
    <>
      <div className="flex items-center w-full px-3 py-2 text-gray-600">
        <span className="px-1 text-left my-1 text-xl text-gray-500 font-regular font-normal not-italic">
          Border Radius
          <div className="flex mt-3">
            <span
              onClick={decrementCounter}
              className="flex items-center justify-center shadow text-[18px] mr-3 w-8 h-10 font-regular text-black"
            >
              -
            </span>
            <div className="xl:w-15">
              <select
                value={borderRadius}
                onChange={(e) => handleSizeChange(e)}
                className="form-select appearance-none block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
                aria-label="Default select example"
              >
                <option selected>{borderRadius}</option>
                {options}
              </select>
            </div>
            <span
              onClick={incrementCounter}
              className="flex ml-3 items-center justify-center shadow text-[18px] w-8 h-10 font-regular text-black"
            >
              +
            </span>
          </div>
        </span>
      </div>
    </>
  );
};
export default BorderRadiusComponent;
