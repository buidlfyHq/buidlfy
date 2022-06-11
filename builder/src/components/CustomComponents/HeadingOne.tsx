import React, { FC } from "react";
import ITexts from "interfaces/texts";
import "styles/Components.css";

const HeadingOne: FC<ITexts> = ({
  bold,
  italic,
  underline,
  color,
  justifyContent,
  fontSize,
  value,
  link,
}) => {
  return (
    <div
      style={{
        fontWeight: bold,
        fontStyle: italic,
        textDecoration: underline,
        color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        display: "flex",
        justifyContent: justifyContent,
        fontSize: `${fontSize}px`,
      }}
      className="flex items-center justify-center"
    >
      {value}
    </div>
  );
};

export default HeadingOne;
