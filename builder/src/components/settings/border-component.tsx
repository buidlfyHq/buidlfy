import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { updateWorkspaceElementStyle } from "redux/workspace/workspace.reducers";
import { ReplaceValue } from "components/utils/render-setting";
import NumberInput from "components/utils/number-input";
import "styles/components.css";
import "styles/dashboard.css";

interface IBorderComponent {
  i: string;
  borderWidth: number;
}

const BorderComponent: FC<IBorderComponent> = ({ i, borderWidth }) => {
  const dispatch = useDispatch();

  const handleWidth = (action: ReplaceValue, updatedBorderWidth?: number) => {
    if (action === ReplaceValue.INCREMENT) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "borderWidth",
          propertyValue: borderWidth + 1,
        })
      );
    } else if (action === ReplaceValue.DECREMENT) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "borderWidth",
          propertyValue: borderWidth <= 0 ? 0 : borderWidth - 1,
        })
      );
    } else if (action === ReplaceValue.CHANGE) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "borderWidth",
          propertyValue: updatedBorderWidth,
        })
      );
    }
  };

  return (
    <NumberInput
      text="Border Width"
      value={borderWidth}
      handleChange={(updatedBorderWidth: number) =>
        handleWidth(ReplaceValue.CHANGE, updatedBorderWidth)
      }
      handleIncrement={() => handleWidth(ReplaceValue.INCREMENT)}
      handleDecrement={() => handleWidth(ReplaceValue.DECREMENT)}
    />
  );
};
export default BorderComponent;
