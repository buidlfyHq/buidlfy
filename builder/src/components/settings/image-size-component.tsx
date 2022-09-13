import React, { FC, useEffect } from "react";
import "styles/components.css";
import "styles/dashboard.css";
import "styles/components.css";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { ReplaceStyle } from "components/utils/render-setting";

interface ISizeComponent {
  width: number;
  height: number;
  setHeight: (height: number) => void;
  setWidth: (width: number) => void;
  setCover: (backgroundSize: string | boolean) => void;
  setContain: (backgroundSize: string | boolean) => void;
  setAuto: (backgroundSize: string | boolean) => void;
  isAuto?: boolean;
  setIsAuto?: (isAuto: boolean) => void;
  dynamicWidth?: number;
  dynamicHeight?: number;
  setDynamicWidth?: (dynamicWidth?: number) => void;
  setDynamicHeight?: (dynamicHeight?: number) => void;
}

const SizeComponent: FC<ISizeComponent> = ({
  width,
  height,
  setWidth,
  setHeight,
  setIsAuto,
  isAuto,
  dynamicHeight,
  dynamicWidth,
  setDynamicHeight,
  setDynamicWidth,
}) => {
  // useEffect(() => {
  //   if (dynamicWidth && dynamicHeight) {
  //     setHeight(dynamicHeight);
  //     setWidth(dynamicWidth);
  //   }
  // }, [dynamicHeight, dynamicWidth]);

  // useEffect(() => {
  //   if (dynamicHeight) {
  //     console.log(dynamicHeight, "dh");
  //     setHeight(dynamicHeight);
  //   }
  // }, [dynamicHeight]);
  console.log(width, height, "height");

  // Derive best type of e
  const handleChange = (e, action: ReplaceStyle) => {
    if (action == ReplaceStyle.WIDTH) {
      setWidth(+e.target.value);
    } else if (action == ReplaceStyle.HEIGHT) {
      setHeight(+e.target.value);
    } else if (action == ReplaceStyle.INCREMENTWIDTH) {
      setWidth(width + 1);
    } else if (action == ReplaceStyle.INCREMENTHEIGHT) {
      setHeight(height + 1);
    } else if (action == ReplaceStyle.DECREMENTWIDTH) {
      setWidth(width - 1);
    } else if (action == ReplaceStyle.DECREMENTHEIGHT) {
      setHeight(height - 1);
    }
  };
  return (
    <>
      <div className="flex items-center w-full px-3 py-2 text-gray-600">
        <span className="px-1 text-left text-xl text-gray-500 font-regular font-normal not-italic">
          <span className="margin-text">Sizing Options</span>
          <div className="flex mt-3">
            <h6 className="mr-2 margin-subtext">W</h6>
            <input
              inputMode="numeric"
              value={width}
              placeholder="0"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[75px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={(e) => handleChange(e, ReplaceStyle.WIDTH)}
            />
            <AiOutlineCaretUp
              onClick={(e) => handleChange(e, ReplaceStyle.INCREMENTWIDTH)}
              className="text-[10px] z-[100] absolute left-[6.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={(e) => handleChange(e, ReplaceStyle.DECREMENTWIDTH)}
              className="text-[10px] z-[100] absolute left-[6.2rem] mt-[1rem] text-black"
            />
            <h6 className="ml-5 mr-2 margin-subtext">H</h6>
            <input
              inputMode="numeric"
              value={height}
              placeholder="0"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[75px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={(e) => handleChange(e, ReplaceStyle.HEIGHT)}
            />
            <AiOutlineCaretUp
              onClick={(e) => handleChange(e, ReplaceStyle.INCREMENTHEIGHT)}
              className="text-[10px] z-[100] absolute left-[13.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={(e) => handleChange(e, ReplaceStyle.DECREMENTHEIGHT)}
              className="text-[10px] z-[100] absolute left-[13.2rem] mt-[1rem] text-black"
            />
          </div>
        </span>
      </div>
    </>
  );
};
export default SizeComponent;
