import React, { useState, FC, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Dialog } from "@headlessui/react";
import { AiOutlineCaretDown } from "react-icons/ai";
import ColorPicker from "react-best-gradient-color-picker";
import { updateItems } from "reducers/itemsReducer";
import { ReplaceStyle } from "components/utils/render-setting";
import IItems from "interfaces/items";
import "styles/components.css";
import "styles/dashboard.css";

interface IBorderColorComponent {
  i: string;
  borderColor: string;
}

const BorderColorComponent: FC<IBorderColorComponent> = ({
  i,
  borderColor,
}) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>();
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);

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

  const handleChange = (e: string) => {
    dispatch(
      updateItems({
        level: 1,
        settingItemId: i,
        propertyName: "borderColor",
        propertyValue: e,
      })
    );
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
              onClick={() => setDisplayColorPicker(true)}
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
              <div>
                <div onClick={() => setDisplayColorPicker(false)} />
                <ColorPicker
                  hideEyeDrop="false"
                  hideInputType="false"
                  hideColorGuide="false"
                  hideAdvancedSliders="false"
                  value={borderColor}
                  onChange={handleChange}
                />
              </div>
            </div>
          </Dialog>
        ) : null}
      </div>
    </>
  );
};

export default BorderColorComponent;
