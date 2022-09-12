import React, { FC } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { replaceSpacingValue } from "components/utils/render-setting";
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
  // Derive best type of e
  const handleMarginChange = (e, action: replaceSpacingValue) => {
    if (action == replaceSpacingValue.LEFT) {
      setMarginLeft(+e.target.value);
    } else if (action == replaceSpacingValue.RIGHT) {
      setMarginRight(+e.target.value);
    } else if (action == replaceSpacingValue.TOP) {
      setMarginTop(+e.target.value);
    } else if (action == replaceSpacingValue.BOTTOM) {
      setMarginBottom(+e.target.value);
    } else if (action == replaceSpacingValue.INCREMENTLEFT) {
      setMarginLeft(margin.marginLeft + 1);
    } else if (action == replaceSpacingValue.INCREMENTRIGHT) {
      setMarginRight(margin.marginRight + 1);
    } else if (action == replaceSpacingValue.INCREMENTTOP) {
      setMarginTop(margin.marginTop + 1);
    } else if (action == replaceSpacingValue.INCREMENTBOTTOM) {
      setMarginBottom(margin.marginBottom + 1);
    } else if (action == replaceSpacingValue.DECREMENTLEFT) {
      setMarginLeft(margin.marginLeft - 1);
    } else if (action == replaceSpacingValue.DECREMENTRIGHT) {
      setMarginRight(margin.marginRight - 1);
    } else if (action == replaceSpacingValue.DECREMENTTOP) {
      setMarginTop(margin.marginTop - 1);
    } else if (action == replaceSpacingValue.DECREMENTBOTTOM) {
      setMarginBottom(margin.marginBottom - 1);
    }
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
              onChange={(e) => handleMarginChange(e, replaceSpacingValue.LEFT)}
            />
            <AiOutlineCaretUp
              onClick={(e) =>
                handleMarginChange(e, replaceSpacingValue.INCREMENTLEFT)
              }
              className="text-[10px] z-[100] absolute left-[6.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={(e) =>
                handleMarginChange(e, replaceSpacingValue.DECREMENTLEFT)
              }
              className="text-[10px] z-[100] absolute left-[6.2rem] mt-[1rem] text-black"
            />
            <h6 className="ml-5 mr-2 margin-subtext">R</h6>
            <input
              inputMode="numeric"
              value={margin.marginRight}
              placeholder="0"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[75px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={(e) => handleMarginChange(e, replaceSpacingValue.RIGHT)}
            />
            <AiOutlineCaretUp
              onClick={(e) =>
                handleMarginChange(e, replaceSpacingValue.INCREMENTRIGHT)
              }
              className="text-[10px] z-[100] absolute left-[13.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={(e) =>
                handleMarginChange(e, replaceSpacingValue.INCREMENTRIGHT)
              }
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
              onChange={(e) => handleMarginChange(e, replaceSpacingValue.TOP)}
            />
            <AiOutlineCaretUp
              onClick={(e) =>
                handleMarginChange(e, replaceSpacingValue.INCREMENTTOP)
              }
              className="text-[10px] z-[100] absolute left-[6.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={(e) =>
                handleMarginChange(e, replaceSpacingValue.DECREMENTTOP)
              }
              className="text-[10px] z-[100] absolute left-[6.2rem] mt-[1rem] text-black"
            />
            <h6 className="ml-5 mr-2 margin-subtext">B</h6>
            <input
              inputMode="numeric"
              value={margin.marginBottom}
              placeholder="0"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[75px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={(e) =>
                handleMarginChange(e, replaceSpacingValue.BOTTOM)
              }
            />
            <AiOutlineCaretUp
              onClick={(e) =>
                handleMarginChange(e, replaceSpacingValue.INCREMENTBOTTOM)
              }
              className="text-[10px] z-[100] absolute left-[13.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={(e) =>
                handleMarginChange(e, replaceSpacingValue.DECREMENTBOTTOM)
              }
              className="text-[10px] z-[100] absolute left-[13.2rem] mt-[1rem] text-black"
            />
          </div>
        </span>
      </div>
    </>
  );
};
export default MarginComponent;
