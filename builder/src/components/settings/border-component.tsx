import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { updateWorkspaceElementStyle } from "redux/workspace/workspace.reducers";
import IItems from "interfaces/items";
import "styles/components.css";
import "styles/dashboard.css";

interface IBorderComponent {
  selectedItem: IItems;
}

const BorderComponent: FC<IBorderComponent> = ({ selectedItem }) => {
  const dispatch = useDispatch();
  const borderWidth = selectedItem?.style?.borderWidth;

  const incrementWidthCounter = () => {
    dispatch(
      updateWorkspaceElementStyle({
        settingItemId: selectedItem.i,
        propertyName: "borderWidth",
        propertyValue: borderWidth + 1,
      })
    );
  };

  const decrementWidthCounter = () => {
    dispatch(
      updateWorkspaceElementStyle({
        settingItemId: selectedItem.i,
        propertyName: "borderWidth",
        propertyValue: borderWidth <= 0 ? 0 : borderWidth - 1,
      })
    );
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (borderWidth) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: selectedItem.i,
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
      <span className="text-left text-xl text-gray-500 font-regular font-normal not-italic">
        {/* Border Radius */}
        <div className="flex mt-3">
          {/* <span
          onClick={decrementCounter}
          className="flex items-center justify-center shadow text-[18px] mr-3 w-8 h-10 font-regular text-black"
        >
          -
        </span> */}
          <div className="flex">
            <span className="font-text">Border Width:</span>
            <select
              value={borderWidth}
              onChange={(e) => handleWidthChange(e)}
              className="form-select font-div appearance-none block py-1.5 pl-[10.5rem] text-sm font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out focus:outline-none focus:shadow-none"
              aria-label="select"
            >
              <option selected>{borderWidth}</option>
              {renderOptions}
            </select>
            <AiOutlineCaretUp
              onClick={incrementWidthCounter}
              className="text-[10px] absolute left-[13.2rem] text-black mt-[0.3rem]"
            />
            <AiOutlineCaretDown
              onClick={decrementWidthCounter}
              className="text-[10px] absolute left-[13.2rem] mt-[0.9rem] text-black"
            />
          </div>
          {/* <span
              onClick={incrementCounter}
              className="flex ml-3 items-center justify-center shadow text-[18px] w-8 h-10 font-regular text-black"
            >
              +
            </span> */}
        </div>
      </span>
    </div>
  );
};
export default BorderComponent;
