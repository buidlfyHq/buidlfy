import React, { FC } from "react";
import "styles/components.css";
import "styles/dashboard.css";
import "styles/components.css";

interface IMarginComponent {
  margin?: {
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
  };
  setMarginLeft?: (marginLeft: number) => void;
  setMarginRight?: (marginRight: number) => void;
  setMarginTop?: (marginTop: number) => void;
  setMarginBottom?: (marginBottom: number) => void;
}

const MarginComponent: FC<IMarginComponent> = ({
  margin,
  setMarginLeft,
  setMarginRight,
  setMarginTop,
  setMarginBottom,
}) => {
  const handleLeftChange = (e) => {
    setMarginLeft(+e.target.value);
  };
  const handleRightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarginRight(+e.target.value);
  };
  const handleTopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarginTop(+e.target.value);
  };
  const handleBottomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarginBottom(+e.target.value);
  };

  return (
    <>
      <div className="flex items-center w-full px-3 py-2 text-gray-600">
        <span className="px-1 text-left my-1 text-xl text-gray-500 font-regular font-normal not-italic">
          <span className="margin-text"> Margin</span>
          <div className="flex mt-3">
            <h6 className="mr-2 margin-subtext">L</h6>
            <input
              type="number"
              value={margin.marginLeft}
              placeholder="0"
              className="margin-form pl-2 form-select appearance-none block w-[70px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={(e) => handleLeftChange(e)}
            />
            <h6 className="ml-5 mr-2 margin-subtext">R</h6>
            <input
              type="number"
              value={margin.marginRight}
              placeholder="0"
              className="margin-form pl-2 form-select appearance-none block w-[70px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={handleRightChange}
            />
          </div>
          <div className="flex mt-3">
            <h6 className="mr-2 margin-subtext">T</h6>
            <input
              type="number"
              value={margin.marginTop}
              placeholder="0"
              className="margin-form pl-2 form-select appearance-none block w-[70px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={handleTopChange}
            />
            <h6 className="ml-5 mr-2 margin-subtext">B</h6>
            <input
              type="number"
              value={margin.marginBottom}
              placeholder="0"
              className="margin-form pl-2 form-select appearance-none block w-[70px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={handleBottomChange}
            />
          </div>
        </span>
      </div>
    </>
  );
};
export default MarginComponent;
