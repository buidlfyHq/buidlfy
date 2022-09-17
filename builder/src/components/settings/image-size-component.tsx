import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { updateWorkspaceImageElementStyle } from "redux/workspace/workspace.reducers";
import { ReplaceStyle } from "components/utils/render-setting";
import "styles/dashboard.css";
import "styles/components.css";

interface ISizeComponent {
  i: string;
  width: number;
  height: number;
}

const SizeComponent: FC<ISizeComponent> = ({ i, width, height }) => {
  const dispatch = useDispatch();

  // Derive best type of e
  const handleChange = (e, action: ReplaceStyle) => {
    if (action == ReplaceStyle.WIDTH) {
      dispatch(
        updateWorkspaceImageElementStyle({
          settingItemId: i,
          propertyName: "width",
          propertyValue: +e.target.value,
          imageSizeProperty: false,
        })
      );
    } else if (action == ReplaceStyle.HEIGHT) {
      dispatch(
        updateWorkspaceImageElementStyle({
          settingItemId: i,
          propertyName: "height",
          propertyValue: +e.target.value,
          imageSizeProperty: false,
        })
      );
    } else if (action == ReplaceStyle.INCREMENTWIDTH) {
      dispatch(
        updateWorkspaceImageElementStyle({
          settingItemId: i,
          propertyName: "width",
          propertyValue: width + 1,
          imageSizeProperty: false,
        })
      );
    } else if (action == ReplaceStyle.INCREMENTHEIGHT) {
      dispatch(
        updateWorkspaceImageElementStyle({
          settingItemId: i,
          propertyName: "height",
          propertyValue: height + 1,
          imageSizeProperty: false,
        })
      );
    } else if (action == ReplaceStyle.DECREMENTWIDTH) {
      dispatch(
        updateWorkspaceImageElementStyle({
          settingItemId: i,
          propertyName: "width",
          propertyValue: width - 1,
          imageSizeProperty: false,
        })
      );
    } else if (action == ReplaceStyle.DECREMENTHEIGHT) {
      dispatch(
        updateWorkspaceImageElementStyle({
          settingItemId: i,
          propertyName: "height",
          propertyValue: height - 1,
          imageSizeProperty: false,
        })
      );
    }
  };

  return (
    <>
      <div className="flex items-center w-full px-3 py-2 text-gray-600">
        <span className="px-1 text-left text-xl text-gray-500 font-regular font-normal not-italic">
          <span className="margin-text">Sizing Options</span>
          <div className="flex mt-3">
            <h6 className="mr-2 margin-subtext">W</h6>
            <input
              inputMode="numeric"
              value={width}
              placeholder="0"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[75px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={(e) => handleChange(e, ReplaceStyle.WIDTH)}
            />
            <AiOutlineCaretUp
              onClick={(e) => handleChange(e, ReplaceStyle.INCREMENTWIDTH)}
              className="text-[10px] z-[100] absolute left-[6.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={(e) => handleChange(e, ReplaceStyle.DECREMENTWIDTH)}
              className="text-[10px] z-[100] absolute left-[6.2rem] mt-[1rem] text-black"
            />
            <h6 className="ml-5 mr-2 margin-subtext">H</h6>
            <input
              inputMode="numeric"
              value={height}
              placeholder="0"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[75px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={(e) => handleChange(e, ReplaceStyle.HEIGHT)}
            />
            <AiOutlineCaretUp
              onClick={(e) => handleChange(e, ReplaceStyle.INCREMENTHEIGHT)}
              className="text-[10px] z-[100] absolute left-[13.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={(e) => handleChange(e, ReplaceStyle.DECREMENTHEIGHT)}
              className="text-[10px] z-[100] absolute left-[13.2rem] mt-[1rem] text-black"
            />
          </div>
        </span>
      </div>
    </>
  );
};
export default SizeComponent;
