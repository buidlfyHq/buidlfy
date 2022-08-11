import { FC } from "react";
import { setValue } from "hooks/set-value";
import IColor from "interfaces/color";
import { IInput } from "interfaces/value";
import "styles/components.css";
import { MARGIN_VARIABLE } from "config/constants";

interface IInputComponent {
  id: string;
  inputValue: IInput[];
  setInputValue: (inputValue: object[]) => void;
  borderRadius: number;
  shadow: string;
  color: IColor;
  margin?: {
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
  };
}

const Input: FC<IInputComponent> = ({
  id,
  inputValue,
  setInputValue,
  borderRadius,
  shadow,
  color,
  margin,
}) => {
  const getValue = (inputArray: IInput[]) => {
    const requiredValue = inputArray.filter(
      (input: IInput) => input.id === id
    )[0];
    return requiredValue ? requiredValue.value : "";
  };

  return (
    <section className="h-full flex justify-center overflow-hidden items-center">
      <input
        style={{
          borderRadius: `${borderRadius}px`,
          boxShadow: shadow,
          border: "1px solid",
          borderColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          margin: `${margin.marginTop * MARGIN_VARIABLE}px ${
            margin.marginRight * MARGIN_VARIABLE
          }px ${margin.marginBottom * MARGIN_VARIABLE}px ${
            margin.marginLeft * MARGIN_VARIABLE
          }px`,
        }}
        className="w-full leading-tight text-gray-700 bg-white appearance-none input"
        id="input"
        type="text"
        placeholder="Input"
        value={getValue(inputValue)}
        onChange={(e) =>
          setInputValue(setValue(inputValue, id, e.target.value))
        }
      />
    </section>
  );
};

export default Input;
