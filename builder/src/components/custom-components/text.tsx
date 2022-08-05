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
  margin,
  padding,
}) => {
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
        margin: `${margin.marginTop}px ${margin.marginRight}px ${margin.marginBottom}px ${margin.marginLeft}px`,
        padding: `${padding.paddingTop}px ${padding.paddingRight}px ${padding.paddingBottom}px ${padding.paddingLeft}px`,
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
          <span>{value}</span>
        </a>
      ) : (
        <span>{value}</span>
      )}
    </section>
  );
};

export default Text;
