import React, { FC, useState } from "react";
import "../../styles/Components.css";

interface TextProps {
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

const Text: FC<TextProps> = ({
  bold,
  italic,
  underline,
  color,
  justifyContent,
  fontSize,
  deleteComponent,
  value,
  link,
}: TextProps) => {
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

export default Text;
