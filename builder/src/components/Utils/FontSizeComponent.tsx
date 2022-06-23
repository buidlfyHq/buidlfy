import React, { FC } from "react";
import "../../styles/Dashboard.css";
import "../../styles/Components.css";

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
  return (
    <div className="flex items-center w-full px-3 py-2 text-gray-600">
      <span className="px-1 text-left my-1 text-xl text-gray-500 font-regular font-normal not-italic">
        Font Size
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
              value={fontSize}
              onChange={(e) => handleSizeChange(e)}
              className="form-select appearance-none block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              aria-label="Default select example"
            >
              <option selected>{fontSize}</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={14}>14</option>
              <option value={18}>18</option>
              <option value={24}>24</option>
              <option value={30}>30</option>
              <option value={36}>36</option>
              <option value={48}>48</option>
              <option value={60}>60</option>
              <option value={72}>72</option>
              <option value={96}>96</option>
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
