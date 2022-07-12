import React, { useState, FC, useRef, useEffect } from "react";
import { VscSymbolColor } from "react-icons/vsc";
import { SketchPicker } from "react-color";
import "../../styles/Components.css";
import "../../styles/Dashboard.css";
import IColor from "interfaces/color";

interface IBgColorComponent {
  color: IColor;
  setBgColor: (color: IColor) => void;
  siteSetting?: boolean;
}

const BgColorComponent: FC<IBgColorComponent> = ({
  color,
  setBgColor,
  siteSetting,
}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    function handleOutsideClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setDisplayColorPicker(false);
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [ref]);

  const handleClick = () => {
    setDisplayColorPicker(true);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color: any) => {
    if (!color) {
      return;
    }
    setBgColor(color.rgb);
  };

  return (
    <>
      <div
        ref={ref}
        onClick={handleClick}
        className={`flex flex-col justify-center items-start py-2 text-gray-600 cursor-pointer`}
      >
        <div className="flex items-center w-full px-3 py-2 mb-2 hover:bg-slate-100">
          <VscSymbolColor className="text-[18px] mr-3" />
          <span className="flex px-1 my-1 text-xl not-italic font-normal text-gray-500 font-regular">
            Background Color{" "}
          </span>
        </div>
        {displayColorPicker ? (
          <>
            <div onClick={handleClose} />
            <SketchPicker color={color} onChange={handleChange} />
          </>
        ) : null}
      </div>
    </>
  );
};

export default BgColorComponent;
