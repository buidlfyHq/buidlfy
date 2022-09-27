import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { updateWorkspaceElementSubStyle } from "redux/workspace/workspace.reducers";
import "styles/components.css";
import "styles/dashboard.css";

interface IMarginComponent {
  i: string;
  margin: {
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
  };
}

const MarginComponent: FC<IMarginComponent> = ({ i, margin }) => {
  const dispatch = useDispatch();

  const handleChange = (
    property: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      updateWorkspaceElementSubStyle({
        settingItemId: i,
        propertyName: "margin",
        propertyValue: +e.target.value,
        childPropertyName: property,
      })
    );
  };

  const incrementCounter = (property: string, value: number) => {
    dispatch(
      updateWorkspaceElementSubStyle({
        settingItemId: i,
        propertyName: "margin",
        propertyValue: value + 1,
        childPropertyName: property,
      })
    );
  };

  const decrementCounter = (property: string, value: number) => {
    dispatch(
      updateWorkspaceElementSubStyle({
        settingItemId: i,
        propertyName: "margin",
        propertyValue: value - 1,
        childPropertyName: property,
      })
    );
  };

  return (
    <>
      <div className="flex items-center w-full px-3 py-4 text-gray-600">
        <span className="px-1 text-left ">
          <span className="margin-text">Margin</span>
          <div className="flex mt-3">
            <h6 className="mr-2 margin-subtext">L</h6>
            <input
              inputMode="numeric"
              value={`${margin?.marginLeft}px`}
              placeholder="0"
              className="margin-form pl-2 py-1.5 form-select appearance-none block w-[75px]"
              onChange={(e) => handleChange("marginLeft", e)}
            />
            <AiOutlineCaretUp
              onClick={() => incrementCounter("marginLeft", margin?.marginLeft)}
              className="text-[10px] z-[100] absolute left-[6.2rem] arrow mt-[0.4rem] cursor-pointer"
            />
            <AiOutlineCaretDown
              onClick={() => decrementCounter("marginLeft", margin?.marginLeft)}
              className="text-[10px] z-[100] absolute left-[6.2rem] mt-[1rem] arrow cursor-pointer"
            />
            <h6 className="ml-5 mr-2 margin-subtext">R</h6>
            <input
              inputMode="numeric"
              value={`${margin?.marginRight}px`}
              placeholder="0"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[75px]"
              onChange={(e) => handleChange("marginRight", e)}
            />
            <AiOutlineCaretUp
              onClick={() =>
                incrementCounter("marginRight", margin?.marginRight)
              }
              className="text-[10px] z-[100] absolute left-[13.2rem] arrow mt-[0.4rem] cursor-pointer"
            />
            <AiOutlineCaretDown
              onClick={() =>
                decrementCounter("marginRight", margin?.marginRight)
              }
              className="text-[10px] z-[100] absolute left-[13.2rem] mt-[1rem] arrow cursor-pointer"
            />
          </div>
          <div className="flex mt-3">
            <h6 className="mr-2 margin-subtext">T</h6>
            <input
              inputMode="numeric"
              value={`${margin?.marginTop}px`}
              placeholder="0"
              className="margin-form pl-2 py-1.5 form-select appearance-none block w-[75px]"
              onChange={(e) => handleChange("marginTop", e)}
            />
            <AiOutlineCaretUp
              onClick={() => incrementCounter("marginTop", margin?.marginTop)}
              className="text-[10px] z-[100] absolute left-[6.2rem] arrow mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={() => decrementCounter("marginTop", margin?.marginTop)}
              className="text-[10px] z-[100] absolute left-[6.2rem] mt-[1rem] arrow"
            />
            <h6 className="ml-5 mr-2 margin-subtext">B</h6>
            <input
              inputMode="numeric"
              value={`${margin?.marginBottom}px`}
              placeholder="0"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[75px]"
              onChange={(e) => handleChange("marginBottom", e)}
            />
            <AiOutlineCaretUp
              onClick={() =>
                incrementCounter("marginBottom", margin?.marginBottom)
              }
              className="text-[10px] z-[100] absolute left-[13.2rem] arrow mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={() =>
                decrementCounter("marginBottom", margin?.marginBottom)
              }
              className="text-[10px] z-[100] absolute left-[13.2rem] mt-[1rem] arrow"
            />
          </div>
        </span>
      </div>
    </>
  );
};
export default MarginComponent;
