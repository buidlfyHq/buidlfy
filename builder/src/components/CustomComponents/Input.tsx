import React, { FC } from "react";
import "styles/Components.css";

const Input: FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <input
        className="w-full px-3 py-2 ml-6 leading-tight text-gray-700 bg-white border border-solid rounded appearance-none input"
        id="input"
        type="text"
        placeholder="Input"
      />
    </div>
  );
};

export default Input;
