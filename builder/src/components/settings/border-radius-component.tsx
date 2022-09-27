import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { updateWorkspaceElementStyle } from "redux/workspace/workspace.reducers";
import { ReplaceValue } from "components/utils/render-setting";
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
    <>
      <div className="flex px-1">
        <div className="mt-[1.4rem] ml-3 margin-text w-[140px]">
          Border Radius
        </div>
        <div className="flex justify-end text-gray-600 w-[4.2rem] py-4">
          <input
            inputMode="numeric"
            value={borderRadius}
            placeholder="0"
            className="margin-form pl-2 py-1.5 form-select appearance-none block w-[75px]"
            onChange={(e) => handleRadius(e, ReplaceValue.CHANGE)}
          />
          <AiOutlineCaretUp
            onClick={(e) => handleRadius(e, ReplaceValue.INCREMENT)}
            className="text-[10px] absolute left-[13.5rem] arrow mt-[0.3rem] cursor-pointer"
          />
          <AiOutlineCaretDown
            onClick={(e) => handleRadius(e, ReplaceValue.DECREMENT)}
            className="text-[10px] absolute left-[13.5rem] mt-[0.9rem] arrow cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};
export default BorderRadiusComponent;
