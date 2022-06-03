import React, { FC } from "react";
import "../../styles/Components.css";
import { Popover } from "@headlessui/react";

interface ContainerProps {
  deleteComponent: any;
}

const Container: FC<ContainerProps> = ({ deleteComponent }: ContainerProps) => {
  return (
    <>
      {deleteComponent ? null : (
        <Popover className="relative bg-white">
          <div className="max-w-9xl mx-auto px-1">
            <div className="flex justify-center px-4 items-center border-2 border-gray-100 py-6 md:justify-start md:space-x-10"></div>
          </div>
        </Popover>
      )}
    </>
  );
};

export default Container;
