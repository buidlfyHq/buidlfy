import React, { useState, FC } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineCaretDown } from "react-icons/ai";
import { Dialog } from "@headlessui/react";
import ColorPicker from "react-best-gradient-color-picker";
import { updateWorkspaceElementStyle } from "redux/workspace/workspace.reducers";
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
  const color = workspaceBackgroundColor
    ? workspaceBackgroundColor
    : elementBackgroundColor;

  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleChange = (e: string) => {
    if (workspaceBackgroundColor) {
      setWorkspaceBackgroundColor(e);
    } else {
      dispatch(
        updateWorkspaceElementStyle({
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
          hideEyeDrop={false}
          hideInputType={false}
          hideColorGuide={false}
          hideAdvancedSliders={false}
          value={color}
          onChange={handleChange}
        />
      </div>
    </div>
  );

  return (
    <div
      className={`py-4 text-gray-600`}
      style={{ width: "-webkit-fill-available" }}
    >
      <div className="mx-2 px-1">
        <div className="flex">
          <div className="margin-text grow flex px-1">Background Color</div>
          <div
            onClick={() => setDisplayColorPicker(true)}
            className="flex items-center cursor-pointer"
          >
            <div
              style={{
                background: color,
              }}
              className="w-10 h-5 mr-2 rounded border border-solid border-[#e9edfd]"
            ></div>
            <AiOutlineCaretDown className="arrow text-[12px]" />
          </div>
        </div>
      </div>
      {displayColorPicker ? (
        <>
          {/* Check if modal is looking okay on top for background color */}
          <Dialog
            as="div"
            className={`absolute py-[15px] z-100 overflow-none bg-white shadow-lg ${
              i
                ? "top-[220px] right-[260px] bottom-[1px]"
                : "top-[150px] right-[20px] bottom-[70px]"
            }`}
            open={displayColorPicker}
            onClose={() => setDisplayColorPicker(false)}
          >
            {backgroundDialogContent}
          </Dialog>
        </>
      ) : null}
    </div>
  );
};

export default BgColorComponent;
