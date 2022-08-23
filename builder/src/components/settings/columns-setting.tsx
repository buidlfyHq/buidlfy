import React, { FC } from "react";
import "styles/components.css";
import "styles/dashboard.css";

interface IColumnNumberComponent {
  columns: number;
  setColumnNumber: (columns: number) => void;
}

const ColumnNumberComponent: FC<IColumnNumberComponent> = ({
    columns,
    setColumnNumber,
}) => {
  const incrementCounter = () => {
    // let col = 6/
    setColumnNumber(columns + 1);
  };

  const decrementCounter = () => {
    if (columns <= 0) {
      setColumnNumber(0);
    } else {
      setColumnNumber(columns - 1);
    }
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (columns) {
      setColumnNumber(+e.target.value);
    }
  };

  const options = [1,2,3,4,5,6].map((number) => (
    <option key={number} value={number}>
      {number}
    </option>
  ));

  return (
    <>
      <div className="flex items-center w-full px-3 py-2 text-gray-600">
        <span className="px-1 my-1 text-xl not-italic font-normal text-left text-gray-500 font-regular">
          Select number of Cols:
          <div className="flex mt-3">
            <span
              onClick={decrementCounter}
              className={`${columns === 1 ? 'hidden' : null} flex items-center justify-center shadow text-[18px] mr-3 w-8 h-10 font-regular text-black`}
            >
              -
            </span>
            <div className="xl:w-15">
              <select
                value={columns}
                onChange={(e) => handleSizeChange(e)}
                className="form-select appearance-none block w-8 h-10 px-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
                aria-label="Default select example"
              >
                <option selected>{columns}</option>
                {options}
              </select>
            </div>
            <span
              onClick={incrementCounter}
              className={`${columns === 6 ? 'hidden' : null} flex ml-3 items-center justify-center shadow text-[18px] w-8 h-10 font-regular text-black`}
            >
              +
            </span>
          </div>
        </span>
      </div>
    </>
  );
};
export default ColumnNumberComponent;
