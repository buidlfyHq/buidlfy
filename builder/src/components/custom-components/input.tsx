import React, { FC } from "react";
import { IColor } from "redux/workspace/workspace.interfaces";
import "styles/components.css";

interface IInput {
  borderRadius: number;
  shadow: string;
  color: IColor;
  placeholder: string;
  margin?: {
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
  };
}

const Input: FC<IInput> = ({
  borderRadius,
  shadow,
  color,
  placeholder,
  margin,
}) => (
  <section
    className="flex items-center justify-center overflow-hidden h-full"
    id="input-section"
  >
    <input
      style={{
        borderRadius: `${borderRadius}px`,
        boxShadow: shadow,
        borderColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        border: "1px solid",
        margin: `${margin.marginTop}px ${margin.marginRight}px ${margin.marginBottom}px ${margin.marginLeft}px`,
      }}
      className="w-full leading-tight px-3 py-2 text-gray-700 bg-white appearance-none input"
      id="input"
      type="text"
      placeholder={placeholder}
    />
  </section>
);

export default Input;
