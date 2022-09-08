import React, { FC } from "react";
import IColor from "interfaces/color";
import "styles/components.css";

interface IInput {
  borderRadius: number;
  shadow: string;
  color: string;
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
        border: `1px solid ${color}`,
        borderImage: color,
        margin: `${margin.marginTop}px ${margin.marginRight}px ${margin.marginBottom}px ${margin.marginLeft}px`,
      }}
      className="btn-border w-full leading-tight px-3 py-2 text-gray-700 bg-white appearance-none input"
      id="input"
      type="text"
      placeholder={placeholder}
    />
  </section>
);

export default Input;
