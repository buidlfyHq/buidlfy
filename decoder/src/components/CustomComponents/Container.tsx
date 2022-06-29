import React, { FC } from "react";
// import ITexts from "interfaces/texts";
import "styles/Components.css";
import IBgContainer from "interfaces/container";

const Container: FC<IBgContainer> = ({
  backgroundColor,
  // borderRadius,
  // boxShadow,
  // zIndex,
  // border,
  // backgroundImg,
}) => {
  return (
    <div
      style={{
        backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
        border: "1px solid black",
        // borderRadius: borderRadius,
        // border: border,
        // zIndex,
        // backgroundImage: backgroundImg,
        // boxShadow,
      }}
      className="flex items-center justify-center h-full border"
    ></div>
  );
};

export default Container;
