import React, { FC } from "react";
import { gradientCheck } from "utils/gradient-check";
import ITexts from "interfaces/texts";
import "styles/components.css";

const Badge: FC<ITexts> = ({
  fontWeight,
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
  borderWidth,
  fontFamily,
}) => (
  <section
    style={{ justifyContent: justifyContent }}
    id="button-one"
    className="flex overflow-hidden items-center justify-center w-auto h-full"
  >
    <span
      style={{
        fontWeight: fontWeight,
        fontStyle: italic,
        fontFamily: fontFamily,
        border: `${borderWidth}px solid ${borderColor}`,
        borderImage: borderColor,
        display: "flex",
        justifyContent: "center",
        borderRadius: `${borderRadius}px`,
        fontSize: `${fontSize}px`,
        background: backgroundColor,
        boxShadow: shadow,
        alignItems: "center",
        margin: `${margin?.marginTop}px ${margin?.marginRight}px ${margin?.marginBottom}px ${margin?.marginLeft}px`,
        padding: `${padding?.paddingTop}px ${padding?.paddingRight}px ${padding?.paddingBottom}px ${padding?.paddingLeft}px`,
      }}
      className="btn-border cursor-pointer btn whitespace-nowrap"
    >
      <span
        style={{
          background: gradientCheck(color, true),
          WebkitTextFillColor: gradientCheck(color, false),
          textDecoration: underline,
          textDecorationColor: color,
        }}
        className="text-class"
      >
        {link.length > 0 ? (
          <a
            href={link}
            style={{
              background: gradientCheck(color, true),
              WebkitTextFillColor: gradientCheck(color, false),
              textDecoration: underline,
              textDecorationColor: color,
            }}
            rel="noreferrer"
            target="_blank"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </span>
    </span>
  </section>
);

export default Badge;
