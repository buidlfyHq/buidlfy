import React, { FC } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { ReplaceSpacingValue } from "components/utils/render-setting";
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
  // Derive best type of e
  const handlePaddingChange = (e, action: ReplaceSpacingValue) => {
    if (action == ReplaceSpacingValue.LEFT) {
      setPaddingLeft(+e.target.value);
    } else if (action == ReplaceSpacingValue.RIGHT) {
      setPaddingRight(+e.target.value);
    } else if (action == ReplaceSpacingValue.TOP) {
      setPaddingTop(+e.target.value);
    } else if (action == ReplaceSpacingValue.BOTTOM) {
      setPaddingBottom(+e.target.value);
    } else if (action == ReplaceSpacingValue.INCREMENTLEFT) {
      setPaddingLeft(padding.paddingLeft + 1);
    } else if (action == ReplaceSpacingValue.INCREMENTRIGHT) {
      setPaddingRight(padding.paddingRight + 1);
    } else if (action == ReplaceSpacingValue.INCREMENTTOP) {
      setPaddingTop(padding.paddingTop + 1);
    } else if (action == ReplaceSpacingValue.INCREMENTBOTTOM) {
      setPaddingBottom(padding.paddingBottom + 1);
    } else if (action == ReplaceSpacingValue.DECREMENTLEFT) {
      setPaddingLeft(padding.paddingLeft - 1);
    } else if (action == ReplaceSpacingValue.DECREMENTRIGHT) {
      setPaddingRight(padding.paddingRight - 1);
    } else if (action == ReplaceSpacingValue.DECREMENTTOP) {
      setPaddingTop(padding.paddingTop - 1);
    } else if (action == ReplaceSpacingValue.DECREMENTBOTTOM) {
      setPaddingBottom(padding.paddingBottom - 1);
    }
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
              onChange={(e) => handlePaddingChange(e, ReplaceSpacingValue.LEFT)}
            />
            <AiOutlineCaretUp
              onClick={(e) =>
                handlePaddingChange(e, ReplaceSpacingValue.INCREMENTLEFT)
              }
              className="text-[10px] z-[100] absolute left-[6.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={(e) =>
                handlePaddingChange(e, ReplaceSpacingValue.DECREMENTLEFT)
              }
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
              onChange={(e) =>
                handlePaddingChange(e, ReplaceSpacingValue.RIGHT)
              }
            />
            <AiOutlineCaretUp
              onClick={(e) =>
                handlePaddingChange(e, ReplaceSpacingValue.INCREMENTRIGHT)
              }
              className="text-[10px] z-[100] absolute left-[13.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={(e) =>
                handlePaddingChange(e, ReplaceSpacingValue.INCREMENTRIGHT)
              }
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
              onChange={(e) => handlePaddingChange(e, ReplaceSpacingValue.TOP)}
            />
            <AiOutlineCaretUp
              onClick={(e) =>
                handlePaddingChange(e, ReplaceSpacingValue.INCREMENTTOP)
              }
              className="text-[10px] z-[100] absolute left-[6.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={(e) =>
                handlePaddingChange(e, ReplaceSpacingValue.DECREMENTTOP)
              }
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
              onChange={(e) =>
                handlePaddingChange(e, ReplaceSpacingValue.BOTTOM)
              }
            />
            <AiOutlineCaretUp
              onClick={(e) =>
                handlePaddingChange(e, ReplaceSpacingValue.INCREMENTBOTTOM)
              }
              className="text-[10px] z-[100] absolute left-[13.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={(e) =>
                handlePaddingChange(e, ReplaceSpacingValue.DECREMENTBOTTOM)
              }
              className="text-[10px] z-[100] absolute left-[13.2rem] mt-[1rem] text-black"
            />
          </div>
        </span>
      </div>
    </>
  );
};
export default PaddingComponent;
