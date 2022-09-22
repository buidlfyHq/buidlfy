import React, { FC } from "react";
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
  padding?: {
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
  };
}

const Input: FC<IInput> = ({
  borderRadius,
  shadow,
  color,
  placeholder,
  margin,
  padding,
}) => (
  <section
    className="flex items-center justify-center h-full overflow-hidden"
    id="input-section"
  >
    <input
      style={{
        borderRadius: `${borderRadius}px`,
        borderWidth: "1pt",
        boxShadow: shadow,
        border: `1px solid ${color}`,
        borderImage: color,
        margin: `${margin?.marginTop}px ${margin?.marginRight}px ${margin?.marginBottom}px ${margin?.marginLeft}px`,
        padding: `${padding.paddingTop}px ${padding.paddingRight}px ${padding.paddingBottom}px ${padding.paddingLeft}px`,
      }}
      className="btn-border w-full leading-tight bg-white appearance-none input"
      id="input"
      type="text"
      placeholder={placeholder}
    />
  </section>
);

export default Input;
