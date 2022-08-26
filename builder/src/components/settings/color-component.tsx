import React, { useState, FC, useEffect, useRef } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { SketchPicker } from "react-color";
import IItems from "interfaces/items";
import IColor from "interfaces/color";
import "styles/components.css";
import "styles/dashboard.css";
import { containerCheck } from "utils/container-check";

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
  const [hexColor, setHexColor] = useState();
  const [colorOpacity, setColorOpacity] = useState();
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

  const handleHex = (e) => {
    setHexColor(e.target.value);
    console.log(hexColor, "hex");
  };

  const handleChange = (color: { rgb: IColor; hex; a }) => {
    console.log(color, "color-main");

    if (!color) {
      return;
    }
    setColor(color.rgb);
    setHexColor(color.hex);
    console.log(color.hex, "color.hex");
    // setColorOpacity(`rgba(${color.a})`);
  };
  const opacity = Number(`${color.a}`);
  let newOpacity = opacity * 100;
  if (newOpacity == 10000) {
    newOpacity = 100;
  }
  const newColor = { ...color };
  const handleOpacity = (e) => {
    newColor.a = Number(e.target.value) / 100;
    setColor(newColor);
  };
  const incrementCounter = () => {
    let newIncrement = newOpacity + 1;
    newColor.a = Number(newIncrement) / 100;
    setColor(newColor);
  };

  const decrementCounter = () => {
    let newDecrement = newOpacity - 1;
    newColor.a = Number(newDecrement) / 100;
    setColor(newColor);
  };

  return (
    <>
      <div className="flex flex-col mt-2 items-start justify-center py-2 text-gray-600">
        <div className="items-center mx-2 py-2 mb-2">
          {/* <VscSymbolColor className="text-[18px] mr-3" /> */}
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
                style={{
                  backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                }}
                className="w-10 h-5 mr-2 rounded border border-solid border-[#e9edfd]"
              ></div>
              <AiOutlineCaretDown className="text-[14px] mr-3" />
            </div>
          </div>
          <div className="flex mt-5">
            <input
              type="text"
              value={hexColor}
              placeholder="#000000"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[110px] mr-5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={(e) => handleHex(e)}
            />
            <input
              inputMode="numeric"
              value={`${newOpacity}%`}
              placeholder="100%"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[80px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={(e) => handleOpacity(e)}
            />
            <AiOutlineCaretUp
              onClick={incrementCounter}
              className="text-[10px] z-[100] absolute left-[13.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={decrementCounter}
              className="text-[10px] z-[100] absolute left-[13.2rem] mt-[1rem] text-black"
            />
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
