import React, { FC } from "react";
import "styles/Components.css";

const Input: FC<{
  contractFunction;
  inputValue: object;
  setInputValue: (inputValue: object) => void;
}> = ({ contractFunction, inputValue, setInputValue }) => {
  return (
    <div className="h-full flex justify-center items-center">
      <input
        className="input bg-white appearance-none ml-6 border border-solid rounded py-2 px-3 text-gray-700 leading-tight"
        id="input"
        type="text"
        placeholder="Input"
        value={
          Object.entries(inputValue).filter(
            (m) => m[0] === contractFunction.inputName
          )[1]
        }
        onChange={(e) => {
          setInputValue({
            ...inputValue,
            [contractFunction.inputName]: e.target.value,
          });
        }}
      />
    </div>
  );
};

export default Input;
