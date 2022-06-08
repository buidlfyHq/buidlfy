import React, { FC } from "react";
import "styles/Components.css";

const Input: FC = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <input
        className="input bg-white appearance-none ml-6 border border-solid rounded py-2 px-3 text-gray-700 leading-tight"
        id="input"
        type="text"
        placeholder="Input"
      />
    </div>
  );
};

export default Input;
