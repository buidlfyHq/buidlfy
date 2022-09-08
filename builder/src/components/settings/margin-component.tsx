import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { updateWorkspaceElementSubStyle } from "redux/workspace/workspace.reducers";
import IItems from "interfaces/items";
import "styles/components.css";
import "styles/dashboard.css";

interface IMarginComponent {
  selectedItem: IItems;
}

const MarginComponent: FC<IMarginComponent> = ({ selectedItem }) => {
  const dispatch = useDispatch();
  const margin = selectedItem?.style?.margin;

  const handleChange = (
    property: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      updateWorkspaceElementSubStyle({
        settingItemId: selectedItem.i,
        propertyName: "margin",
        propertyValue: +e.target.value,
        childPropertyName: property,
      })
    );
  };

  // const incrementCounter = () => {
  //   if (margin.marginLeft) {
  //     setMarginLeft(margin.marginLeft + 1);
  //   } else if (margin.marginRight) {
  //     setMarginRight(margin.marginRight + 1);
  //   } else if (margin.marginTop) {
  //     setMarginTop(margin.marginTop + 1);
  //   } else {
  //     setMarginBottom(margin.marginBottom + 1);
  //   }
  // };

  const incrementCounter = (property: string, value: number) => {
    dispatch(
      updateWorkspaceElementSubStyle({
        settingItemId: selectedItem.i,
        propertyName: "margin",
        propertyValue: value + 1,
        childPropertyName: property,
      })
    );
  };

  const decrementCounter = (property: string, value: number) => {
    dispatch(
      updateWorkspaceElementSubStyle({
        settingItemId: selectedItem.i,
        propertyName: "margin",
        propertyValue: value - 1,
        childPropertyName: property,
      })
    );
  };

  return (
    <>
      <div className="flex items-center w-full px-3 py-2 text-gray-600">
        <span className="px-1 text-left text-xl text-gray-500 font-regular font-normal not-italic">
          <span className="margin-text">Margin</span>
          <div className="flex mt-3">
            <h6 className="mr-2 margin-subtext">L</h6>
            <input
              inputMode="numeric"
              value={margin.marginLeft}
              placeholder="0"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[75px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={(e) => handleChange("marginLeft", e)}
            />
            <AiOutlineCaretUp
              onClick={() => incrementCounter("marginLeft", margin?.marginLeft)}
              className="text-[10px] z-[100] absolute left-[6.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={() => decrementCounter("marginLeft", margin?.marginLeft)}
              className="text-[10px] z-[100] absolute left-[6.2rem] mt-[1rem] text-black"
            />
            <h6 className="ml-5 mr-2 margin-subtext">R</h6>
            <input
              inputMode="numeric"
              value={margin.marginRight}
              placeholder="0"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[75px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={(e) => handleChange("marginRight", e)}
            />
            <AiOutlineCaretUp
              onClick={() =>
                incrementCounter("marginRight", margin?.marginRight)
              }
              className="text-[10px] z-[100] absolute left-[13.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={() =>
                decrementCounter("marginRight", margin?.marginRight)
              }
              className="text-[10px] z-[100] absolute left-[13.2rem] mt-[1rem] text-black"
            />
          </div>
          <div className="flex mt-3">
            <h6 className="mr-2 margin-subtext">T</h6>
            <input
              inputMode="numeric"
              value={margin.marginTop}
              placeholder="0"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[75px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={(e) => handleChange("marginTop", e)}
            />
            <AiOutlineCaretUp
              onClick={() => incrementCounter("marginTop", margin?.marginTop)}
              className="text-[10px] z-[100] absolute left-[6.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={() => decrementCounter("marginTop", margin?.marginTop)}
              className="text-[10px] z-[100] absolute left-[6.2rem] mt-[1rem] text-black"
            />
            <h6 className="ml-5 mr-2 margin-subtext">B</h6>
            <input
              inputMode="numeric"
              value={margin.marginBottom}
              placeholder="0"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[75px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={(e) => handleChange("marginBottom", e)}
            />
            <AiOutlineCaretUp
              onClick={() =>
                incrementCounter("marginBottom", margin?.marginBottom)
              }
              className="text-[10px] z-[100] absolute left-[13.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={() =>
                decrementCounter("marginBottom", margin?.marginBottom)
              }
              className="text-[10px] z-[100] absolute left-[13.2rem] mt-[1rem] text-black"
            />
          </div>
        </span>
      </div>
    </>
  );
};
export default MarginComponent;
