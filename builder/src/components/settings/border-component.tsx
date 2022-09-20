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

  const renderOptions = [1, 3, 5, 7, 9, 10, 12].map((number) => (
    <option key={number} value={number}>
      {number}
    </option>
  ));

  return (
    <div className="flex text-gray-600 w-full mt-4 mx-2">
      <span className="text-left ">
        <div className="flex mt-3">
          <div className="flex">
            <span className="font-text">Border Width:</span>
            <select
              onChange={(e) => handleWidth(e, ReplaceValue.CHANGE)}
              className="form-select font-div appearance-none block py-1.5 pl-[10.5rem] text-sm font-normal text-gray-700"
              aria-label="select"
            >
              <option value={borderWidth}>{borderWidth}</option>
              {renderOptions}
            </select>
            <AiOutlineCaretUp
              onClick={(e) => handleWidth(e, ReplaceValue.INCREMENT)}
              className="text-[10px] absolute left-[13.2rem] text-black mt-[0.3rem]"
            />
            <AiOutlineCaretDown
              onClick={(e) => handleWidth(e, ReplaceValue.DECREMENT)}
              className="text-[10px] absolute left-[13.2rem] mt-[0.9rem] text-black"
            />
          </div>
        </div>
      </span>
    </div>
  );
};
export default BorderComponent;
