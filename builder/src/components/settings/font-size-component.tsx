import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { updateWorkspaceElementStyle } from "redux/workspace/workspace.reducers";
import { ReplaceValue } from "components/utils/render-setting";
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
    // ADD: Common input component for this will be added in following PR
    <div className="flex px-1">
      <div className="mt-7 ml-3 margin-text w-[120px]">Font Size</div>
      <div className="flex justify-end text-gray-600 w-full py-4 mx-2">
        <input
          inputMode="numeric"
          value={fontSize}
          placeholder="0"
          className="margin-form pl-2 py-1.5 form-select appearance-none block w-[75px]"
          onChange={(e) => handleFontSize(e, ReplaceValue.CHANGE)}
        />
        <AiOutlineCaretUp
          onClick={(e) => handleFontSize(e, ReplaceValue.INCREMENT)}
          className="text-[10px] arrow absolute left-[13.5rem] mt-[0.3rem] cursor-pointer"
        />
        <AiOutlineCaretDown
          onClick={(e) => handleFontSize(e, ReplaceValue.DECREMENT)}
          className="text-[10px] arrow absolute left-[13.5rem] mt-[0.9rem] cursor-pointer"
        />
      </div>
    </div>
  );
};
export default FontSizeComponent;
