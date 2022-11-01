import { FC } from "react";
import { setValue } from "hooks/set-value";
import { IInput } from "interfaces/value";
import "styles/components.css";

interface IInputComponent {
  i: string;
  inputValue: IInput[];
  setInputValue: (inputValue: object[]) => void;
  borderRadius: number;
  shadow: string;
  color: string;
  backgroundColor: string;
  borderColor: string;
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
  placeholder: string;
}

const Input: FC<IInputComponent> = ({
  i,
  inputValue,
  setInputValue,
  borderRadius,
  shadow,
  color,
  margin,
  padding,
  placeholder,
  backgroundColor,
  borderColor,
}) => {
  const getValue = (inputArray: IInput[]) => {
    const requiredValue = inputArray.filter(
      (input: IInput) => input.id === i
    )[0];
    return requiredValue ? requiredValue.value : "";
  };
  return (
    <section className="h-full flex justify-center overflow-hidden items-center">
      <input
        style={{
          borderRadius: `${borderRadius}px`,
          borderWidth: "1pt",
          boxShadow: shadow,
          border: `1px solid ${borderColor}`,
          borderImage: borderColor,
          color: color,
          background: backgroundColor,
          margin: `${margin.marginTop}px ${margin.marginRight}px ${margin.marginBottom}px ${margin.marginLeft}px`,
          padding: `${padding?.paddingTop}px ${padding?.paddingRight}px ${padding?.paddingBottom}px ${padding?.paddingLeft}px`,
        }}
        className="btn-border focus-visible:outline-none w-full leading-tight px-3 py-2 text-gray-700 bg-white appearance-none input"
        id={i}
        type="text"
        placeholder={placeholder}
        value={getValue(inputValue)}
        onChange={(e) => setInputValue(setValue(inputValue, i, e.target.value))}
      />
    </section>
  );
};

export default Input;
