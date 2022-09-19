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
    if (action == ReplaceValue.INCREMENT) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "fontSize",
          propertyValue: fontSize + 1,
        })
      );
    } else if (action == ReplaceValue.DECREMENT) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "fontSize",
          propertyValue: fontSize <= 1 ? 1 : fontSize - 1,
        })
      );
    } else if (action == ReplaceValue.CHANGE) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "fontSize",
          propertyValue: +e.target.value,
        })
      );
    }
  };

  const options = [8, 9, 10, 11, 12, 14, 15, 18, 24, 30, 36, 48, 60, 72, 96].map(
    (number) => (
      <option key={number} value={number}>
        {number}
      </option>
    )
  );

  return (
    <div className="flex text-gray-600 w-full mt-4 mx-2">
      <span className="text-left ">
        <div className="flex mt-3">
          <div className="flex">
            <span className="font-text">Font Size:</span>
            <select
              onChange={(e) => handleFontSize(e, ReplaceValue.CHANGE)}
              className="form-select font-div appearance-none block py-1.5 pl-[10.2rem] text-sm font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out focus:outline-none focus:shadow-none"
              aria-label="Default select example"
            >
              <option value={fontSize}>{fontSize}</option>
              {options}
            </select>
            <AiOutlineCaretUp
              onClick={(e) => handleFontSize(e, ReplaceValue.INCREMENT)}
              className="text-[10px] absolute left-[13.2rem] text-black mt-[0.3rem]"
            />
            <AiOutlineCaretDown
              onClick={(e) => handleFontSize(e, ReplaceValue.DECREMENT)}
              className="text-[10px] absolute left-[13.2rem] mt-[0.9rem] text-black"
            />
          </div>
        </div>
      </span>
    </div>
  );
};
export default FontSizeComponent;
