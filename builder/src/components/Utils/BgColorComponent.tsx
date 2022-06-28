import React, { useState, FC } from "react";
import "../../styles/Dashboard.css";
import { VscSymbolColor } from "react-icons/vsc";
import "../../styles/Components.css";
import { SketchPicker } from "react-color";

interface IBgColorComponent {
  color: any
  setBgColor: (color: any) => void;
}

const BgColorComponent: FC<IBgColorComponent> = ({ color, setBgColor }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
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
        onClick={handleClick}
        className="flex items-center w-full px-3 py-2 text-gray-600 cursor-pointer hover:bg-slate-100"
      >
        <VscSymbolColor className="text-[18px] mr-3" />
        <span className="flex px-1 my-1 text-xl not-italic font-normal text-gray-500 font-regular">
          Bg Color{" "}
        </span>
      </div>
      {displayColorPicker ? (
        <div>
          <div onClick={handleClose} />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </>
  );
};

export default BgColorComponent;
