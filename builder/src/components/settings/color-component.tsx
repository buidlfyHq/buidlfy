import React, { useState, FC } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineCaretDown } from "react-icons/ai";
import ColorPicker from "react-best-gradient-color-picker";
import { Dialog } from "@headlessui/react";
import { updateWorkspaceElementStyle } from "redux/workspace/workspace.reducers";
import "styles/components.css";
import "styles/dashboard.css";

interface IColorComponent {
  i: string;
  color: string;
}

const ColorComponent: FC<IColorComponent> = ({ i, color }) => {
  const dispatch = useDispatch();
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);

  const handleChange = (e: string) => {
    dispatch(
      updateWorkspaceElementStyle({
        settingItemId: i,
        propertyName: "color",
        propertyValue: e,
      })
    );
  };
  return (
    <>
      <div
        className="py-4 text-gray-600"
        style={{ width: "-webkit-fill-available" }}
      >
        <div className="mx-2 px-1">
          <div className="flex">
            <div className="margin-text grow flex px-1">Color</div>
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
          </Dialog>
        ) : null}
      </div>
    </>
  );
};

export default ColorComponent;
