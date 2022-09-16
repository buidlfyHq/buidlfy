import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { updateItems } from "reducers/itemsReducer";
import { ReplaceStyle } from "components/utils/render-setting";
import "styles/components.css";
import "styles/dashboard.css";

interface IBackgroundSizeComponent {
  i: string;
  backgroundSize: string;
}

const BackgroundSizeComponent: FC<IBackgroundSizeComponent> = ({
  i,
  backgroundSize,
}) => {
  const dispatch = useDispatch();

  const handleChange = (action: string) => {
    dispatch(
      updateItems({
        level: 3,
        settingItemId: i,
        propertyName: "backgroundSize",
        propertyValue: backgroundSize === action ? action : "contain",
        imageSizeProperty: true,
      })
    );
  };

  return (
    <>
      <span className="margin-text text-left px-3 mt-2 mb-0 text-xl text-gray-500 font-regular font-normal not-italic">
        Background Size
        <div className="flex mt-3 px-3">
          <span
            onClick={() => handleChange("contain")}
            className="align-div flex items-center justify-center shadow text-[12px] p-2 mr-2 my-2 font-regular text-black"
          >
            Contain
          </span>
          <span
            onClick={() => handleChange("cover")}
            className="align-div flex items-center justify-center shadow text-[12px] p-2 mx-2 my-2 font-regular text-black"
          >
            Cover
          </span>
          <span
            onClick={() => handleChange("auto")}
            className="align-div flex items-center justify-center shadow text-[12px] p-2 mx-2 my-2 font-regular text-black"
          >
            Auto
          </span>
        </div>
      </span>
    </>
  );
};
export default BackgroundSizeComponent;
