import React, { useState, FC, useRef, useEffect } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { SketchPicker } from "react-color";
import IColor from "interfaces/color";
import "styles/components.css";
import "styles/dashboard.css";
import { ReplaceStyle } from "components/utils/render-setting";

interface IBgColorComponent {
  color: IColor;
  setBgColor: (color: IColor) => void;
}

const BgColorComponent: FC<IBgColorComponent> = ({ color, setBgColor }) => {
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
    setBgColor(color.rgb);
  };

  return (
    <div
      ref={ref}
<<<<<<< HEAD
      onClick={() => handleClick(ReplaceStyle.TRUE)}
      className="flex flex-col justify-center items-start py-2 text-gray-600"
=======
      onClick={handleClick}
      className={`flex flex-col justify-center items-start py-2 text-gray-600`}
>>>>>>> 7341f483b87a76ebaecd27c5e87f6fcf81c89c11
    >
      <div className="items-center mx-2 py-2">
        <div className="flex">
          <span className="margin-text grow px-1 my-1 text-xl not-italic font-normal text-gray-500 font-regular">
            Background Color
          </span>
          <div
            ref={ref}
<<<<<<< HEAD
            onClick={() => handleClick(ReplaceStyle.TRUE)}
=======
            onClick={handleClick}
>>>>>>> 7341f483b87a76ebaecd27c5e87f6fcf81c89c11
            className="flex items-center cursor-pointer"
          >
            <div className="flex w-10 h-5 mr-2 rounded border border-solid border-[#e9edfd]"></div>
            <AiOutlineCaretDown className="text-[14px] mr-3" />
          </div>
        </div>
      </div>
      {displayColorPicker ? (
        <>
          <div onClick={() => handleClick(ReplaceStyle.FALSE)} />
          <SketchPicker color={color} onChange={handleChange} />
        </>
      ) : null}
    </div>
  );
};

export default BgColorComponent;
