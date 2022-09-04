import React, { FC } from "react";
import "styles/components.css";
import "styles/dashboard.css";
import "styles/components.css";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

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
  const incrementLeftCounter = () => {
    setMarginLeft(margin.marginLeft + 1);
  };
  const incrementRightCounter = () => {
    setMarginRight(margin.marginRight + 1);
  };
  const incrementTopCounter = () => {
    setMarginTop(margin.marginTop + 1);
  };
  const incrementBottomCounter = () => {
    setMarginBottom(margin.marginBottom + 1);
  };
  const decrementLeftCounter = () => {
    setMarginLeft(margin.marginLeft - 1);
  };
  const decrementRightCounter = () => {
    setMarginRight(margin.marginRight - 1);
  };
  const decrementTopCounter = () => {
    setMarginTop(margin.marginTop - 1);
  };
  const decrementBottomCounter = () => {
    setMarginBottom(margin.marginBottom - 1);
  };
  return (
    <>
      <div className="flex items-center w-full px-3 py-2 text-gray-600">
        <span className="px-1 text-left text-xl text-gray-500 font-regular font-normal not-italic">
          <span className="margin-text">Margin</span>
          <div className="flex mt-3">
            <h6 className="mr-2 margin-subtext">L</h6>
            <input
              inputMode="numeric"
              value={margin.marginLeft}
              placeholder="0"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[75px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={(e) => handleLeftChange(e)}
            />
            <AiOutlineCaretUp
              onClick={incrementLeftCounter}
              className="text-[10px] z-[100] absolute left-[6.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={decrementLeftCounter}
              className="text-[10px] z-[100] absolute left-[6.2rem] mt-[1rem] text-black"
            />
            <h6 className="ml-5 mr-2 margin-subtext">R</h6>
            <input
              inputMode="numeric"
              value={margin.marginRight}
              placeholder="0"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[75px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={handleRightChange}
            />
            <AiOutlineCaretUp
              onClick={incrementRightCounter}
              className="text-[10px] z-[100] absolute left-[13.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={decrementRightCounter}
              className="text-[10px] z-[100] absolute left-[13.2rem] mt-[1rem] text-black"
            />
          </div>
          <div className="flex mt-3">
            <h6 className="mr-2 margin-subtext">T</h6>
            <input
              inputMode="numeric"
              value={margin.marginTop}
              placeholder="0"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[75px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={handleTopChange}
            />
            <AiOutlineCaretUp
              onClick={incrementTopCounter}
              className="text-[10px] z-[100] absolute left-[6.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={decrementTopCounter}
              className="text-[10px] z-[100] absolute left-[6.2rem] mt-[1rem] text-black"
            />
            <h6 className="ml-5 mr-2 margin-subtext">B</h6>
            <input
              inputMode="numeric"
              value={margin.marginBottom}
              placeholder="0"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[75px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={handleBottomChange}
            />
            <AiOutlineCaretUp
              onClick={incrementBottomCounter}
              className="text-[10px] z-[100] absolute left-[13.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={decrementBottomCounter}
              className="text-[10px] z-[100] absolute left-[13.2rem] mt-[1rem] text-black"
            />
          </div>
        </span>
      </div>
    </>
  );
};
export default MarginComponent;
