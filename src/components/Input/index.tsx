import React, { FC } from "react";
import "../../styles/Components.css";

interface InputProps {
  deleteComponent: any;
}
const Input: FC<InputProps> = ({ deleteComponent }: InputProps) => {
  return (
    <>
      {deleteComponent ? null : (
        <div className="h-full flex justify-center items-center">
          <input
            className="input bg-white appearance-none ml-6 border border-solid rounded py-2 px-3 text-gray-700 leading-tight"
            id="input"
            type="text"
            placeholder="Input"
          />
        </div>
      )}
    </>
  );
};

export default Input;
