import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { updateWorkspaceElementStyle } from "redux/workspace/workspace.reducers";
import { ReplaceValue } from "components/utils/render-setting";
import NumberInput from "components/utils/input/number-input";
import "styles/components.css";
import "styles/dashboard.css";

interface IFontWeightComponent {
  i: string;
  fontWeight: number;
}

const FontWeightComponent: FC<IFontWeightComponent> = ({ i, fontWeight }) => {
  const dispatch = useDispatch();

  const handleFontWeight = (
    action: ReplaceValue,
    updatedFontWeight?: number
  ) => {
    if (action === ReplaceValue.INCREMENT) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "fontWeight",
          propertyValue: fontWeight + 100,
        })
      );
    } else if (action === ReplaceValue.DECREMENT) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "fontWeight",
          propertyValue: fontWeight <= 100 ? 100 : fontWeight - 100,
        })
      );
    } else if (action === ReplaceValue.CHANGE) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "fontWeight",
          propertyValue: updatedFontWeight,
        })
      );
    }
  };

  return (
    <NumberInput
      text="Font Weight"
      value={fontWeight}
      handleChange={(updatedFontWeight: number) =>
        handleFontWeight(ReplaceValue.CHANGE, updatedFontWeight)
      }
      handleIncrement={() => handleFontWeight(ReplaceValue.INCREMENT)}
      handleDecrement={() => handleFontWeight(ReplaceValue.DECREMENT)}
    />
  );
};
export default FontWeightComponent;
