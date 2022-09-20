import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { updateWorkspaceImageElementStyle } from "redux/workspace/workspace.reducers";
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
      updateWorkspaceImageElementStyle({
        settingItemId: i,
        propertyName: "backgroundSize",
        propertyValue: backgroundSize === action ? "contain" : action,
        imageSizeProperty: true,
      })
    );
  };

  return (
    <>
      <div
        className="flex pt-4 mb-0"
        style={{ width: "-webkit-fill-available" }}
      >
        <span className="margin-text text-left px-3">
          Background Size
          <div className="flex px-3 mt-3">
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
      </div>
    </>
  );
};
export default BackgroundSizeComponent;
