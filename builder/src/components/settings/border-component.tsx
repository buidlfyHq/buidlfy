import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { updateWorkspaceElementStyle } from "redux/workspace/workspace.reducers";
import { ReplaceValue } from "components/utils/render-setting";
import ArrowInput from "components/utils/arrow-input";
import "styles/components.css";
import "styles/dashboard.css";

interface IBorderComponent {
  i: string;
  borderWidth: number;
}

const BorderComponent: FC<IBorderComponent> = ({ i, borderWidth }) => {
  const dispatch = useDispatch();

  // FIX: find suitable type
  const handleWidth = (e, action: ReplaceValue) => {
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
          propertyValue: +e.target.value,
        })
      );
    }
  };

  return (
    <ArrowInput
      text="Border Width"
      value={borderWidth}
      handleChange={(e) => handleWidth(e, ReplaceValue.CHANGE)}
      handleIncrement={(e) => handleWidth(e, ReplaceValue.INCREMENT)}
      handleDecrement={(e) => handleWidth(e, ReplaceValue.DECREMENT)}
    />
  );
};
export default BorderComponent;
