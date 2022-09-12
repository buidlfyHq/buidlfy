import React, { useState, FC, useEffect, useRef } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { SketchPicker } from "react-color";
import IItems from "interfaces/items";
import IColor from "interfaces/color";
import { containerCheck } from "utils/container-check";
import "styles/components.css";
import "styles/dashboard.css";

interface IColorComponent {
  color: IColor;
  setColor: (color: IColor) => void;
  selectedItem: IItems;
}

const ColorComponent: FC<IColorComponent> = ({
  color,
  setColor,
  selectedItem,
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

  const handleClick = () => {
    setDisplayColorPicker(true);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color: { rgb: IColor }) => {
    if (!color) {
      return;
    }
    setColor(color.rgb);
  };

  return (
    <>
      <div className="flex flex-col mt-2 items-start justify-center py-2 text-gray-600">
        <div className="items-center mx-2 py-2 mb-2">
          <div className="flex">
            {containerCheck(selectedItem) ? (
              <span className="margin-text grow flex px-1 mt-2 text-xl not-italic font-normal text-gray-500 font-regular">
                Border Color
              </span>
            ) : (
              <span className="margin-text grow flex px-1 my-1 mt-2 text-xl not-italic font-normal text-gray-500 font-regular">
                Text Color
              </span>
            )}
            <div
              ref={ref}
              onClick={handleClick}
              className="flex items-center cursor-pointer"
            >
              <div
                style={
                  {
                    // backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                  }
                }
                className="w-10 h-5 mr-2 rounded border border-solid border-[#e9edfd]"
              ></div>
              <AiOutlineCaretDown className="text-[14px] mr-3" />
            </div>
          </div>
        </div>
        {displayColorPicker ? (
          <div>
            <div onClick={handleClose} />
            <SketchPicker color={color} onChange={handleChange} />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ColorComponent;
