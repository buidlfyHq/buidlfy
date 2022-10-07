import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { BsBrightnessLow } from "react-icons/bs";
import { updateWorkspaceElementStyle } from "redux/workspace/workspace.reducers";
import { ReplaceStyle } from "components/utils/render-setting";
import "styles/components.css";
import "styles/dashboard.css";

interface IShadowComponent {
  i: string;
  shadow: string;
}

const ShadowComponent: FC<IShadowComponent> = ({ i, shadow }) => {
  const dispatch = useDispatch();

  const handleChange = (action: ReplaceStyle) => {
    if (action === ReplaceStyle.SMALL) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "shadow",
          propertyValue:
            shadow === ReplaceStyle.SMALL ? "none" : ReplaceStyle.SMALL,
        })
      );
    } else if (action === ReplaceStyle.MEDIUM) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "shadow",
          propertyValue:
            shadow === ReplaceStyle.MEDIUM ? "none" : ReplaceStyle.MEDIUM,
        })
      );
    } else if (action === ReplaceStyle.LARGE) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "shadow",
          propertyValue:
            shadow === ReplaceStyle.LARGE ? "none" : ReplaceStyle.LARGE,
        })
      );
    }
  };

  return (
    <div className="margin-text text-left px-3 py-4 mb-0 ">
      <span className="flex px-1">
        <span> Shadow </span>{" "}
        <BsBrightnessLow className="text-[18px] ml-2 mt-[-2px]" />
      </span>
      <div className="flex mt-3 px-1">
        <span
          onClick={() => handleChange(ReplaceStyle.SMALL)}
          className={`shadow-div flex items-center justify-center cursor-pointer shadow py-2 px-3 font-regular ${
            shadow === ReplaceStyle.SMALL ? "bg-[#b7c1ec]" : ""
          }`}
        >
          S
        </span>
        <span
          onClick={() => handleChange(ReplaceStyle.MEDIUM)}
          className={`shadow-div flex items-center justify-center cursor-pointer shadow py-2 px-3 mx-3 font-regular ${
            shadow === ReplaceStyle.MEDIUM ? "bg-[#b7c1ec]" : ""
          }`}
        >
          M
        </span>
        <span
          onClick={() => handleChange(ReplaceStyle.LARGE)}
          className={`shadow-div flex items-center justify-center cursor-pointer shadow py-2 px-3 font-regular ${
            shadow === ReplaceStyle.LARGE ? "bg-[#b7c1ec]" : ""
          }`}
        >
          L
        </span>
      </div>
    </div>
  );
};

export default ShadowComponent;
