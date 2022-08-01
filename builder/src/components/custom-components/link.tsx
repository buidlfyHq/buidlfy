import React, { FC } from "react";
import ITexts from "interfaces/texts";
import "styles/components.css";

const Link: FC<ITexts> = ({
  bold,
  italic,
  underline,
  color,
  justifyContent,
  fontSize,
  value,
  backgroundColor,
  link,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
}) => (
  <section
    id="Link"
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
    className="flex items-center justify-center h-full"
  >
    {value}
  </section>
);

export default Link;
