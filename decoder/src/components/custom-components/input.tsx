import { FC } from "react";
import { setValue } from "hooks/set-value";
import IColor from "interfaces/color";
import { IInput } from "interfaces/value";
import "styles/components.css";

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
  const finalMarginLeft = 2 * margin.marginLeft;
  const finalMarginRight = 2 * margin.marginRight;
  const finalMarginTop = 2 * margin.marginTop;
  const finalMarginBotttom = 2 * margin.marginBottom;

  return (
    <section className="h-full flex justify-center overflow-hidden items-center">
      <input
        style={{
          borderRadius: `${borderRadius}px`,
          boxShadow: shadow,
          border: "1px solid",
          borderColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          margin: `${finalMarginTop}px ${finalMarginRight}px ${finalMarginBotttom}px ${finalMarginLeft}px`,
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
