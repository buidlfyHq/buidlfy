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

interface IAlignComponent {
  i: string;
  justifyContent: string;
}

const AlignComponent: FC<IAlignComponent> = ({ i, justifyContent }) => {
  const dispatch = useDispatch();

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
    <>
      <div
        className="flex py-4 mb-0"
        style={{ width: "-webkit-fill-available" }}
      >
        <span className="margin-text text-left px-3">
          Text Align
          <div className="flex px-3">
            <span
              onClick={() => handleAlignChange("left")}
              className="align-div flex items-center justify-center font-bold shadow text-[18px] p-2 mr-2 my-2 font-regular"
            >
              <AiOutlineAlignLeft className="text-[18px]" />
            </span>
            <span
              onClick={() => handleAlignChange("center")}
              className="align-div flex items-center justify-center italic shadow text-[18px] p-2 mx-2 my-2 font-regular text-black"
            >
              <AiOutlineAlignCenter className="text-[18px]" />
            </span>
            <span
              onClick={() => handleAlignChange("right")}
              className="align-div flex items-center justify-center underline shadow text-[18px] p-2 mx-2 my-2 font-regular text-black"
            >
              <AiOutlineAlignRight className="text-[18px]" />
            </span>
          </div>
        </span>
      </div>
    </>
  );
};
export default AlignComponent;
