import React, { useState, FC, useEffect, useRef } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { SketchPicker } from "react-color";
import IItems from "interfaces/items";
import IColor from "interfaces/color";
import { ReplaceStyle } from "components/utils/render-setting";
import "styles/components.css";
import "styles/dashboard.css";

interface IColorComponent {
  borderColor: IColor;
  setBorderColor: (color: IColor) => void;
  selectedItem: IItems;
}

const BorderColorComponent: FC<IColorComponent> = ({
  borderColor,
  setBorderColor,
}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    // FIX: find a suitable type for this event
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setDisplayColorPicker(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [ref]);

  const handleClick = (action: ReplaceStyle) => {
    if (action == ReplaceStyle.TRUE) {
      setDisplayColorPicker(true);
    } else if (action == ReplaceStyle.FALSE) {
      setDisplayColorPicker(false);
    }
  };

  const handleChange = (color: { rgb: IColor }) => {
    if (!color) {
      return;
    }
    setBorderColor(color.rgb);
  };

  return (
    <>
      <div
        ref={ref}
        onClick={() => handleClick(ReplaceStyle.TRUE)}
        className="flex flex-col items-start justify-center py-2 text-gray-600"
      >
        <div className="items-center mx-2 py-2 mb-2">
          <div className="flex">
            <span className="margin-text grow flex px-1 text-xl not-italic font-normal text-gray-500 font-regular">
              Border Color
            </span>
            <div
              ref={ref}
              onClick={() => handleClick(ReplaceStyle.TRUE)}
              className="flex items-center cursor-pointer"
            >
              <div className="w-10 h-5 mr-2 rounded border border-solid border-[#e9edfd]"></div>
              <AiOutlineCaretDown className="text-[14px] mr-3" />
            </div>
          </div>
        </div>
        {displayColorPicker ? (
          <div>
            <div onClick={() => handleClick(ReplaceStyle.FALSE)} />
            <SketchPicker color={borderColor} onChange={handleChange} />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default BorderColorComponent;
