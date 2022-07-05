import React, { FC } from "react";
import ITexts from "interfaces/texts";
import "styles/Components.css";

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
  connectWallet,
}) => {
  // console.log(connectWallet, "connect");
  return (
    <>
      {/* {connectWallet == "on" ? (
        <div
          style={{ justifyContent: justifyContent }}
          className="flex px-6 items-center justify-center w-auto h-full"
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
            }}
            className="btn px-6 py-2 w-48 h-auto cursor-pointer whitespace-nowrap"
          >
            <>{link.length > 0 ? <a href={link}>{value}</a> : <> {value}</>}</>{" "}
          </div>
        </div>
      ) : ( */}
      <div
        style={{ justifyContent: justifyContent }}
        className="flex px-6 items-center justify-center w-auto h-full"
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
          }}
          className="btn px-6 py-2 w-48 h-auto cursor-pointer whitespace-nowrap"
        >
          <>{link.length > 0 ? <a href={link}>{value}</a> : <> {value}</>}</>{" "}
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Button;
