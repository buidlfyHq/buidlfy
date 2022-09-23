import React, { FC } from "react";
import { IText } from "redux/workspace/workspace.interfaces";
import "styles/components.css";

const Button: FC<IText> = ({
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
        border: `1px solid ${borderColor}`,
        borderImage: borderColor,
        display: "flex",
        justifyContent: "center",
        borderRadius: `${borderRadius}px`,
        fontSize: `${fontSize}px`,
        background: backgroundColor,
        boxShadow: shadow,
        margin: `${margin?.marginTop}px ${margin?.marginRight}px ${margin?.marginBottom}px ${margin?.marginLeft}px`,
        padding: `${padding?.paddingTop}px ${padding?.paddingRight}px ${padding?.paddingBottom}px ${padding?.paddingLeft}px`,
      }}
      id="button-two"
      className="btn-border border-[1px] border-solid w-[170px] h-[40px] cursor-pointer btn whitespace-nowrap"
    >
      <span
        style={{
          background: color,
          WebkitTextFillColor:
            color.slice(0, 15) === "linear-gradient" ? "transparent" : color,
          textDecoration: underline,
          textDecorationColor: color,
        }}
        className="text-class"
      >
        {link.length > 0 ? <a href={link}>{value}</a> : <>{value}</>}
      </span>
    </div>
  </section>
);

export default Button;
