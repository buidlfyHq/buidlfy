import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { updateWorkspaceElementStyle } from "redux/workspace/workspace.reducers";
import { ReplaceValue } from "components/utils/render-setting";
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
    <div className="flex px-1">
      <div className="mt-[1.4rem] ml-3 margin-text w-[140px]">Border Width</div>
      <div className="flex justify-end text-gray-600 w-[4.2rem] py-4">
        <input
          inputMode="numeric"
          value={`${borderWidth}px`}
          placeholder="0"
          className="margin-form pl-2 py-1.5 form-select appearance-none block w-[75px]"
          onChange={(e) => handleWidth(e, ReplaceValue.CHANGE)}
        />
        <AiOutlineCaretUp
          onClick={(e) => handleWidth(e, ReplaceValue.INCREMENT)}
          className="text-[10px] absolute left-[13.5rem] arrow mt-[0.3rem] cursor-pointer"
        />
        <AiOutlineCaretDown
          onClick={(e) => handleWidth(e, ReplaceValue.DECREMENT)}
          className="text-[10px] absolute left-[13.5rem] mt-[0.9rem] arrow cursor-pointer"
        />
      </div>
    </div>
  );
};
export default BorderComponent;
