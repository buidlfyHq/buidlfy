import React, { FC, useState } from "react";
import "../../styles/Components.css";
import SettingComponent from "../utils/SettingComponent";

interface LinkProps {
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

const Link: FC<LinkProps> = ({
  bold,
  italic,
  underline,
  color,
  justifyContent,
  fontSize,
  deleteComponent,
  value,
  link,
}: LinkProps) => {
  return (
    <>
      {deleteComponent ? null : (
        <div
          style={{
            fontWeight: bold,
            fontStyle: italic,
            textDecoration: underline,
            color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
            display: "flex",
            justifyContent: justifyContent,
            fontSize: `${fontSize}px`,
          }}
          className="flex items-center justify-center h-full"
        >
          {value}
        </div>
      )}
    </>
  );
};

export default Link;
