import React, { FC } from "react";
import ITexts from "interfaces/texts";
import "styles/components.css";

const Text: FC<ITexts> = ({
  item,
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
  const textAreaContent = () => {
    return (
      <textarea
        readOnly
        id={item.i}
        value={value}
        style={{
          fontWeight: bold,
          fontStyle: italic,
          textDecoration: underline,
          background: color,
          WebkitTextFillColor: "transparent",
          display: "flex",
          justifyContent,
          alignItems: "center",
          textAlign: `${justifyContent}` as CanvasTextAlign,
          fontSize: `${fontSize}px`,
          padding: `${padding?.paddingTop}px ${padding?.paddingRight}px ${padding?.paddingBottom}px ${padding?.paddingLeft}px`,
        }}
        className={`text-class w-full outline-none text-center overflow-hidden cursor-pointer h-full resize-none`}
      />
    );
  };
  return (
    <section
      id="text-one"
      style={{
        height: "-webkit-fill-available",
        background: backgroundColor,
        margin: `${margin?.marginTop}px ${margin?.marginRight}px ${margin?.marginBottom}px ${margin?.marginLeft}px`,
      }}
      className="flex overflow-hidden items-center justify-center w-auto h-full"
    >
      <>
        {link.length > 0 ? (
          <a
            rel="noreferrer"
            target="_blank"
            href={link}
            id="text-two"
            className="text-class"
            style={{
              background: color,
              WebkitTextFillColor: "transparent",
            }}
          >
            {textAreaContent()}
          </a>
        ) : (
          textAreaContent()
        )}
      </>
    </section>
  );
};

export default Text;
