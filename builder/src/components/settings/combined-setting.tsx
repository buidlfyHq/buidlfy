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

interface ICombinedComponent {
  selectedItem: IItems;
}

const CombinedComponent: FC<ICombinedComponent> = ({ selectedItem }) => {
  const dispatch = useDispatch();

  const handleBoldChange = () => {
    dispatch(
      updateItems({
        level: 1,
        settingItemId: selectedItem.i,
        propertyName: "fontWeight",
        propertyValue:
          selectedItem.style.fontWeight === "bold" ? "normal" : "bold",
      })
    );
  };

  const handleItalicChange = () => {
    dispatch(
      updateItems({
        level: 1,
        settingItemId: selectedItem.i,
        propertyName: "fontStyle",
        propertyValue:
          selectedItem?.style?.fontStyle === "italic" ? "normal" : "italic",
      })
    );
  };

  const handleUnderlineChange = () => {
    dispatch(
      updateItems({
        level: 1,
        settingItemId: selectedItem.i,
        propertyName: "textDecoration",
        propertyValue:
          selectedItem?.style?.textDecoration === "underline"
            ? "none"
            : "underline",
      })
    );
  };

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
