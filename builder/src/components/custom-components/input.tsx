import React, { FC } from "react";
import IColor from "interfaces/color";
import "styles/components.css";

interface IInput {
  borderRadius: number;
  shadow: string;
  color: IColor;
  placeholder: string;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
}

const Input: FC<IInput> = ({
  borderRadius,
  shadow,
  color,
  placeholder,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
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
        margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`,
      }}
      className="w-full leading-tight text-gray-700 bg-white appearance-none input"
      id="input"
      type="text"
      placeholder={placeholder}
    />
  </section>
);

export default Input;
