import React, { FC } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { updateWorkspaceElementStyle } from "redux/workspace/workspace.reducers";
import IWorkspace from "interfaces/workspace";
import "styles/components.css";
import "styles/dashboard.css";

interface IUtilitiesComponent {
  selectedItem: IWorkspace;
}

const UtilitiesComponent: FC<IUtilitiesComponent> = ({ selectedItem }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(
      updateWorkspaceElementStyle({
        settingItemId: selectedItem.i,
        propertyName: "deleteComponent",
        propertyValue: 1,
      })
    );
  };

  return (
    <div className="items-center w-full px-3 py-2 mt-4 text-gray-600 rounded">
      <div className="margin-text px-1 text-left my-1 text-xl text-gray-500 font-regular font-normal not-italic">
        Utilities
      </div>
      <div className="flex">
        <span
          onClick={handleDelete}
          className="shadow-div flex items-center justify-center shadow text-[18px] py-2 px-2 mt-2 font-regular"
        >
          <AiOutlineDelete className="text-[16px]" />
        </span>
        {/* It will be used for the latest code when we will add duplicate function  */}
        {/* <span className="flex items-center justify-center underline shadow text-[18px] w-8 h-10 ml-3 my-2 font-regular text-black">
          <HiOutlineDuplicate className="text-[18px]" />
        </span> */}
      </div>
    </div>
  );
};
export default UtilitiesComponent;
