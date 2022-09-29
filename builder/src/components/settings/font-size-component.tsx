import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { updateWorkspaceElementStyle } from "redux/workspace/workspace.reducers";
import { ReplaceValue } from "components/utils/render-setting";
import ArrowInput from "components/utils/arrow-input";
import "styles/components.css";
import "styles/dashboard.css";

interface IFontSizeComponent {
  i: string;
  fontSize: number;
}

const FontSizeComponent: FC<IFontSizeComponent> = ({ i, fontSize }) => {
  const dispatch = useDispatch();

  // FIX: find suitable type
  const handleFontSize = (e, action: ReplaceValue) => {
    if (action === ReplaceValue.INCREMENT) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "fontSize",
          propertyValue: fontSize + 1,
        })
      );
    } else if (action === ReplaceValue.DECREMENT) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "fontSize",
          propertyValue: fontSize <= 1 ? 1 : fontSize - 1,
        })
      );
    } else if (action === ReplaceValue.CHANGE) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "fontSize",
          propertyValue: +e.target.value,
        })
      );
    }
  };

  return (
    <ArrowInput
      text="Font Size"
      value={fontSize}
      handleChange={(e) => handleFontSize(e, ReplaceValue.CHANGE)}
      handleIncrement={(e) => handleFontSize(e, ReplaceValue.INCREMENT)}
      handleDecrement={(e) => handleFontSize(e, ReplaceValue.DECREMENT)}
    />
  );
};
export default FontSizeComponent;
