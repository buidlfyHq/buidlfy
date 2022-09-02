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
  return (
    <section className="w-auto h-full overflow-hidden ">
      <div
        id="text-one"
        className="flex items-center justify-center w-auto h-full overflow-hidden "
        style={{
          fontWeight: bold,
          fontStyle: italic,
          textDecoration: underline,
          color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          display: "flex",
          justifyContent: justifyContent,
          fontSize: `${fontSize}px`,
          backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
          margin: `${margin?.marginTop}px ${margin?.marginRight}px ${margin?.marginBottom}px ${margin?.marginLeft}px`,
          padding: `${padding?.paddingTop}px ${padding?.paddingRight}px ${padding?.paddingBottom}px ${padding?.paddingLeft}px`,
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
            <textarea
              readOnly
              id={item.i}
              value={value}
              style={{
                fontWeight: bold,
                fontStyle: italic,
                textDecoration: underline,
                color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                display: "flex",
                justifyContent,
                alignItems: "center",
                textAlign: `${justifyContent}` as CanvasTextAlign,
                fontSize: `${fontSize}px`,
                backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
              }}
              className={`w-full outline-none text-center overflow-hidden cursor-pointer h-full resize-none`}
            />
          </a>
        ) : (
          <textarea
            readOnly
            id={item.i}
            value={value}
            style={{
              fontWeight: bold,
              fontStyle: italic,
              textDecoration: underline,
              color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
              display: "flex",
              justifyContent,
              alignItems: "center",
              textAlign: `${justifyContent}` as CanvasTextAlign,
              fontSize: `${fontSize}px`,
              backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
            }}
            className={`w-full outline-none text-center overflow-hidden cursor-pointer h-full resize-none`}
          />
        )}
      </div>
    </section>
  );
};

export default Text;
