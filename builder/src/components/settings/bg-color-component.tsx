import React, { useState, FC, useRef, useEffect } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import ColorPicker from "react-best-gradient-color-picker";
import IItems from "interfaces/items";
import { Dialog } from "@headlessui/react";
import "styles/components.css";
import "styles/dashboard.css";

interface IBgColorComponent {
  color: string;
  setBgColor: (color: string) => void;
  selectedItem?: IItems;
}

const BgColorComponent: FC<IBgColorComponent> = ({
  color,
  setBgColor,
  selectedItem,
}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
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

  return (
    <div
      className={`py-2 text-gray-600`}
      style={{ width: "-webkit-fill-available" }}
    >
      <div className="flex mx-2 py-2">
        <div className="flex margin-text grow my-1 text-xl not-italic font-normal text-gray-500 font-regular">
          Background Color
        </div>
        <div ref={ref} onClick={handleClick} className="flex cursor-pointer">
          <div
            style={{
              background: color,
            }}
            className="flex w-10 h-5 mr-2 rounded border border-solid border-[#e9edfd]"
          ></div>
          <AiOutlineCaretDown className="text-[14px]" />
        </div>
      </div>

      {displayColorPicker ? (
        <>
          {selectedItem ? (
            <Dialog
              as="div"
              className="absolute top-[220px] right-[260px] bottom-[1px] py-[15px] z-100 overflow-none bg-white shadow-lg"
              open={displayColorPicker}
              onClose={() => setDisplayColorPicker(false)}
            >
              <div className=" px-4 text-right">
                <div>
                  <div onClick={handleClose} />
                  <ColorPicker
                    hideEyeDrop="false"
                    hideInputType="false"
                    hideColorGuide="false"
                    hideAdvancedSliders="false"
                    value={color}
                    onChange={setBgColor}
                  />
                </div>
              </div>
            </Dialog>
          ) : (
            <Dialog
              as="div"
              className="absolute top-[150px] left-[370px] bottom-[1px] py-[15px] z-100 overflow-none bg-white shadow-lg"
              open={displayColorPicker}
              onClose={() => setDisplayColorPicker(false)}
            >
              <div className=" px-4 text-right">
                <div>
                  <div onClick={handleClose} />
                  <ColorPicker
                    hideEyeDrop="false"
                    hideInputType="false"
                    hideColorGuide="false"
                    hideAdvancedSliders="false"
                    value={color}
                    onChange={setBgColor}
                  />
                </div>
              </div>
            </Dialog>
          )}
        </>
      ) : null}
    </div>
  );
};

export default BgColorComponent;
