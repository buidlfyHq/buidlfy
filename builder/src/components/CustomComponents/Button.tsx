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
  backgroundColor,
  link,
  borderRadius,
  shadow,
}) => {
  return (
    <>
      <div
        style={{ justifyContent: justifyContent }}
        id="Button"
        className="flex items-center justify-center w-auto h-full px-6"
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
            borderRadius: `${borderRadius}px`,
            fontSize: `${fontSize}px`,
            backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
            boxShadow: shadow,
          }}
          id="Button"
          className="w-48 h-auto px-6 py-2 cursor-pointer btn whitespace-nowrap"
        >
          <>{link.length > 0 ? <a href={link}>{value}</a> : <> {value}</>}</>{" "}
        </div>
      </div>
    </>
  );
};

export default Button;
