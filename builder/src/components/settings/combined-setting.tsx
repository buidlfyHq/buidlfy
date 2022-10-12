import React, { FC } from "react";
import { useDispatch } from "react-redux";
import {
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
  AiOutlineAlignCenter,
} from "react-icons/ai";
import { updateWorkspaceElementStyle } from "redux/workspace/workspace.reducers";
import { ReplaceStyle } from "components/utils/render-setting";
import WarningText from "components/utils/setting-warning";
import "styles/components.css";
import "styles/dashboard.css";

interface ICombinedComponent {
  i: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  justifyContent: string;
  color: string;
}

const CombinedComponent: FC<ICombinedComponent> = ({
  i,
  fontWeight,
  fontStyle,
  textDecoration,
  justifyContent,
  color,
}) => {
  const dispatch = useDispatch();

  const handleChange = (action: ReplaceStyle) => {
    if (action === ReplaceStyle.BOLD) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "fontWeight",
          propertyValue:
            fontWeight === ReplaceStyle.BOLD ? "normal" : ReplaceStyle.BOLD,
        })
      );
    } else if (action === ReplaceStyle.ITALIC) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "fontStyle",
          propertyValue:
            fontStyle === ReplaceStyle.ITALIC ? "normal" : ReplaceStyle.ITALIC,
        })
      );
    } else if (action === ReplaceStyle.UNDERLINE) {
      dispatch(
        updateWorkspaceElementStyle({
          settingItemId: i,
          propertyName: "textDecoration",
          propertyValue:
            textDecoration === ReplaceStyle.UNDERLINE
              ? "none"
              : ReplaceStyle.UNDERLINE,
        })
      );
    }
  };

  const handleAlignChange = (type: string) => {
    dispatch(
      updateWorkspaceElementStyle({
        settingItemId: i,
        propertyName: "justifyContent",
        propertyValue: justifyContent === type ? "inherit" : type,
      })
    );
  };

  const gradientCondition = color?.indexOf("gradient") !== -1;
  const activeClassName = (property: string, propertyName: string) =>
    property === propertyName ? "bg-[#CDD4F3]" : "";
  const propertyData = {
    text: [
      "B",
      "i",
      "U",
      <AiOutlineAlignLeft className="text-[16px]" />,
      <AiOutlineAlignCenter className="text-[16px]" />,
      <AiOutlineAlignRight className="text-[16px]" />,
    ],
    className: [
      `font-bold ml-[10px] combined-style ${activeClassName(
        fontWeight,
        ReplaceStyle.BOLD
      )}`,
      `italic combined-style ${activeClassName(
        fontStyle,
        ReplaceStyle.ITALIC
      )}`,
      `underline combined-style ${activeClassName(
        textDecoration,
        ReplaceStyle.UNDERLINE
      )} `,
      `combined-style ${activeClassName(justifyContent, ReplaceStyle.LEFT)}`,
      `combined-style ${activeClassName(justifyContent, ReplaceStyle.CENTER)}`,
      `combined-style ${activeClassName(justifyContent, ReplaceStyle.RIGHT)}`,
    ],
    handleClick: [
      () => handleChange(ReplaceStyle.BOLD),
      () => handleChange(ReplaceStyle.ITALIC),
      () => handleChange(ReplaceStyle.UNDERLINE),
      () => handleAlignChange(ReplaceStyle.LEFT),
      () => handleAlignChange(ReplaceStyle.CENTER),
      () => handleAlignChange(ReplaceStyle.RIGHT),
    ],
  };
  return (
    <>
      <div className="flex grey-div w-auto mx-2 mb-3 items-center mt-2 text-black">
        {Array.from(Array(propertyData.text.length).keys())?.map(
          (i: string | number) => (
            <span
              onClick={propertyData.handleClick[i]}
              className={propertyData.className[i]}
            >
              {propertyData.text[i]}
            </span>
          )
        )}
      </div>
      {gradientCondition ? (
        <WarningText text="Sorry, You can't make underline gradient!" />
      ) : null}
    </>
  );
};
export default CombinedComponent;
