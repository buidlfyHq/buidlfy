import React, { FC } from "react";
import "../../styles/Components.css";

interface ButtonProps {
  heading: string;
}
const Button: FC = () => {
  return (
    <>
      <div className=" flex px-6 py-2 items-center justify-start w-auto">
        <div className="btn px-6 py-2 cursor-pointer whitespace-nowrap">
          Add Button
        </div>
      </div>
    </>
  );
};

export default Button;
