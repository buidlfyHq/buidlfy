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
    if (action == ReplaceStyle.SMALL) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "shadow",
          propertyValue:
            shadow === ReplaceStyle.SMALL
              ? "none"
              : "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        })
      );
    } else if (action == ReplaceStyle.MEDIUM) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "shadow",
          propertyValue:
            shadow === ReplaceStyle.MEDIUM
              ? "inherit"
              : "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        })
      );
    } else if (action == ReplaceStyle.LARGE) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "shadow",
          propertyValue:
            shadow === ReplaceStyle.LARGE
              ? "inherit"
              : "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        })
      );
    }
  };

  return (
    <div className="margin-text text-left px-3 py-2 mb-0 ">
      <span className="flex px-1">
        <span> Shadow </span>{" "}
        <BsBrightnessLow className="text-[18px] ml-2 mt-[-2px]" />
      </span>
      <div className="flex mt-3 px-1">
        <span
          onClick={() => handleChange(ReplaceStyle.SMALL)}
          className="shadow-div flex items-center justify-center shadow py-2 px-3 font-regular"
        >
          S
        </span>
        <span
          onClick={() => handleChange(ReplaceStyle.MEDIUM)}
          className="shadow-div flex items-center justify-center shadow py-2 px-3 mx-3 font-regular"
        >
          M
        </span>
        <span
          onClick={() => handleChange(ReplaceStyle.LARGE)}
          className="shadow-div flex items-center justify-center shadow py-2 px-3 font-regular"
        >
          L
        </span>
      </div>
    </div>
  );
};

export default ShadowComponent;
