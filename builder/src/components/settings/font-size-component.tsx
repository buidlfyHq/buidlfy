import React, { FC } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import "styles/components.css";
import "styles/dashboard.css";

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

  const decrementCounter = () => {
    if (fontSize <= 1) {
      setFontSize(1);
    } else {
      setFontSize(fontSize - 1);
    }
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (fontSize) {
      setFontSize(+e.target.value);
    }
  };

  const options = [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96].map(
    (number) => (
      <option key={number} value={number}>
        {number}
      </option>
    )
  );

  return (
    <div className="flex text-gray-600 w-full mt-4 mx-2">
      <span className="text-left text-xl text-gray-500 font-regular font-normal not-italic">
        <div className="flex mt-3">
          <div className="flex">
            <span className="font-text">Font Size:</span>
            <select
              value={fontSize}
              onChange={(e) => handleSizeChange(e)}
              className="form-select font-div appearance-none block py-1.5 pl-[10.2rem] text-sm font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out focus:outline-none focus:shadow-none"
              aria-label="Default select example"
            >
              <option selected>{fontSize}</option>
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
  );
};
export default FontSizeComponent;
