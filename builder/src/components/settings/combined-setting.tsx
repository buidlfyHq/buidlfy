import React, { FC } from "react";
import { useDispatch } from "react-redux";
import {
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
  AiOutlineAlignCenter,
} from "react-icons/ai";
import { updateWorkspaceElementStyle } from "redux/workspace/workspace.reducers";
import { ReplaceStyle } from "components/utils/render-setting";
import "styles/components.css";
import "styles/dashboard.css";

interface ICombinedComponent {
  i: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  justifyContent: string;
}

const CombinedComponent: FC<ICombinedComponent> = ({
  i,
  fontWeight,
  fontStyle,
  textDecoration,
  justifyContent,
}) => {
  const dispatch = useDispatch();

  const handleChange = (action: ReplaceStyle) => {
    if (action === ReplaceStyle.BOLD) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "fontWeight",
          propertyValue:
            fontWeight === ReplaceStyle.BOLD ? "normal" : ReplaceStyle.BOLD,
        })
      );
    } else if (action === ReplaceStyle.ITALIC) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "fontStyle",
          propertyValue:
            fontStyle === ReplaceStyle.ITALIC ? "normal" : ReplaceStyle.ITALIC,
        })
      );
    } else if (action === ReplaceStyle.UNDERLINE) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "textDecoration",
          propertyValue:
            textDecoration === ReplaceStyle.UNDERLINE
              ? "none"
              : ReplaceStyle.UNDERLINE,
        })
      );
    }
  };

  const handleAlignChange = (type: string) => {
    dispatch(
      updateWorkspaceElementStyle({
        settingItemId: i,
        propertyName: "justifyContent",
        propertyValue: justifyContent === type ? "inherit" : type,
      })
    );
  };

  return (
    // ADD: Common tailwind style
    <div className="flex grey-div w-auto mx-2 mb-3 items-center mt-2 text-black">
      <span
        onClick={() => handleChange(ReplaceStyle.BOLD)}
        className={`flex items-center justify-center font-bold text-[16px] py-0.5 w-[22px] h-[25px] rounded-[4px] mr-[13px] ml-[10px] my-1 font-regular text-black hover:bg-[#CDD4F3] cursor-pointer ${
          fontWeight === ReplaceStyle.BOLD ? "bg-[#CDD4F3]" : ""
        }`}
      >
        B
      </span>
      <span
        onClick={() => handleChange(ReplaceStyle.ITALIC)}
        className={`flex items-center justify-center italic text-[16px] py-0.5 w-[22px] h-[25px] rounded-[4px] mr-[13px] my-1 font-regular text-black hover:bg-[#CDD4F3] cursor-pointer ${
          fontStyle === ReplaceStyle.ITALIC ? "bg-[#CDD4F3]" : ""
        }`}
      >
        i
      </span>
      <span
        onClick={() => handleChange(ReplaceStyle.UNDERLINE)}
        className={`flex items-center justify-center underline text-[16px] py-0.5 w-[22px] h-[25px] rounded-[4px] mr-[13px] my-1 font-regular text-black hover:bg-[#CDD4F3] active:bg-[#CDD4F3] cursor-pointer ${
          textDecoration === ReplaceStyle.UNDERLINE ? "bg-[#CDD4F3]" : ""
        } `}
      >
        U
      </span>
      <div className="flex">
        <span
          onClick={() => handleAlignChange("left")}
          className={`flex items-center justify-center text-[16px] py-0.5 w-[22px] h-[25px] rounded-[4px] mr-[13px] my-1 font-regular hover:bg-[#CDD4F3] cursor-pointer ${
            justifyContent === ReplaceStyle.LEFT ? "bg-[#CDD4F3]" : ""
          }`}
        >
          <AiOutlineAlignLeft className="text-[16px]" />
        </span>
        <span
          onClick={() => handleAlignChange("center")}
          className={`flex items-center justify-center text-[16px] py-0.5 w-[22px] h-[25px] rounded-[4px] mr-[13px] my-1 font-regular text-black hover:bg-[#CDD4F3] cursor-pointer ${
            justifyContent === ReplaceStyle.CENTER ? "bg-[#CDD4F3]" : ""
          }`}
        >
          <AiOutlineAlignCenter className="text-[16px]" />
        </span>
        <span
          onClick={() => handleAlignChange("right")}
          className={`flex items-center justify-center text-[16px] py-0.5 w-[22px] h-[25px] rounded-[4px] my-1 font-regular text-black hover:bg-[#CDD4F3] cursor-pointer ${
            justifyContent === ReplaceStyle.RIGHT ? "bg-[#CDD4F3]" : ""
          }`}
        >
          <AiOutlineAlignRight className="text-[16px]" />
        </span>
      </div>
    </div>
  );
};
export default CombinedComponent;
