import React, { FC } from "react";
import ITexts from "interfaces/texts";
import "styles/Components.css";

const Button: FC<ITexts> = ({
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
      style={{ justifyContent: justifyContent }}
      className="flex px-6 items-center justify-center w-auto h-full"
    >
      <div
        style={{
          fontWeight: bold,
          fontStyle: italic,
          textDecoration: underline,
          color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          borderColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          display: "flex",
          justifyContent: "center",
          fontSize: `${fontSize}px`,
        }}
        className="btn px-6 py-2 rounded w-48 cursor-pointer whitespace-nowrap"
      >
        {value}
      </div>
    </div>
  );
};

export default Button;
