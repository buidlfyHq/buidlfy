import React, { FC } from "react";
import {
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
  AiOutlineAlignCenter,
} from "react-icons/ai";
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
  const handleBoldChange = () => {
    if (bold === "bold") {
      setBold(false);
    } else {
      setBold(true);
    }
  };

  const handleItalicChange = () => {
    if (italic === "italic") {
      setItalic(false);
    } else {
      setItalic(true);
    }
  };

  const handleUnderlineChange = () => {
    if (underline === "underline") {
      setUnderline(false);
    } else {
      setUnderline(true);
    }
  };

  const handleLeftChange = () => {
    if (justifyContent === "left") {
      setLeft(false);
    } else {
      setLeft(true);
    }
  };

  const handleCenterChange = () => {
    if (justifyContent === "center") {
      setCenter(false);
    } else {
      setCenter(true);
    }
  };

  const handleRightChange = () => {
    if (justifyContent === "right") {
      setRight(false);
    } else {
      setRight(true);
    }
  };
  return (
    <div className="flex grey-div w-auto mx-2 mb-3 items-center mt-2 text-black">
      <span
        onClick={handleBoldChange}
        className="flex items-center mx-[0.75rem] justify-center font-bold text-[16px] py-1 font-regular"
      >
        B
      </span>
      <span
        onClick={handleItalicChange}
        className="flex items-center mx-[0.75rem] justify-center italic text-[16px] py-1 font-regular text-black"
      >
        i
      </span>
      <span
        onClick={handleUnderlineChange}
        className="flex items-center mx-[0.75rem] justify-center underline text-[16px] py-1 font-regular text-black"
      >
        U
      </span>
      <div className="flex">
        <span
          onClick={handleLeftChange}
          className="flex items-center mx-[0.75rem] justify-center text-[16px] py-1 font-regular"
        >
          <AiOutlineAlignLeft className="text-[16px]" />
        </span>
        <span
          onClick={handleCenterChange}
          className="flex items-center mx-[0.75rem] justify-center text-[16px] py-1 font-regular text-black"
        >
          <AiOutlineAlignCenter className="text-[16px]" />
        </span>
        <span
          onClick={handleRightChange}
          className="flex items-center mx-[0.75rem] justify-center text-[16px] py-1 font-regular text-black"
        >
          <AiOutlineAlignRight className="text-[16px]" />
        </span>
      </div>
    </div>
  );
};
export default CombinedComponent;
