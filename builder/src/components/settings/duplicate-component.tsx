import { FC } from 'react';
import { BiCopy } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'redux/root-state.interface';
import { IWorkspaceElement } from 'redux/workspace/workspace.interfaces';
import { updateWorkspaceElementsArray } from 'redux/workspace/workspace.reducers';
import ShortUniqueId from 'short-unique-id';
import 'styles/components.css';
import 'styles/dashboard.css';

const DuplicateComponent: FC = () => {
  const selectedElement: IWorkspaceElement = useSelector((state: IRootState) => state.workspace.selectedElement);
  const workspaceElements = useSelector((state: IRootState) => state.workspace.workspaceElements);
  const dispatch = useDispatch();
  const uid = new ShortUniqueId();

  const handleDuplicate = () => {
    const newId = uid;
    const newSelectedElement = { ...selectedElement, i: newId() };
    const newWorkspaceElements = [...workspaceElements];
    newWorkspaceElements.push(newSelectedElement);
    dispatch(updateWorkspaceElementsArray(newWorkspaceElements));
  };

  return (
    <div className="margin-text text-left px-3 py-4 mb-0 ">
      <span className="flex px-1">
        <span> Utilities </span>
      </span>
      <span
        onClick={handleDuplicate}
        className={`shadow-div flex items-center justify-center cursor-pointer shadow py-2 px-3 font-regular w-[2.2rem] mt-[0.7rem] ml-[0.2rem]`}
      >
        <BiCopy />
      </span>
    </div>
  );
};
export default DuplicateComponent;
