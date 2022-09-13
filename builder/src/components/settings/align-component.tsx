import React, { FC } from "react";
import {
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
  AiOutlineAlignCenter,
} from "react-icons/ai";
import { ReplaceStyle } from "components/utils/render-setting";
import "styles/components.css";
import "styles/dashboard.css";

interface IAlignComponent {
  setLeft: (justifyContent: string | boolean) => void;
  setRight: (justifyContent: string | boolean) => void;
  setCenter: (justifyContent: string | boolean) => void;
  justifyContent: string;
}

const AlignComponent: FC<IAlignComponent> = ({
  setLeft,
  setRight,
  setCenter,
  justifyContent,
}) => {
  const handleChange = (action: ReplaceStyle) => {
    if (action == ReplaceStyle.LEFT) {
      setLeft(justifyContent !== "left");
    } else if (action == ReplaceStyle.RIGHT) {
      setRight(justifyContent !== "right");
    } else if (action == ReplaceStyle.CENTER) {
      setCenter(justifyContent !== "center");
    }
  };

  return (
    <>
      <span className="margin-text text-left px-3 mt-2 mb-0 text-xl text-gray-500 font-regular font-normal not-italic">
        Text Align
        <div className="flex mt-3 px-3">
          <span
            onClick={() => handleChange(ReplaceStyle.LEFT)}
            className="align-div flex items-center justify-center font-bold shadow text-[18px] p-2 mr-2 my-2 font-regular"
          >
            <AiOutlineAlignLeft className="text-[18px]" />
          </span>
          <span
            onClick={() => handleChange(ReplaceStyle.CENTER)}
            className="align-div flex items-center justify-center italic shadow text-[18px] p-2 mx-2 my-2 font-regular text-black"
          >
            <AiOutlineAlignCenter className="text-[18px]" />
          </span>
          <span
            onClick={() => handleChange(ReplaceStyle.RIGHT)}
            className="align-div flex items-center justify-center underline shadow text-[18px] p-2 mx-2 my-2 font-regular text-black"
          >
            <AiOutlineAlignRight className="text-[18px]" />
          </span>
        </div>
      </span>
    </>
  );
};
export default AlignComponent;
