import React, { FC } from "react";
import "../../styles/Components.css";
import "../../styles/Components.css";

interface InputProps {
  heading: string;
}
const Input: FC = () => {
  return (
    <>
      <input
        className="input shadow appearance-none ml-6 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="input"
        type="text"
        placeholder="Input"
      />
    </>
  );
};

export default Input;
