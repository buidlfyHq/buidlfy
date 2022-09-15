import React, { FC } from "react";
import { useDispatch } from "react-redux";
import {
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
  AiOutlineAlignCenter,
} from "react-icons/ai";
import { updateItems } from "reducers/itemsReducer";
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
      updateItems({
        level: 1,
        settingItemId: i,
        propertyName: "justifyContent",
        propertyValue: justifyContent === type ? "inherit" : type,
      })
    );
  };

  return (
    <>
      <span className="margin-text text-left px-3 mt-2 mb-0 text-xl text-gray-500 font-regular font-normal not-italic">
        Text Align
        <div className="flex mt-3 px-3">
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
    </>
  );
};
export default AlignComponent;
