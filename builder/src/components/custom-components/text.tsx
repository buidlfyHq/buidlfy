import React, { FC } from "react";
import { IText } from "redux/workspace/workspace.interfaces";
import "styles/components.css";

const Text: FC<IText> = ({
  i,
  bold,
  italic,
  underline,
  color,
  justifyContent,
  fontSize,
  value,
  backgroundColor,
  margin,
  padding,
  link,
}) => {
  const textAreaContent = (
    <textarea
      readOnly
      id={i}
      value={value}
      style={{
        height: "-webkit-fill-available",
        WebkitTextFillColor:
          color.slice(0, 15) === "linear-gradient" ? "transparent" : color,
        fontWeight: bold,
        fontStyle: italic,
        background: color,
        display: "flex",
        justifyContent,
        alignItems: "center",
        textDecoration: underline,
        textDecorationColor: color,
        textAlign: `${justifyContent}` as CanvasTextAlign,
        fontSize: `${fontSize}px`,
        padding: `${padding?.paddingTop}px ${padding?.paddingRight}px ${padding?.paddingBottom}px ${padding?.paddingLeft}px`,
      }}
      className={`text-class w-full outline-none text-center overflow-hidden cursor-pointer h-full resize-none`}
    />
  );

  return (
    <section
      id="text-one"
      style={{
        height: "-webkit-fill-available",
        textDecoration: underline,
        textDecorationColor: color,
        background: backgroundColor,
        margin: `${margin?.marginTop}px ${margin?.marginRight}px ${margin?.marginBottom}px ${margin?.marginLeft}px`,
      }}
      className="flex overflow-hidden items-center justify-center w-auto h-full"
    >
      <>
        {link?.length > 0 ? (
          <a
            rel="noreferrer"
            target="_blank"
            href={link}
            id="text-two"
            className="text-class flex overflow-hidden items-center justify-center w-auto h-full"
            style={{
              background: color,
              WebkitTextFillColor: "transparent",
            }}
          >
            {textAreaContent}
          </a>
        ) : (
          textAreaContent
        )}
      </>
    </section>
  );
};

export default Text;
