import React, { FC } from "react";
import "../../styles/Dashboard.css";
import "../../styles/Components.css";

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
  let decrementWidthCounter = () => setBorderWidth(borderWidth - 1);
  if (borderWidth <= 1) {
    decrementWidthCounter = () => setBorderWidth(1);
  }
  const handleWidthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (borderWidth) {
      setBorderWidth(+e.target.value);
    }
  };
  return (
    <>
      <div className="flex items-center w-full px-3 py-2 text-gray-600">
        <span className="px-1 text-left my-1 text-xl text-gray-500 font-regular font-normal not-italic">
          Border Width{" "}
          <div className="flex mt-3">
            {" "}
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
                aria-label="Default select example"
              >
                <option selected>{borderWidth}</option>
                <option value={1}>1</option>
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={7}>7</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
                <option value={12}>12</option>
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
      </div>
    </>
  );
};
export default BorderComponent;
