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
}

const Input: FC<IInputComponent> = ({
  id,
  inputValue,
  setInputValue,
  borderRadius,
  shadow,
  color,
}) => {
  const getValue = (inputArray: IInput[]) => {
    const requiredValue = inputArray.filter(
      (input: IInput) => input.id === id
    )[0];
    return requiredValue ? requiredValue.value : "";
  };

  return (
    <section className="h-full flex justify-center items-center">
      <input
        style={{
          borderRadius: `${borderRadius}px`,
          boxShadow: shadow,
          border: "1px solid",
          borderColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        }}
        className="w-full px-3 py-2 ml-6 mr-6 leading-tight text-gray-700 bg-white appearance-none input"
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
