import React, { FC } from "react";
import { useDispatch } from "react-redux";
import {
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
  AiOutlineAlignCenter,
} from "react-icons/ai";
import { updateWorkspaceElementStyle } from "redux/workspace/workspace.reducers";
import { ReplaceStyle } from "components/utils/render-setting";
import "styles/components.css";
import "styles/dashboard.css";
import WarningText from "components/utils/setting-warning";

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

  return (
    <>
      <div className="flex grey-div w-auto mx-2 mb-3 items-center mt-2 text-black">
        <span
          onClick={() => handleChange(ReplaceStyle.BOLD)}
          className={`font-bold ml-[10px] combined-style ${activeClassName(
            fontWeight,
            ReplaceStyle.BOLD
          )}`}
        >
          B
        </span>
        <span
          onClick={() => handleChange(ReplaceStyle.ITALIC)}
          className={`italic combined-style ${activeClassName(
            fontStyle,
            ReplaceStyle.ITALIC
          )}`}
        >
          i
        </span>
        <span
          onClick={() => handleChange(ReplaceStyle.UNDERLINE)}
          className={`underline combined-style ${activeClassName(
            textDecoration,
            ReplaceStyle.UNDERLINE
          )} `}
        >
          U
        </span>

        <span
          onClick={() => handleAlignChange(ReplaceStyle.LEFT)}
          className={`combined-style ${activeClassName(
            justifyContent,
            ReplaceStyle.LEFT
          )}`}
        >
          <AiOutlineAlignLeft className="text-[16px]" />
        </span>
        <span
          onClick={() => handleAlignChange(ReplaceStyle.CENTER)}
          className={`combined-style ${activeClassName(
            justifyContent,
            ReplaceStyle.CENTER
          )}`}
        >
          <AiOutlineAlignCenter className="text-[16px]" />
        </span>
        <span
          onClick={() => handleAlignChange(ReplaceStyle.RIGHT)}
          className={`combined-style ${activeClassName(
            justifyContent,
            ReplaceStyle.RIGHT
          )}`}
        >
          <AiOutlineAlignRight className="text-[16px]" />
        </span>
      </div>
      {gradientCondition ? (
        <WarningText text="Sorry, You can't make underline gradient!" />
      ) : null}
    </>
  );
};
export default CombinedComponent;
