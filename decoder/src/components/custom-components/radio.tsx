import React, { FC } from "react";
import { gradientCheck } from "utils/gradient-check";
import ITexts from "interfaces/texts";
import "styles/components.css";

const RadioButton: FC<ITexts> = ({
  fontWeight,
  italic,
  underline,
  color,
  justifyContent,
  fontSize,
  value,
  backgroundColor,
  margin,
  padding,
  fontFamily,
}) => {
  const gradientCondition = color?.indexOf("gradient") !== -1;
  return (
    <section
      style={{
        textDecoration: underline,
        textDecorationColor: color,
        background: backgroundColor,
        justifyContent: `${justifyContent}` as CanvasTextAlign,
        margin: `${margin?.marginTop}px ${margin?.marginRight}px ${margin?.marginBottom}px ${margin?.marginLeft}px`,
        padding: `${padding?.paddingTop}px ${padding?.paddingRight}px ${padding?.paddingBottom}px ${padding?.paddingLeft}px`,
      }}
      className="flex items-center h-full"
    >
      <input type="radio" />
      <span
        style={{
          WebkitTextFillColor: gradientCheck(color, false),
          fontWeight: fontWeight,
          fontStyle: italic,
          background: gradientCheck(color, true),
          display: "flex",
          textDecoration: underline,
          textDecorationColor: `${gradientCondition ? "black" : color}`,
          fontSize: `${fontSize}px`,
          fontFamily: fontFamily,
        }}
        className={`text-class outline-none ml-[0.5rem] overflow-hidden cursor-pointer resize-none h-full items-center`}
      >
        {value}
      </span>
    </section>
  );
};

export default RadioButton;
