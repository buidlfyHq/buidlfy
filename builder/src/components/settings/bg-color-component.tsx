import React, { useState, FC } from "react";
import { useDispatch } from "react-redux";
import { updateWorkspaceElementStyle } from "redux/workspace/workspace.reducers";
import ColorPickerDropdown from "components/utils/color-picker";
import "styles/components.css";
import "styles/dashboard.css";

interface IBgColorComponent {
  i?: string;
  elementBackgroundColor?: string;
  workspaceBackgroundColor?: string;
  setWorkspaceBackgroundColor?: (workspaceBackgroundColor: string) => void;
}

const BgColorComponent: FC<IBgColorComponent> = ({
  i,
  elementBackgroundColor,
  workspaceBackgroundColor,
  setWorkspaceBackgroundColor,
}) => {
  const dispatch = useDispatch();
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
    <ColorPickerDropdown
      name="Background Color"
      value={color}
      handleChange={handleChange}
      displayColorPicker={displayColorPicker}
      setDisplayColorPicker={setDisplayColorPicker}
      isElement={isElement}
    />
  );
};

export default BgColorComponent;
