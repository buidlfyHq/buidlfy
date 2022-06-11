import React from "react";
import "../../styles/Dashboard.css";

export default function FontStyleComponent({
  setBold,
  bold,
  italic,
  setItalic,
  underline,
  setUnderline,
}) {
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

  return (
    <div className="flex items-center px-3 mt-2 text-black">
      <span
        onClick={handleBoldChange}
        className="flex items-center justify-center font-bold shadow text-[18px] w-8 h-10 my-2 font-regular"
      >
        B
      </span>
      <span
        onClick={handleItalicChange}
        className="flex items-center justify-center italic shadow text-[18px] w-8 h-10 m-2 font-regular text-black"
      >
        I
      </span>
      <span
        onClick={handleUnderlineChange}
        className="flex items-center justify-center underline shadow text-[18px] w-8 h-10 my-2 font-regular text-black"
      >
        U
      </span>
    </div>
  );
}
