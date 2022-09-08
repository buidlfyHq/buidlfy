import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { updateWorkspaceElementSubStyle } from "redux/workspace/workspace.reducers";
import IItems from "interfaces/items";
import "styles/components.css";
import "styles/dashboard.css";

interface IPaddingComponent {
  selectedItem: IItems;
}

const PaddingComponent: FC<IPaddingComponent> = ({ selectedItem }) => {
  const dispatch = useDispatch();
  const padding = selectedItem?.style?.padding;

  const handleChange = (
    property: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      updateWorkspaceElementSubStyle({
        settingItemId: selectedItem.i,
        propertyName: "padding",
        propertyValue: +e.target.value,
        childPropertyName: property,
      })
    );
  };

  const incrementCounter = (property: string, value: number) => {
    dispatch(
      updateWorkspaceElementSubStyle({
        settingItemId: selectedItem.i,
        propertyName: "padding",
        propertyValue: value + 1,
        childPropertyName: property,
      })
    );
  };

  const decrementCounter = (property: string, value: number) => {
    dispatch(
      updateWorkspaceElementSubStyle({
        settingItemId: selectedItem.i,
        propertyName: "padding",
        propertyValue: value - 1,
        childPropertyName: property,
      })
    );
  };

  return (
    <>
      <div className="flex items-center w-full px-3 py-2 text-gray-600">
        <span className="px-1 text-left my-1 text-xl text-gray-500 font-regular font-normal not-italic">
          <span className="margin-text">Padding</span>
          <div className="flex mt-3">
            <h6 className="margin-subtext mr-2">L</h6>
            <input
              inputMode="numeric"
              id="padding-left"
              name="paddingLeft"
              value={padding.paddingLeft}
              placeholder="0"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[75px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={(e) => handleChange("paddingLeft", e)}
            />
            <AiOutlineCaretUp
              onClick={() =>
                incrementCounter("paddingLeft", padding?.paddingLeft)
              }
              className="text-[10px] z-[100] absolute left-[6.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={() =>
                decrementCounter("paddingLeft", padding?.paddingLeft)
              }
              className="text-[10px] z-[100] absolute left-[6.2rem] mt-[1rem] text-black"
            />
            <h6 className="margin-text ml-5 mr-2 margin-subtext">R</h6>
            <input
              inputMode="numeric"
              id="padding-right"
              name="paddingRight"
              value={padding.paddingRight}
              placeholder="0"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[75px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={(e) => handleChange("paddingRight", e)}
            />
            <AiOutlineCaretUp
              onClick={() =>
                incrementCounter("paddingRight", padding?.paddingRight)
              }
              className="text-[10px] z-[100] absolute left-[13.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={() =>
                decrementCounter("paddingRight", padding?.paddingRight)
              }
              className="text-[10px] z-[100] absolute left-[13.2rem] mt-[1rem] text-black"
            />
          </div>
          <div className="flex mt-3">
            <h6 className="mr-2 margin-subtext">T</h6>
            <input
              inputMode="numeric"
              id="padding-top"
              name="paddingTop"
              value={padding.paddingTop}
              placeholder="0"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[75px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={(e) => handleChange("paddingTop", e)}
            />
            <AiOutlineCaretUp
              onClick={() =>
                incrementCounter("paddingTop", padding?.paddingTop)
              }
              className="text-[10px] z-[100] absolute left-[6.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={() =>
                decrementCounter("paddingTop", padding?.paddingTop)
              }
              className="text-[10px] z-[100] absolute left-[6.2rem] mt-[1rem] text-black"
            />
            <h6 className="ml-5 mr-2 margin-subtext">B</h6>
            <input
              inputMode="numeric"
              id="padding-bottom"
              name="paddingBottom"
              value={padding.paddingBottom}
              placeholder="0"
              className="margin-form pl-2 py-0.5 form-select appearance-none block w-[75px] text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:shadow-none"
              onChange={(e) => handleChange("paddingBottom", e)}
            />
            <AiOutlineCaretUp
              onClick={() =>
                incrementCounter("paddingBottom", padding?.paddingBottom)
              }
              className="text-[10px] z-[100] absolute left-[13.2rem] text-black mt-[0.4rem]"
            />
            <AiOutlineCaretDown
              onClick={() =>
                decrementCounter("paddingBottom", padding?.paddingBottom)
              }
              className="text-[10px] z-[100] absolute left-[13.2rem] mt-[1rem] text-black"
            />
          </div>
        </span>
      </div>
    </>
  );
};
export default PaddingComponent;
