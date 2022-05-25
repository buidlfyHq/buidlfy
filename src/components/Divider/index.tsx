import React, { FC } from "react";
import "../../styles/Components.css";

const Divider: FC = () => {
  return (
    <>
      <div className="relative flex py-3 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>
    </>
  );
};

export default Divider;
