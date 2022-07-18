import React, { FC } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlineDuplicate } from "react-icons/hi";
import "../../styles/Components.css";
import "../../styles/Dashboard.css";

interface IUtilitiesComponent {
  deleteComponent: number;
  setDeleteComponent: (deleteComponent: number) => void;
}

const UtilitiesComponent: FC<IUtilitiesComponent> = ({
  setDeleteComponent,
}) => {
  const handleDelete = () => {
    setDeleteComponent(1);
  };

  return (
    <div className="items-center w-full px-3 py-2 text-gray-600 rounded">
      <div className="px-1 text-left my-1 text-xl text-gray-500 font-regular font-normal not-italic">
        Utilities
      </div>
      <div className="flex">
        <span
          onClick={handleDelete}
          className="flex items-center justify-center underline shadow text-[18px] w-8 h-10 my-2 font-regular text-black"
        >
          <AiOutlineDelete className="text-[18px]" />
        </span>
        <span className="flex items-center justify-center underline shadow text-[18px] w-8 h-10 ml-3 my-2 font-regular text-black">
          <HiOutlineDuplicate className="text-[18px]" />
        </span>
      </div>
    </div>
  );
};
export default UtilitiesComponent;
