import React, { FC } from "react";
import "styles/Components.css";

const Divider: FC = () => {
  return (
    <div id="Divider" className="relative flex items-center p-3">
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
};

export default Divider;
