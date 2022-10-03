import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { updateWorkspaceElementStyle } from "redux/workspace/workspace.reducers";
import { ReplaceValue } from "components/utils/render-setting";
import NumberInput from "components/utils/number-input";
import "styles/components.css";
import "styles/dashboard.css";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface IBorderRadiusComponent {
  i: string;
  borderRadius: number;
  borderColor?: string;
}

const BorderRadiusComponent: FC<IBorderRadiusComponent> = ({
  i,
  borderRadius,
  borderColor,
}) => {
  const dispatch = useDispatch();

  const handleRadius = (action: ReplaceValue, updatedBorderRadius?: number) => {
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
          propertyValue: updatedBorderRadius,
        })
      );
    }
  };

  return (
    <>
      <NumberInput
        text="Border Radius"
        value={borderRadius}
        handleChange={(updatedBorderRadius: number) =>
          handleRadius(ReplaceValue.CHANGE, updatedBorderRadius)
        }
        handleIncrement={() => handleRadius(ReplaceValue.INCREMENT)}
        handleDecrement={() => handleRadius(ReplaceValue.DECREMENT)}
      />
      {borderColor?.slice(0, 15) === "linear-gradient" ? (
        <div className="bg-[#EFEDFD] rounded-[4px] pt-1 pb-3 px-2 mr-[0.6rem] ml-[1rem] mb-[0.5rem]">
          <div className="text-[10px] text-[#475385] flex">
            <IoMdInformationCircleOutline className="text-[40px]" />
            <p className="ml-[0.3rem] mt-[0.6rem]">
              Sorry, Border gradient and border radius cannot be use together!
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default BorderRadiusComponent;
