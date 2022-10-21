import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { updateWorkspaceElementStyle } from "redux/workspace/workspace.reducers";
import { ReplaceValue } from "components/utils/render-setting";
import NumberInput from "components/utils/input/number-input";
import "styles/components.css";
import "styles/dashboard.css";

interface IFontSizeComponent {
  i: string;
  fontSize: number;
}

const FontSizeComponent: FC<IFontSizeComponent> = ({ i, fontSize }) => {
  const dispatch = useDispatch();

  const handleFontSize = (action: ReplaceValue, updatedFontSize?: number) => {
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
          propertyValue: updatedFontSize,
        })
      );
    }
  };

  return (
    <NumberInput
      text="Font Size"
      value={fontSize}
      handleChange={(updatedFontSize: number) =>
        handleFontSize(ReplaceValue.CHANGE, updatedFontSize)
      }
      handleIncrement={() => handleFontSize(ReplaceValue.INCREMENT)}
      handleDecrement={() => handleFontSize(ReplaceValue.DECREMENT)}
    />
  );
};
export default FontSizeComponent;
