import React, { useState, FC } from "react";
import { useDispatch } from "react-redux";
import { updateWorkspaceElementStyle } from "redux/workspace/workspace.reducers";
import ColorPickerDropdown from "components/utils/color-picker";
import "styles/components.css";
import "styles/dashboard.css";

interface IBorderColorComponent {
  i: string;
  borderColor: string;
}

const BorderColorComponent: FC<IBorderColorComponent> = ({
  i,
  borderColor,
}) => {
  const dispatch = useDispatch();
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const handleChange = (e: string) => {
    dispatch(
      updateWorkspaceElementStyle({
        settingItemId: i,
        propertyName: "borderColor",
        propertyValue: e,
      })
    );
  };

  const isElement = !!i;

  return (
    <ColorPickerDropdown
      name="Border Color"
      value={borderColor}
      handleChange={handleChange}
      displayColorPicker={displayColorPicker}
      setDisplayColorPicker={setDisplayColorPicker}
      isElement={isElement}
    />
  );
};

export default BorderColorComponent;
