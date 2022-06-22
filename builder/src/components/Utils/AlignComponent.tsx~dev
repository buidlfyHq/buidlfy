import React, { useState } from "react";
import "../../styles/Dashboard.css";
import {
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
  AiOutlineAlignCenter,
} from "react-icons/ai";
import "../../styles/Components.css";

export default function AlignComponent({
  setLeft,
  setRight,
  setCenter,
  justifyContent,
}) {
  const handleLeftChange = () => {
    // setLeft(!left);
    if (justifyContent === "left") {
      setLeft(false);
    } else {
      setLeft(true);
    }
  };
  const handleCenterChange = () => {
    // setLeft(!center);
    if (justifyContent === "center") {
      setCenter(false);
    } else {
      setCenter(true);
    }
  };
  const handleRightChange = () => {
    // setRight(!right);
    if (justifyContent === "right") {
      setRight(false);
    } else {
      setRight(true);
    }
  };

  return (
    <>
      <span className=" text-left px-3 mt-2 mb-0 text-xl text-gray-500 font-regular font-normal not-italic">
        Text Align
        <div className="flex mt-3">
          <span
            onClick={handleLeftChange}
            className="flex items-center justify-center font-bold shadow text-[18px] w-8 h-10 my-2 font-regular"
          >
            <AiOutlineAlignLeft className="text-[18px]" />
          </span>
          <span
            onClick={handleCenterChange}
            className="flex items-center justify-center italic shadow text-[18px] w-8 h-10 m-2 font-regular text-black"
          >
            <AiOutlineAlignCenter className="text-[18px]" />
          </span>
          <span
            onClick={handleRightChange}
            className="flex items-center justify-center underline shadow text-[18px] w-8 h-10 my-2 font-regular text-black"
          >
            <AiOutlineAlignRight className="text-[18px]" />
          </span>
        </div>
      </span>
    </>
  );
}
