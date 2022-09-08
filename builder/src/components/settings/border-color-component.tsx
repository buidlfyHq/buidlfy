import React, { useState, FC, useEffect, useRef } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import IItems from "interfaces/items";
import ColorPicker from "react-best-gradient-color-picker";
import { Dialog } from "@headlessui/react";
import "styles/components.css";
import "styles/dashboard.css";

interface IBorderColorComponent {
  borderColor: string;
  setBorderColor: (borderColor: string) => void;
  selectedItem: IItems;
}

const BorderColorComponent: FC<IBorderColorComponent> = ({
  borderColor,
  setBorderColor,
}) => {
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
  const handleClick = () => {
    setDisplayColorPicker(true);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  return (
    <>
      <div
        className="py-2 text-gray-600"
        style={{ width: "-webkit-fill-available" }}
      >
        <div className="items-center mx-2 py-2 mb-2">
          {/* <VscSymbolColor className="text-[18px] mr-3" /> */}
          <div className="flex">
            <div className="margin-text grow flex my-1 px-1 text-xl not-italic font-normal text-gray-500 font-regular">
              Border Color
            </div>
            <div
              ref={ref}
              onClick={handleClick}
              className="flex items-center cursor-pointer"
            >
              <div
                style={{
                  background: borderColor,
                }}
                className="w-10 h-5 mr-2 rounded border border-solid border-[#e9edfd]"
              ></div>
              <AiOutlineCaretDown className="text-[14px]" />
            </div>
          </div>
        </div>

        {displayColorPicker ? (
          <Dialog
            as="div"
            className="absolute top-[220px] right-[260px] bottom-[1px] py-[15px] z-100 overflow-none bg-white shadow-lg"
            open={displayColorPicker}
            onClose={() => setDisplayColorPicker(false)}
          >
            <div className=" px-4 text-right">
              {/* This element is to trick the browser into centering the modal contents. */}
              {/* <span
               className="inline-block h-screen align-middle"
               aria-hidden="true"
             >
               &#8203;
             </span> */}

              {/* Use the overlay to style a dim backdrop for your dialog */}
              {/* <Dialog.Overlay className="fixed inset-0 bg-black opacity-10" /> */}

              {/* Dialog Content */}

              <div>
                <div onClick={handleClose} />
                {/* <button onClick={setSolid}>Solid</button>
               <button onClick={setGradient}>Gradient</button> */}

                <ColorPicker
                  // hideEyeDrop="false"
                  // hideInputType="false"
                  // hideColorGuide="false"
                  // hideAdvancedSliders="false"
                  value={borderColor}
                  onChange={setBorderColor}
                  // setSolid="true"
                />
              </div>
            </div>
          </Dialog>
        ) : // <div>
        //   <div onClick={handleClose} />
        //   <SketchPicker color={borderColor} onChange={handleChange} />
        // </div>
        null}
      </div>
    </>
  );
};

export default BorderColorComponent;
