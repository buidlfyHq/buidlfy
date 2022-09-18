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
    if (action == ReplaceValue.INCREMENT) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "borderRadius",
          propertyValue: borderRadius + 1,
        })
      );
    } else if (action == ReplaceValue.DECREMENT) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "borderRadius",
          propertyValue: borderRadius <= 0 ? 0 : borderRadius - 1,
        })
      );
    } else if (action == ReplaceValue.CHANGE) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "borderRadius",
          propertyValue: +e.target.value,
        })
      );
    }
  };

  const options = [2, 4, 5, 7, 8, 10, 15, 20, 25].map((number) => (
    <option key={number} value={number}>
      {number}
    </option>
  ));

  return (
    <>
      <div className="flex text-gray-600 w-full mt-4 mx-2">
        <span className="text-left ">
          <div className="flex mt-3">
            <div className="flex">
              <span className="font-text">Border Radius:</span>
              <select
                value={borderRadius}
                onClick={(e) => handleRadius(e, ReplaceValue.CHANGE)}
                className="form-select font-div appearance-none block py-1.5 pl-[10.5rem] text-sm font-normal text-gray-700"
                aria-label="Default select example"
              >
                <option selected>{borderRadius}</option>
                {options}
              </select>
              <AiOutlineCaretUp
                onClick={(e) => handleRadius(e, ReplaceValue.INCREMENT)}
                className="text-[10px] absolute left-[13.2rem] text-black mt-[0.3rem]"
              />
              <AiOutlineCaretDown
                onClick={(e) => handleRadius(e, ReplaceValue.DECREMENT)}
                className="text-[10px] absolute left-[13.2rem] mt-[0.9rem] text-black"
              />
            </div>
          </div>
        </span>
      </div>
    </>
  );
};
export default BorderRadiusComponent;
