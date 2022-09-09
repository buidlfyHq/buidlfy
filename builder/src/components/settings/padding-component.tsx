import React, { FC } from "react";
import "styles/components.css";
import "styles/dashboard.css";
import "styles/components.css";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

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
  // const incrementCounter = () => {
  //   if (padding.paddingLeft) {
  //     setPaddingLeft(padding.paddingLeft + 1);
  //   } else if (padding.paddingRight) {
  //     setPaddingRight(padding.paddingRight + 1);
  //   } else if (padding.paddingTop) {
  //     setPaddingTop(padding.paddingTop + 1);
  //   } else {
  //     setPaddingBottom(padding.paddingBottom + 1);
  //   }
  // };
  // const decrementCounter = () => {
  //   if (padding.paddingLeft) {
  //     setPaddingLeft(padding.paddingLeft - 1);
  //   } else if (padding.paddingRight) {
  //     setPaddingRight(padding.paddingRight - 1);
  //   } else if (padding.paddingTop) {
  //     setPaddingTop(padding.paddingTop - 1);
  //   } else {
  //     setPaddingBottom(padding.paddingBottom - 1);
  //   }
  // };

  const incrementLeftCounter = () => {
    setPaddingLeft(padding.paddingLeft + 1);
  };
  const incrementRightCounter = () => {
    setPaddingRight(padding.paddingRight + 1);
  };
  const incrementTopCounter = () => {
    setPaddingTop(padding.paddingTop + 1);
  };
  const incrementBottomCounter = () => {
    setPaddingBottom(padding.paddingBottom + 1);
  };
  const decrementLeftCounter = () => {
    setPaddingLeft(padding.paddingLeft - 1);
  };
  const decrementRightCounter = () => {
    setPaddingRight(padding.paddingRight - 1);
  };
  const decrementTopCounter = () => {
    setPaddingTop(padding.paddingTop - 1);
  };
  const decrementBottomCounter = () => {
    setPaddingBottom(padding.paddingBottom - 1);
  };

  return (
    <>
      <div className="flex items-center w-full px-3 py-2 text-gray-600">
        <span className="px-1 text-left my-1 text-xl text-gray-500 font-regular font-normal not-italic">
          <span className="margin-text">Padding</span>
          <div className="flex mt-3">
            <h6 className="margin-subtext mr-2">L</h6>
            <input
              inputMode="numeric"
              id="padding-left"
              name="paddingLeft"
              value={padding.paddingLeft}
              placeholder="0"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[75px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={handleLeftChange}
            />
            <AiOutlineCaretUp
              onClick={incrementLeftCounter}
              className="text-[10px] z-[100] absolute left-[6.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={decrementLeftCounter}
              className="text-[10px] z-[100] absolute left-[6.2rem] mt-[1rem] text-black"
            />
            <h6 className="margin-text ml-5 mr-2 margin-subtext">R</h6>
            <input
              inputMode="numeric"
              id="padding-right"
              name="paddingRight"
              value={padding.paddingRight}
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
              id="padding-top"
              name="paddingTop"
              value={padding.paddingTop}
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
              id="padding-bottom"
              name="paddingBottom"
              value={padding.paddingBottom}
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
export default PaddingComponent;
