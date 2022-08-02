import React, { FC } from "react";
import ITexts from "interfaces/texts";
import "styles/components.css";

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
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
}) => {
  // console.log(paddingTop, "paddingTop");
  // console.log(paddingLeft, "paddingLeft");
  // console.log(paddingRight, "paddingRight");
  // console.log(paddingBottom, "paddingBottom");
  console.log(marginLeft, "marginLeft");
  // console.log(marginBottom, "marginBottom");
  // console.log(marginRight, "marginRight");
  // console.log(marginTop, "marginTop");

  return (
    <section
      id="text-one"
      className="flex overflow-hidden items-center justify-center w-auto h-full"
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
    >
      {link.length > 0 ? (
        <a
          rel="noreferrer"
          target="_blank"
          href={link}
          id="text-two"
          style={{
            color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          }}
        >
          {value}
        </a>
      ) : (
        <div
          style={{
            // paddingLeft: `${paddingLeft}px`,
            // paddingRight: `${paddingRight}px`,
            // paddingTop: `${paddingTop}px`,
            // paddingBottom: `${paddingBottom}px`,
            marginLeft: `${marginLeft}px`,
            marginRight: `${marginRight}px`,
            marginTop: `${marginTop}px`,
            marginBottom: `${marginBottom}px`,
          }}
        >
          {value}
        </div>
      )}
    </section>
  );
};

export default Text;
