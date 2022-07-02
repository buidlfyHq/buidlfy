import React, { FC } from "react";
import "styles/Components.css";
interface IInput {
  borderRadius: number;
  shadow: any;
}
const Input: FC<IInput> = ({ borderRadius, shadow }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <input
        style={{ borderRadius: `${borderRadius}px`, boxShadow: shadow }}
        className="w-full px-3 py-2 ml-6 mr-6 leading-tight text-gray-700 bg-white border border-solid appearance-none input"
        id="input"
        type="text"
        placeholder="Input"
      />
    </div>
  );
};

export default Input;
