import React, { FC } from "react";
import "styles/components.css";
import "styles/dashboard.css";
import "styles/components.css";

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
          <span className="margin-text">Padding</span>
          <div className="flex mt-3">
            <h6 className="margin-subtext mr-2">L</h6>
            <input
              type="number"
              id="padding-left"
              name="paddingLeft"
              value={padding.paddingLeft}
              placeholder="0"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[75px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={handleLeftChange}
            />
            <h6 className="margin-text ml-5 mr-2 margin-subtext">R</h6>
            <input
              type="number"
              id="padding-right"
              name="paddingRight"
              value={padding.paddingRight}
              placeholder="0"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[75px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={handleRightChange}
            />
          </div>
          <div className="flex mt-3">
            <h6 className="mr-2 margin-subtext">T</h6>
            <input
              type="number"
              id="padding-top"
              name="paddingTop"
              value={padding.paddingTop}
              placeholder="0"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[75px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={handleTopChange}
            />
            <h6 className="ml-5 mr-2 margin-subtext">B</h6>
            <input
              type="number"
              id="padding-bottom"
              name="paddingBottom"
              value={padding.paddingBottom}
              placeholder="0"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[75px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={handleBottomChange}
            />
          </div>
        </span>
      </div>
    </>
  );
};
export default PaddingComponent;
