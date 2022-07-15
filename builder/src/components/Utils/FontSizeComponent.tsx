import React, { FC } from "react";
import "../../styles/Components.css";
import "../../styles/Dashboard.css";

interface IFontSizeComponent {
  fontSize: number;
  setFontSize: (fontSize: number) => void;
}

const FontSizeComponent: FC<IFontSizeComponent> = ({
  fontSize,
  setFontSize,
}) => {
  const incrementCounter = () => {
    setFontSize(fontSize + 1);
  };
  let decrementCounter = () => setFontSize(fontSize - 1);
  if (fontSize <= 1) {
    decrementCounter = () => setFontSize(1);
  }
  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (fontSize) {
      setFontSize(+e.target.value);
    }
  };
  const numbers = [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96];
  const options = numbers.map((number) => (
    <option value={number}>{number}</option>
  ));
  return (
    <div className="flex items-center w-full px-3 py-2 text-gray-600">
      <span className="px-1 text-left my-1 text-xl text-gray-500 font-regular font-normal not-italic">
        Font Size
        <div className="flex mt-3">
          <span
            onClick={decrementCounter}
            className="flex items-center justify-center shadow text-[18px] mr-3 w-8 h-10 font-regular text-black"
          >
            -
          </span>
          <div className="xl:w-15">
            <select
              value={fontSize}
              onChange={(e) => handleSizeChange(e)}
              className="form-select appearance-none block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              aria-label="Default select example"
            >
              <option selected>{fontSize}</option>
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
  );
};
export default FontSizeComponent;
