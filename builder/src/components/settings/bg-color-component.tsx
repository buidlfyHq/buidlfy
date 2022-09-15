import React, { useState, FC, useRef, useEffect } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import IItems from "interfaces/items";
import ColorPicker from "react-best-gradient-color-picker";
import { Dialog } from "@headlessui/react";
import { ReplaceStyle } from "components/utils/render-setting";
import "styles/components.css";
import "styles/dashboard.css";

interface IBgColorComponent {
  backgroundColor: string;
  setBackgroundColor: (backgroundColor: string) => void;
  selectedItem?: IItems;
}

const BgColorComponent: FC<IBgColorComponent> = ({
  backgroundColor,
  setBackgroundColor,
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

  const handleClick = (action: ReplaceStyle) => {
    if (action == ReplaceStyle.TRUE) {
      setDisplayColorPicker(true);
    } else if (action == ReplaceStyle.FALSE) {
      setDisplayColorPicker(false);
    }
  };
  const backgroundDialogContent = () => {
    return (
      <div className=" px-4 text-right">
        <div>
          <div onClick={() => handleClick(ReplaceStyle.FALSE)} />
          <ColorPicker
            hideEyeDrop="false"
            hideInputType="false"
            hideColorGuide="false"
            hideAdvancedSliders="false"
            value={backgroundColor}
            onChange={setBackgroundColor}
          />
        </div>
      </div>
    );
  };
  return (
    <div
      className={`py-2 text-gray-600`}
      style={{ width: "-webkit-fill-available" }}
    >
      <div className="mx-2 py-2 mb-2">
        <div className="flex">
          <div className="margin-text grow flex my-1 px-1 text-xl not-italic font-normal text-gray-500 font-regular">
            Background Color
          </div>
          <div
            ref={ref}
            onClick={() => handleClick(ReplaceStyle.TRUE)}
            className="flex items-center cursor-pointer"
          >
            <div
              style={{
                background: backgroundColor,
              }}
              className="w-10 h-5 mr-2 rounded border border-solid border-[#e9edfd]"
            ></div>
            <AiOutlineCaretDown className="text-[14px]" />
          </div>
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
              {backgroundDialogContent}
            </Dialog>
          ) : (
            <Dialog
              as="div"
              className="absolute top-[150px] left-[370px] bottom-[1px] py-[15px] z-100 overflow-none bg-white shadow-lg"
              open={displayColorPicker}
              onClose={() => setDisplayColorPicker(false)}
            >
              {backgroundDialogContent}
            </Dialog>
          )}
        </>
      ) : null}
    </div>
  );
};

export default BgColorComponent;
