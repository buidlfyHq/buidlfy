import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { updateWorkspaceElementStyle } from "redux/workspace/workspace.reducers";
import { ReplaceValue } from "components/utils/render-setting";
import ArrowInput from "components/utils/arrow-input";
import "styles/components.css";
import "styles/dashboard.css";

interface IBorderRadiusComponent {
  i: string;
  borderRadius: number;
}

const BorderRadiusComponent: FC<IBorderRadiusComponent> = ({
  i,
  borderRadius,
}) => {
  const dispatch = useDispatch();

  // FIX: find suitable type
  const handleRadius = (e, action: ReplaceValue) => {
    if (action === ReplaceValue.INCREMENT) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "borderRadius",
          propertyValue: borderRadius + 1,
        })
      );
    } else if (action === ReplaceValue.DECREMENT) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "borderRadius",
          propertyValue: borderRadius <= 0 ? 0 : borderRadius - 1,
        })
      );
    } else if (action === ReplaceValue.CHANGE) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "borderRadius",
          propertyValue: +e.target.value,
        })
      );
    }
  };

  return (
    <ArrowInput
      text="Border Radius"
      value={borderRadius}
      handleChange={(e) => handleRadius(e, ReplaceValue.CHANGE)}
      handleIncrement={(e) => handleRadius(e, ReplaceValue.INCREMENT)}
      handleDecrement={(e) => handleRadius(e, ReplaceValue.DECREMENT)}
    />
  );
};
export default BorderRadiusComponent;
