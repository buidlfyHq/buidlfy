import React, { useState, FC, useRef, useEffect } from "react";
import { VscSymbolColor } from "react-icons/vsc";
import { AiOutlineCaretDown } from "react-icons/ai";
import { SketchPicker } from "react-color";
import IColor from "interfaces/color";
import "styles/components.css";
import "styles/dashboard.css";
import IItems from "interfaces/items";

interface IBgColorComponent {
  color: IColor;
  setBgColor: (color: IColor) => void;
}

const BgColorComponent: FC<IBgColorComponent> = ({ color, setBgColor }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [hexColor, setHexColor] = useState();
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
  const handleOpacity = (e) => {
    const newColor = { ...color };
    newColor.a = Number(e.target.value) / 100;
    setBgColor(newColor);
  };
  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color: { rgb: IColor; hex }) => {
    if (!color) {
      return;
    }
    setBgColor(color.rgb);
    setHexColor(color.hex);
  };
  const opacity = Number(`${color.a}`);
  let newOpacity = opacity * 100;
  if (newOpacity == 10000) {
    newOpacity = 100;
  }
  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={`flex flex-col justify-center items-start py-2 text-gray-600`}
    >
      <div className="items-center w-full px-3 py-2">
        {/* <VscSymbolColor className="text-[18px] mr-3" /> */}
        <div className="flex">
          <span className="margin-text grow px-1 my-1 text-xl not-italic font-normal text-gray-500 font-regular">
            Background Color
          </span>
          <div
            ref={ref}
            onClick={handleClick}
            className="flex items-center cursor-pointer"
          >
            <div
              style={{
                backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
              }}
              className="flex w-10 h-5 mr-2 rounded border border-solid border-[#e9edfd]"
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
            onChange={() => handleChange}
          />
          <input
            type="number"
            // value={newOpacity}
            placeholder="100%"
            className="margin-form pl-2 py-0.5 form-select appearance-none block w-[80px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
            onChange={(e) => handleOpacity(e)}
          />
        </div>
      </div>
      {displayColorPicker ? (
        <>
          <div onClick={handleClose} />
          <SketchPicker color={color} onChange={handleChange} />
        </>
      ) : null}
    </div>
  );
};

export default BgColorComponent;
