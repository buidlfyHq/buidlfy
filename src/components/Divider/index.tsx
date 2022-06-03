import React, { FC } from "react";
import "../../styles/Components.css";

interface DividerProps {
  deleteComponent: any;
}

const Divider: FC<DividerProps> = ({ deleteComponent }: DividerProps) => {
  return (
    <>
      {deleteComponent ? null : (
        <div className="relative flex py-3 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
      )}
    </>
  );
};

export default Divider;
