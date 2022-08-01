import React, { FC } from "react";
import "styles/components.css";
import "styles/dashboard.css";

interface IPaddingComponent {
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  setPaddingLeft?: (paddingLeft: number) => void;
  setPaddingRight?: (paddingRight: number) => void;
  setPaddingTop?: (paddingTop: number) => void;
  setPaddingBottom?: (paddingBottom: number) => void;
}

const PaddingComponent: FC<IPaddingComponent> = ({
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  setPaddingLeft,
  setPaddingRight,
  setPaddingBottom,
  setPaddingTop,
}) => {
  const handleLeftChange = (e) => {
    setPaddingLeft(+e.target.value);
  };
  const handleRightChange = (e) => {
    setPaddingRight(+e.target.value);
  };
  const handleTopChange = (e) => {
    setPaddingTop(+e.target.value);
  };
  const handleBottomChange = (e) => {
    setPaddingBottom(+e.target.value);
  };

  return (
    <>
      <div className="flex items-center w-full px-3 py-2 text-gray-600">
        <span className="px-1 text-left my-1 text-xl text-gray-500 font-regular font-normal not-italic">
          Padding
          <div className="flex mt-3">
            <input
              type="number"
              id="padding-left"
              name="paddingLeft"
              value={paddingLeft}
              placeholder="left"
              className="form-select appearance-none block w-[70px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={(e) => handleLeftChange(e)}
            />
            <input
              type="number"
              id="padding-right"
              name="paddingRight"
              value={paddingRight}
              placeholder="right"
              className="form-select ml-10 appearance-none block w-[70px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={(e) => handleRightChange(e)}
            />
          </div>
          <div className="flex mt-3">
            <input
              type="number"
              id="padding-top"
              name="paddingTop"
              value={paddingTop}
              placeholder="top"
              className="form-select appearance-none block w-[70px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={(e) => handleTopChange(e)}
            />
            <input
              type="number"
              id="padding-bottom"
              name="paddingBottom"
              value={paddingBottom}
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
export default PaddingComponent;
