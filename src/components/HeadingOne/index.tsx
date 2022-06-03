import React, { FC, useState } from "react";
import "../../styles/Components.css";

interface HeadingOneProps {
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

const HeadingOne: FC<HeadingOneProps> = ({
  bold,
  italic,
  underline,
  color,
  justifyContent,
  fontSize,
  deleteComponent,
  value,
  link,
}: HeadingOneProps) => {
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
          className="flex items-center justify-center"
        >
          {value}
        </div>
      )}
    </>
  );
};

export default HeadingOne;
