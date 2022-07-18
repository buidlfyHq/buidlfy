import React, { FC } from "react";
import ITexts from "interfaces/texts";
import "styles/Components.css";

const Text: FC<ITexts> = ({
  bold,
  italic,
  underline,
  color,
  justifyContent,
  fontSize,
  value,
  backgroundColor,
  link,
}) => {
  return (
    <div
      id="text-id"
      style={{
        fontWeight: bold,
        fontStyle: italic,
        textDecoration: underline,
        color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        display: "flex",
        justifyContent: justifyContent,
        fontSize: `${fontSize}px`,
        backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
      }}
      className="flex items-center justify-center w-full h-full"
    >
      {link.length > 0 ? (
        <a target="_blank" href={link} id="text-id">
          {value}
        </a>
      ) : (
        <div id="text-id">{value}</div>
      )}
    </div>
  );
};

export default Text;
