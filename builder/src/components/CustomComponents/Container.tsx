import React, { FC } from "react";
import ITexts from "interfaces/texts";
import "styles/Components.css";
import IBgContainer from "interfaces/container";

const Container: FC<IBgContainer> = ({
  backgroundColor,
  color,
  imgData,
  borderRadius,
  borderWidth,
  // boxShadow,
  // zIndex,
  // border,
  // backgroundImg,
}) => {
  console.log(imgData, "img");
  return (
    <div
      style={{
        backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
        borderColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        border: "solid",
        borderRadius: `${borderRadius}px`,
        borderWidth: `${borderWidth}px`,
        // border: border,
        // zIndex,
        backgroundImage: `url(${imgData})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        // boxShadow,
      }}
      className="flex items-center justify-center h-full"
    ></div>
  );
};

export default Container;
