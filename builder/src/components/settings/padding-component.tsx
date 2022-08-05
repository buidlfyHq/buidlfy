import React, { FC } from "react";
import "styles/components.css";
import "styles/dashboard.css";

interface IPaddingComponent {
  padding?: {
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
  };
  setPaddingLeft?: (paddingLeft: number) => void;
  setPaddingRight?: (paddingRight: number) => void;
  setPaddingTop?: (paddingTop: number) => void;
  setPaddingBottom?: (paddingBottom: number) => void;
}

const PaddingComponent: FC<IPaddingComponent> = ({
  padding,
  setPaddingLeft,
  setPaddingRight,
  setPaddingBottom,
  setPaddingTop,
}) => {
  const handleLeftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaddingLeft(+e.target.value);
  };
  const handleRightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaddingRight(+e.target.value);
  };
  const handleTopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaddingTop(+e.target.value);
  };
  const handleBottomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
              value={padding.paddingLeft}
              placeholder="left"
              className="form-select appearance-none block w-[70px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={handleLeftChange}
            />
            <input
              type="number"
              id="padding-right"
              name="paddingRight"
              value={padding.paddingRight}
              placeholder="right"
              className="form-select ml-10 appearance-none block w-[70px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={handleRightChange}
            />
          </div>
          <div className="flex mt-3">
            <input
              type="number"
              id="padding-top"
              name="paddingTop"
              value={padding.paddingTop}
              placeholder="top"
              className="form-select appearance-none block w-[70px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={handleTopChange}
            />
            <input
              type="number"
              id="padding-bottom"
              name="paddingBottom"
              value={padding.paddingBottom}
              placeholder="bottom"
              className="form-select ml-10 appearance-none block w-[70px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={handleBottomChange}
            />
          </div>
        </span>
      </div>
    </>
  );
};
export default PaddingComponent;
