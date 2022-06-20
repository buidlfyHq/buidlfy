import { FC, ChangeEvent } from "react";
import "styles/Components.css";

interface IInput {
  name: string;
  value: string;
}

const Input: FC<{
  contractFunction;
  inputValue: object[];
  setInputValue: (inputValue: object[]) => void;
}> = ({ contractFunction, inputValue, setInputValue }) => {
  const getValue = (inputArray) => {
    const requiredValue = inputArray.filter(
      (input: IInput) => input.name === contractFunction.inputName
    )[0];
    return requiredValue ? requiredValue.value : "";
  };

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchExistingInput = inputValue.filter(
      (input: IInput) => input.name === contractFunction.inputName
    );

    if (!searchExistingInput.length || !inputValue.length) {
      return [
        ...inputValue,
        { name: contractFunction.inputName, value: e.target.value },
      ];
    }

    const updateInputValue = inputValue.map((input: IInput) => {
      if (input.name === contractFunction.inputName) {
        return { ...input, value: e.target.value };
      }
      return input;
    });
    return updateInputValue;
  };

  return (
    <div className="h-full flex justify-center items-center">
      <input
        className="input bg-white appearance-none ml-6 border border-solid rounded py-2 px-3 text-gray-700 leading-tight"
        id="input"
        type="text"
        placeholder="Input"
        value={getValue(inputValue)}
        onChange={(e) => setInputValue(onValueChange(e))}
      />
    </div>
  );
};

export default Input;
