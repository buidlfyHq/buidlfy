import React, { FC } from "react";
import {
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
  AiOutlineAlignCenter,
} from "react-icons/ai";
import { ReplaceStyle } from "components/utils/render-setting";
import "styles/components.css";
import "styles/dashboard.css";

interface ICombinedComponent {
  bold: string;
  italic: string;
  underline: string;
  setBold: (bold: string | boolean) => void;
  setItalic: (italic: string | boolean) => void;
  setUnderline: (underline: string | boolean) => void;
  setLeft: (justifyContent: string | boolean) => void;
  setRight: (justifyContent: string | boolean) => void;
  setCenter: (justifyContent: string | boolean) => void;
  justifyContent: string;
}

const CombinedComponent: FC<ICombinedComponent> = ({
  bold,
  italic,
  underline,
  setBold,
  setItalic,
  setUnderline,
  setLeft,
  setRight,
  setCenter,
  justifyContent,
}) => {
  const handleChange = (action: ReplaceStyle) => {
    if (action == ReplaceStyle.BOLD) {
      setBold(bold !== "bold");
    } else if (action == ReplaceStyle.ITALIC) {
      setItalic(italic !== "italic");
    } else if (action == ReplaceStyle.UNDERLINE) {
      setUnderline(underline !== "underline");
    } else if (action == ReplaceStyle.LEFT) {
      setLeft(justifyContent !== "left");
    } else if (action == ReplaceStyle.RIGHT) {
      setRight(justifyContent !== "right");
    } else if (action == ReplaceStyle.CENTER) {
      setCenter(justifyContent !== "center");
    }
  };

  return (
    <div className="flex grey-div w-auto mx-2 mb-3 items-center mt-2 text-black">
      <span
        onClick={() => handleChange(ReplaceStyle.BOLD)}
        className="flex items-center mx-[0.75rem] justify-center font-bold text-[16px] py-1 font-regular text-black"
      >
        B
      </span>
      <span
        onClick={() => handleChange(ReplaceStyle.ITALIC)}
        className="flex items-center mx-[0.75rem] justify-center italic text-[16px] py-1 font-regular text-black"
      >
        i
      </span>
      <span
        onClick={() => handleChange(ReplaceStyle.UNDERLINE)}
        className="flex items-center mx-[0.75rem] justify-center underline text-[16px] py-1 font-regular text-black"
      >
        U
      </span>
      <div className="flex">
        <span
          onClick={() => handleChange(ReplaceStyle.LEFT)}
          className="flex items-center mx-[0.75rem] justify-center text-[16px] py-1 font-regular"
        >
          <AiOutlineAlignLeft className="text-[16px]" />
        </span>
        <span
          onClick={() => handleChange(ReplaceStyle.CENTER)}
          className="flex items-center mx-[0.75rem] justify-center text-[16px] py-1 font-regular text-black"
        >
          <AiOutlineAlignCenter className="text-[16px]" />
        </span>
        <span
          onClick={() => handleChange(ReplaceStyle.RIGHT)}
          className="flex items-center mx-[0.75rem] justify-center text-[16px] py-1 font-regular text-black"
        >
          <AiOutlineAlignRight className="text-[16px]" />
        </span>
      </div>
    </div>
  );
};
export default CombinedComponent;
