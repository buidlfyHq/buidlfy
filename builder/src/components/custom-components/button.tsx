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
        borderColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        display: "flex",
        justifyContent: "center",
        borderRadius: `${borderRadius}px`,
        fontSize: `${fontSize}px`,
        backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
        boxShadow: shadow,
        paddingLeft: `${paddingLeft}px`,
        paddingRight: `${paddingRight}px`,
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
        marginLeft: `${marginLeft}px`,
        marginRight: `${marginRight}px`,
        marginTop: `${marginTop}px`,
        marginBottom: `${marginBottom}px`,
      }}
      id="button-two"
      className="w-48 h-auto cursor-pointer btn whitespace-nowrap"
    >
      {link.length > 0 ? <a href={link}>{value}</a> : <>{value}</>}
    </div>
  </section>
);

export default Button;
