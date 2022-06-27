import React, { useState, FC } from "react";
import "../../styles/Dashboard.css";
import { VscSymbolColor } from "react-icons/vsc";
import "../../styles/Components.css";
import { SketchPicker } from "react-color";

interface IBgColorComponent {
  backgroundColor: any;
  setBgColor: (backgroundColor: any) => void;
}

const BgColorComponent: FC<IBgColorComponent> = ({ backgroundColor, setBgColor }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (backgroundColor: any) => {
    if (!backgroundColor) {
      return;
    }
    setBgColor(backgroundColor.rgb);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="flex items-center w-full px-3 py-2 text-gray-600 cursor-pointer hover:bg-slate-100"
      >
        <VscSymbolColor className="text-[18px] mr-3" />
        <span className="px-1 flex my-1 text-xl text-gray-500 font-regular font-normal not-italic">
          Bg Color{" "}
        </span>
      </div>
      {displayColorPicker ? (
        <div>
          <div onClick={handleClose} />
          <SketchPicker backgroundColor={backgroundColor} onChange={handleChange} />
        </div>
      ) : null}
    </>
  );
};

export default BgColorComponent;
