import React, { useState, FC, useEffect, useRef } from "react";
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
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    function handleOutsideClick(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setDisplayColorPicker(false);
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [ref]);

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
        ref={ref}
        onClick={handleClick}
        className="flex flex-col items-start justify-center py-2 text-gray-600 cursor-pointer"
      >
        <div className="flex items-center w-full px-3 py-2 mb-2 hover:bg-slate-100">
          <VscSymbolColor className="text-[18px] mr-3" />
          <div>
            {selectedItem?.name === "Container" ? (
              <span className="flex px-1 my-1 text-xl not-italic font-normal text-gray-500 font-regular">
                Border Color
              </span>
            ) : (
              <span className="flex px-1 my-1 text-xl not-italic font-normal text-gray-500 font-regular">
                Text Color
              </span>
            )}
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
