import React, { useState, FC, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { Dialog } from "@headlessui/react";
import ColorPicker from "react-best-gradient-color-picker";
import { updateItems } from "reducers/itemsReducer";
import "styles/components.css";
import "styles/dashboard.css";

interface IBgColorComponent {
  i?: string;
  elementBackgroundColor?: string;
  workspaceBackgroundColor?: string;
  setWorkspaceBackgroundColor?: (workspaceBackgroundColor: string) => void;
}

const BgColorComponent: FC<IBgColorComponent> = ({
  i,
  elementBackgroundColor,
  workspaceBackgroundColor,
  setWorkspaceBackgroundColor,
}) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>();
  const color = workspaceBackgroundColor
    ? workspaceBackgroundColor
    : elementBackgroundColor;

  const [displayColorPicker, setDisplayColorPicker] = useState(false);

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
    if (workspaceBackgroundColor) {
      setWorkspaceBackgroundColor(e);
    } else {
      dispatch(
        updateItems({
          level: 1,
          settingItemId: i,
          propertyName: "backgroundColor",
          propertyValue: e,
        })
      );
    }
  };

  const backgroundDialogContent = (
    <div className=" px-4 text-right">
      <div>
        <div onClick={() => setDisplayColorPicker(false)} />
        <ColorPicker
          hideEyeDrop="false"
          hideInputType="false"
          hideColorGuide="false"
          hideAdvancedSliders="false"
          value={color}
          onChange={handleChange}
        />
      </div>
    </div>
  );

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
            onClick={() => setDisplayColorPicker(true)}
            className="flex items-center cursor-pointer"
          >
            <div
              style={{
                background: color,
              }}
              className="w-10 h-5 mr-2 rounded border border-solid border-[#e9edfd]"
            ></div>
            <AiOutlineCaretDown className="text-[14px]" />
          </div>
        </div>
      </div>
      {displayColorPicker ? (
        <>
          {i ? (
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
