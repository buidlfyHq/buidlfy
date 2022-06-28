import React, { FC } from "react";
import IBgContainer from "interfaces/texts";
import "styles/Components.css";

const Container: FC = ({
  // backgroundColor,
  // borderRadius,
  // boxShadow,
  // zIndex,
  // border,
  // backgroundImg,
}) => {
  return (
    <div
      style={{
        // backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
        // borderRadius: borderRadius,
        // border: border,
        // zIndex,
        // backgroundImage: backgroundImg,
        // boxShadow,
      }}
      className="flex items-center justify-center h-full border"
    >
    </div>
  );
};

export default Container;