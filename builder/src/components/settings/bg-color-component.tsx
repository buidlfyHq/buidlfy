import React, { useState, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateWorkspaceElementStyle } from "redux/workspace/workspace.reducers";
import ColorPickerDropdown from "components/utils/color-picker";
import "styles/components.css";
import "styles/dashboard.css";
import { IUploadedImageData } from "redux/workspace/workspace.interfaces";
import { IRootState } from "redux/root-state.interface";
import WarningText from "components/utils/setting-warning";

interface IBgColorComponent {
  i?: string;
  name?: string;
  elementBackgroundColor?: string;
  workspaceBackgroundColor?: string;
  setWorkspaceBackgroundColor?: (workspaceBackgroundColor: string) => void;
}

const BgColorComponent: FC<IBgColorComponent> = ({
  i,
  name,
  elementBackgroundColor,
  workspaceBackgroundColor,
  setWorkspaceBackgroundColor,
}) => {
  const dispatch = useDispatch();

  const imageData: IUploadedImageData = useSelector((state: IRootState) =>
    state.workspace.uploadedImagesData.find(
      (image: IUploadedImageData) => image.settingItemId === i
    )
  );
  const color = workspaceBackgroundColor
    ? workspaceBackgroundColor
    : elementBackgroundColor;

  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleChange = (e: string) => {
    if (workspaceBackgroundColor) {
      setWorkspaceBackgroundColor(e);
    } else {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "backgroundColor",
          propertyValue: e,
        })
      );
    }
  };

  const isElement = !!i;

  return (
    <>
      {name === "Container" ? (
        <>
          {!imageData?.uploadedImageData ? (
            <ColorPickerDropdown
              name="Background Color"
              value={color}
              handleChange={handleChange}
              displayColorPicker={displayColorPicker}
              setDisplayColorPicker={setDisplayColorPicker}
              isElement={isElement}
            />
          ) : (
            <WarningText text="Background Image and background Color cannot be use together!" />
          )}
        </>
      ) : (
        <ColorPickerDropdown
          name="Background Color"
          value={color}
          handleChange={handleChange}
          displayColorPicker={displayColorPicker}
          setDisplayColorPicker={setDisplayColorPicker}
          isElement={isElement}
        />
      )}
    </>
  );
};

export default BgColorComponent;
