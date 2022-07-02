import { FC } from "react";
import "styles/Components.css";
import { setValue } from "../Utils/SetValue";

interface IInput {
  name: string;
  value: any;
}

const Input: FC<{
  contractFunction;
  inputValue: object[];
  borderRadius: number;
  shadow: any;
  setInputValue: (inputValue: object[]) => void;
}> = ({
  contractFunction,
  inputValue,
  setInputValue,
  borderRadius,
  shadow,
}) => {
  const getValue = (inputArray) => {
    const requiredValue = inputArray.filter(
      (input: IInput) => input.name === contractFunction.inputName
    )[0];
    return requiredValue ? requiredValue.value : "";
  };

  return (
    <div className="h-full flex justify-center items-center">
      <input
        className="input bg-white appearance-none ml-6 border border-solid py-2 px-3 text-gray-700 leading-tight"
        id="input"
        style={{ borderRadius: `${borderRadius}px`, boxShadow: shadow }}
        type="text"
        placeholder="Input"
        value={getValue(inputValue)}
        onChange={(e) =>
          setInputValue(
            setValue(inputValue, contractFunction.inputName, e.target.value)
          )
        }
      />
    </div>
  );
};

export default Input;
