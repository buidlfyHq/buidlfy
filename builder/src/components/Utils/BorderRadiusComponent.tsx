import React, { FC } from "react";
import "../../styles/Dashboard.css";
import "../../styles/Components.css";

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
  let decrementCounter = () => setBorderRadius(borderRadius - 1);
  if (borderRadius <= 1) {
    decrementCounter = () => setBorderRadius(1);
  }
  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (borderRadius) {
      setBorderRadius(+e.target.value);
    }
  };

  return (
    <>
      <div className="flex items-center w-full px-3 py-2 text-gray-600">
        <span className="px-1 text-left my-1 text-xl text-gray-500 font-regular font-normal not-italic">
          Border Radius{" "}
          <div className="flex mt-3">
            {" "}
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
                <option value={2}>2</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
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
