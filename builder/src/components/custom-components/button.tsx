import React, { FC } from "react";
import ITexts from "interfaces/texts";
import "styles/components.css";

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
  margin,
  padding,
  borderColor,
}) => (
  <section
    style={{ justifyContent: justifyContent }}
    id="button-one"
    className="flex overflow-hidden items-center justify-center w-auto h-full"
  >
    <div
      style={{
        fontWeight: bold,
        fontStyle: italic,
        textDecoration: underline,
        color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        borderColor: `rgba(${borderColor.r}, ${borderColor.g}, ${borderColor.b}, ${borderColor.a})`,
        display: "flex",
        justifyContent: "center",
        borderRadius: `${borderRadius}px`,
        fontSize: `${fontSize}px`,
        backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
        boxShadow: shadow,
        margin: `${margin.marginTop}px ${margin.marginRight}px ${margin.marginBottom}px ${margin.marginLeft}px`,
        padding: `${padding.paddingTop}px ${padding.paddingRight}px ${padding.paddingBottom}px ${padding.paddingLeft}px`,
      }}
      id="button-two"
      className="w-48 h-auto cursor-pointer btn whitespace-nowrap"
    >
      {link.length > 0 ? <a href={link}>{value}</a> : <>{value}</>}
    </div>
  </section>
);

export default Button;
