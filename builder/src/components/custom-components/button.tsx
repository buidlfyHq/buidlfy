import React, { FC } from "react";
import { IText } from "redux/workspace/workspace.interfaces";
import "styles/components.css";

const Button: FC<IText> = ({
  i,
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
    <button
      style={{
        fontWeight: bold,
        fontStyle: italic,
        border: `1px solid ${borderColor}`,
        backgroundOrigin: "border-box",
        backgroundClip: "border-box",
        MozBackgroundClip: "border-box",
        WebkitBackgroundClip: "border-box",
        borderImage: borderColor,
        display: "flex",
        justifyContent: "center",
        borderRadius: `${borderRadius}px`,
        fontSize: `${fontSize}px`,
        background:
          backgroundColor.slice(0, 15) === "linear-gradient"
            ? "transparent"
            : backgroundColor,
        boxShadow: shadow,
        alignItems: "center",
        margin: `${margin?.marginTop}px ${margin?.marginRight}px ${margin?.marginBottom}px ${margin?.marginLeft}px`,
        padding: `${padding?.paddingTop}px ${padding?.paddingRight}px ${padding?.paddingBottom}px ${padding?.paddingLeft}px`,
      }}
      id={i}
      className="btn-border border-[1px] border-solid w-[170px] h-[40px] cursor-pointer btn whitespace-nowrap"
    >
      <span
        style={{
          background:
            color.slice(0, 15) === "linear-gradient" ? backgroundColor : color,
          WebkitTextFillColor:
            color.slice(0, 15) === "linear-gradient" ? "transparent" : color,
          textDecoration: underline,
          textDecorationColor: color,
        }}
        className="text-class"
      >
        {link.length > 0 ? <a href={link}>{value}</a> : value}
      </span>
    </button>
  </section>
);

export default Button;
