import React, { FC, useState } from "react";
import "../../styles/Components.css";
import SettingComponent from "../utils/SettingComponent";

interface ButtonProps {
  bold: string;
  italic: string;
  underline: string;
  color: any;
  justifyContent: string;
  fontSize: any;
  deleteComponent: any;
  value: string;
  link: string;
}

const Button: FC<ButtonProps> = ({
  bold,
  italic,
  underline,
  color,
  justifyContent,
  fontSize,
  deleteComponent,
  value,
  link,
}: ButtonProps) => {
  return (
    <>
      {deleteComponent ? null : (
        <div className=" flex px-6 items-center justify-center w-auto h-full">
          <div
            style={{
              fontWeight: bold,
              fontStyle: italic,
              textDecoration: underline,
              color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
              borderColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
              display: "flex",
              justifyContent: justifyContent,
              fontSize: `${fontSize}px`,
            }}
            className="btn px-6 py-2 rounded w-48 cursor-pointer whitespace-nowrap"
          >
            {value}
          </div>
        </div>
      )}
    </>
  );
};

export default Button;
