import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { updateWorkspaceImageElementStyle } from "redux/workspace/workspace.reducers";
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
    console.log(backgroundSize, "szie");
    console.log(action, "action");
    console.log("-----");
    dispatch(
      updateWorkspaceImageElementStyle({
        settingItemId: i,
        propertyName: "backgroundSize",
        propertyValue: action,
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
              onClick={() => handleChange(ReplaceStyle.CONTAIN)}
              className={`align-div cursor-pointer flex items-center justify-center shadow text-[12px] p-2 mr-2 my-2 font-regular text-black ${
                backgroundSize === ReplaceStyle.CONTAIN ? "bg-[#b7c1ec]" : ""
              }`}
            >
              Contain
            </span>
            <span
              onClick={() => handleChange(ReplaceStyle.COVER)}
              className={`align-div cursor-pointer flex items-center justify-center shadow text-[12px] p-2 mx-2 my-2 font-regular text-black  ${
                backgroundSize === ReplaceStyle.COVER ? "bg-[#b7c1ec]" : ""
              }`}
            >
              Cover
            </span>
            <span
              onClick={() => handleChange(ReplaceStyle.AUTO)}
              className={`align-div cursor-pointer flex items-center justify-center shadow text-[12px] p-2 mx-2 my-2 font-regular text-black  ${
                backgroundSize === ReplaceStyle.AUTO ? "bg-[#b7c1ec]" : ""
              }`}
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
