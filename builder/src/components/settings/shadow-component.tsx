import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { BsBrightnessLow } from "react-icons/bs";
import { updateWorkspaceElementStyle } from "redux/workspace/workspace.reducers";
import "styles/components.css";
import "styles/dashboard.css";

interface IShadowComponent {
  i: string;
  shadow: string;
}

const ShadowComponent: FC<IShadowComponent> = ({ i, shadow }) => {
  const dispatch = useDispatch();

  const handleSmallChange = () => {
    // setLeft(!left);
    dispatch(
      updateWorkspaceElementStyle({
        settingItemId: i,
        propertyName: "shadow",
        propertyValue:
          shadow === "small" ? "none" : "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      })
    );
  };

  const handleMediumChange = () => {
    // setLeft(!center);
    dispatch(
      updateWorkspaceElementStyle({
        settingItemId: i,
        propertyName: "shadow",
        propertyValue:
          shadow === "medium"
            ? "inherit"
            : "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      })
    );
  };

  const handleLargeChange = () => {
    // setRight(!right);
    dispatch(
      updateWorkspaceElementStyle({
        settingItemId: i,
        propertyName: "shadow",
        propertyValue:
          shadow === "large"
            ? "inherit"
            : "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      })
    );
  };

  return (
    <div className="margin-text text-left px-3 mt-6 mb-0 text-xl text-gray-500 font-regular font-normal not-italic">
      <span className="flex px-1">
        <span> Shadow </span>{" "}
        <BsBrightnessLow className="text-[18px] ml-2 mt-[-2px]" />
      </span>
      <div className="flex mt-3 px-1">
        <span
          onClick={handleSmallChange}
          className="shadow-div flex items-center justify-center shadow text-[18px] py-2 px-3 font-regular"
        >
          S
        </span>
        <span
          onClick={handleMediumChange}
          className="shadow-div flex items-center justify-center shadow text-[18px] py-2 px-3 mx-3 font-regular"
        >
          M
        </span>
        <span
          onClick={handleLargeChange}
          className="shadow-div flex items-center justify-center shadow text-[18px] py-2 px-3 font-regular"
        >
          L
        </span>
      </div>
    </div>
  );
};
export default ShadowComponent;
