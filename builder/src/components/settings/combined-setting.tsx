import React, { FC } from "react";
import { useDispatch } from "react-redux";
import {
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
  AiOutlineAlignCenter,
} from "react-icons/ai";
import { updateWorkspaceElementStyle } from "redux/workspace/workspace.reducers";
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

  const handleBoldChange = () => {
    dispatch(
      updateWorkspaceElementStyle({
        settingItemId: i,
        propertyName: "fontWeight",
        propertyValue: fontWeight === "bold" ? "normal" : "bold",
      })
    );
  };

  const handleItalicChange = () => {
    dispatch(
      updateWorkspaceElementStyle({
        settingItemId: i,
        propertyName: "fontStyle",
        propertyValue: fontStyle === "italic" ? "normal" : "italic",
      })
    );
  };

  const handleUnderlineChange = () => {
    dispatch(
      updateWorkspaceElementStyle({
        settingItemId: i,
        propertyName: "textDecoration",
        propertyValue: textDecoration === "underline" ? "none" : "underline",
      })
    );
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
    <div className="flex grey-div w-auto mx-2 mb-3 items-center mt-2 text-black">
      <span
        onClick={handleBoldChange}
        className="flex items-center mx-[0.75rem] justify-center font-bold text-[16px] py-1 font-regular"
      >
        B
      </span>
      <span
        onClick={handleItalicChange}
        className="flex items-center mx-[0.75rem] justify-center italic text-[16px] py-1 font-regular text-black"
      >
        i
      </span>
      <span
        onClick={handleUnderlineChange}
        className="flex items-center mx-[0.75rem] justify-center underline text-[16px] py-1 font-regular text-black"
      >
        U
      </span>
      <div className="flex">
        <span
          onClick={() => handleAlignChange("left")}
          className="flex items-center mx-[0.75rem] justify-center text-[16px] py-1 font-regular"
        >
          <AiOutlineAlignLeft className="text-[16px]" />
        </span>
        <span
          onClick={() => handleAlignChange("center")}
          className="flex items-center mx-[0.75rem] justify-center text-[16px] py-1 font-regular text-black"
        >
          <AiOutlineAlignCenter className="text-[16px]" />
        </span>
        <span
          onClick={() => handleAlignChange("right")}
          className="flex items-center mx-[0.75rem] justify-center text-[16px] py-1 font-regular text-black"
        >
          <AiOutlineAlignRight className="text-[16px]" />
        </span>
      </div>
    </div>
  );
};
export default CombinedComponent;
