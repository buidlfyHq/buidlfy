import React, { FC } from "react";
import { useDispatch } from "react-redux";
import {
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
  AiOutlineAlignCenter,
} from "react-icons/ai";
import { updateItems } from "reducers/itemsReducer";
import IItems from "interfaces/items";
import "styles/components.css";
import "styles/dashboard.css";

interface IAlignComponent {
  selectedItem: IItems;
}

const AlignComponent: FC<IAlignComponent> = ({ selectedItem }) => {
  const dispatch = useDispatch();

  const handleAlignChange = (type: string) => {
    dispatch(
      updateItems({
        level: 1,
        settingItemId: selectedItem.i,
        propertyName: "justifyContent",
        propertyValue:
          selectedItem?.style?.justifyContent === type ? "inherit" : type,
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
            onClick={() => handleAlignChange("left")}
            className="align-div flex items-center justify-center italic shadow text-[18px] p-2 mx-2 my-2 font-regular text-black"
          >
            <AiOutlineAlignCenter className="text-[18px]" />
          </span>
          <span
            onClick={() => handleAlignChange("left")}
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
