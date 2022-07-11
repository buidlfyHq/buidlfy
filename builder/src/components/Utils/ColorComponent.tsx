import React, { useState, FC } from "react";
import { VscSymbolColor } from "react-icons/vsc";
import { SketchPicker } from "react-color";
import IItems from "interfaces/items";
import "../../styles/Components.css";
import "../../styles/Dashboard.css";

interface IColorComponent {
  color: any;
  setColor: (color: any) => void;
  selectedItem: IItems;
}

const ColorComponent: FC<IColorComponent> = ({
  color,
  setColor,
  selectedItem,
}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);

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
    setColor(color.rgb);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="flex items-center w-full px-3 py-2 text-gray-600 cursor-pointer hover:bg-slate-100"
      >
        <VscSymbolColor className="text-[18px] mr-3" />
        <>
          {selectedItem?.name === "Container" ||
          selectedItem?.name === "Input" ? (
            <span className="px-1 flex my-1 text-xl text-gray-500 font-regular font-normal not-italic">
              Border Color
            </span>
          ) : (
            <span className="px-1 flex my-1 text-xl text-gray-500 font-regular font-normal not-italic">
              Text Color
            </span>
          )}
        </>
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

export default ColorComponent;
