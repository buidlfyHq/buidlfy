import React, { FC } from "react";
import "styles/components.css";
import "styles/dashboard.css";

interface IMarginComponent {
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  marginBottom: number;
  setMarginLeft?: (marginLeft: number) => void;
  setMarginRight?: (marginRight: number) => void;
  setMarginTop?: (marginTop: number) => void;
  setMarginBottom?: (marginBottom: number) => void;
}

const MarginComponent: FC<IMarginComponent> = ({
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  setMarginLeft,
  setMarginRight,
  setMarginTop,
  setMarginBottom,
}) => {
  const handleLeftChange = (e) => {
    setMarginLeft(+e.target.value);
  };
  const handleRightChange = (e) => {
    setMarginRight(+e.target.value);
  };
  const handleTopChange = (e) => {
    setMarginTop(+e.target.value);
  };
  const handleBottomChange = (e) => {
    setMarginBottom(+e.target.value);
  };

  return (
    <>
      <div className="flex items-center w-full px-3 py-2 text-gray-600">
        <span className="px-1 text-left my-1 text-xl text-gray-500 font-regular font-normal not-italic">
          Margin
          <div className="flex mt-3">
            <input
              type="number"
              id="margin-left"
              name="marginLeft"
              value={marginLeft}
              placeholder="left"
              className="form-select appearance-none block w-[70px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={(e) => handleLeftChange(e)}
            />
            <input
              type="number"
              id="margin-right"
              name="marginRight"
              value={marginRight}
              placeholder="right"
              className="form-select ml-10 appearance-none block w-[70px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={(e) => handleRightChange(e)}
            />
          </div>
          <div className="flex mt-3">
            <input
              type="number"
              id="margin-top"
              name="marginTop"
              value={marginTop}
              placeholder="top"
              className="form-select appearance-none block w-[70px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={(e) => handleTopChange(e)}
            />
            <input
              type="number"
              id="margin-bottom"
              name="marginBottom"
              value={marginBottom}
              placeholder="bottom"
              className="form-select ml-10 appearance-none block w-[70px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={(e) => handleBottomChange(e)}
            />
          </div>
        </span>
      </div>
    </>
  );
};
export default MarginComponent;
