import React, { FC } from "react";
import "styles/Dashboard.css";
import "styles/Components.css";

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
    if (borderWidth <= 1) {
      setBorderWidth(1);
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
    <option value={number}>{number}</option>
  ));

  return (
    <section className="flex items-center w-full px-3 py-2 text-gray-600">
      <span className="px-1 text-left my-1 text-xl text-gray-500 font-regular font-normal not-italic">
        Border Width
        <div className="flex mt-3">
          <span
            onClick={decrementWidthCounter}
            className="flex items-center justify-center shadow text-[18px] mr-3 w-8 h-10 font-regular text-black"
          >
            -
          </span>
          <div className="xl:w-15">
            <select
              value={borderWidth}
              onChange={(e) => handleWidthChange(e)}
              className="form-select appearance-none block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              aria-label="select"
            >
              <option selected>{borderWidth}</option>
              {renderOptions}
            </select>
          </div>
          <span
            onClick={incrementWidthCounter}
            className="flex ml-3 items-center justify-center shadow text-[18px] w-8 h-10 font-regular text-black"
          >
            +
          </span>
        </div>
      </span>
    </section>
  );
};
export default BorderComponent;
