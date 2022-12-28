import React, { useRef, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import SettingComponent from 'components/utils/render-setting';
import { updateWorkspaceElementsArray, updateWorkspaceElementStyle } from 'redux/workspace/workspace.reducers';
import { IRootState } from 'redux/root-state.interface';
import { ISettings, IWorkspaceElement } from 'redux/workspace/workspace.interfaces';
import 'styles/components.css';
import { BiCopy } from 'react-icons/bi';
import ShortUniqueId from 'short-unique-id';

const Settings: FC<ISettings> = ({ openTab, setOpenTab, setOpenSetting }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const selectedElement: IWorkspaceElement = useSelector((state: IRootState) => state.workspace.selectedElement);
  const workspaceElements = useSelector((state: IRootState) => state.workspace.workspaceElements);
  const uid = new ShortUniqueId();

  const handleDelete = () => {
    dispatch(
      updateWorkspaceElementStyle({
        settingItemId: selectedElement.i,
        propertyName: 'deleteComponent',
        propertyValue: true,
      }),
    );
    setOpenSetting(false);
  };

  const handleDuplicate = () => {
    // const newId = uid;
    const newWorkspaceElements = [...workspaceElements];
    if (selectedElement.name === 'Container') {
      const newSelectedContainer = { ...selectedElement, i: uid(), children: { ...selectedElement.children[0], i: uid() } };
      console.log(newSelectedContainer, 'newSelectedContainer');
      console.log(selectedElement, 'selectedElement');
      console.log(newWorkspaceElements, 'newWorkspaceElements-before');
      newWorkspaceElements.push(newSelectedContainer);
      console.log(newWorkspaceElements, 'newWorkspaceElements-after');
    } else {
      const newSelectedElement = { ...selectedElement, i: uid() };
      newWorkspaceElements.push(newSelectedElement);
    }
    // const newSelectedElement = { ...selectedElement, i: newId() };
    dispatch(updateWorkspaceElementsArray(newWorkspaceElements));
  };

  return (
    <>
      {selectedElement?.i ? (
        <>
          <div className="border overflow-x-hidden setting-nav mt-[40px] menu" ref={ref}>
            <div className="delete-div flex py-2 pl-3">
              <div onClick={handleDelete} className="flex delete-btn px-2 py-[0.1rem] cursor-pointer hover:bg-[#b7c1ec]">
                <span className="flex text-[12px]">
                  Remove
                  <MdOutlineDeleteOutline className="text-[12px]  mt-1 ml-1" />
                </span>
              </div>
              <div onClick={handleDuplicate} className="flex delete-btn px-2 py-[0.1rem] cursor-pointer hover:bg-[#b7c1ec] ml-3">
                <span className="flex text-[12px]">
                  Duplicate
                  <BiCopy className="text-[12px]  mt-1 ml-1" />
                </span>
              </div>
              {/* It will be used in next update */}
              {/* <div className="flex delete-btn px-2 py-[0.1rem] ml-2">
                  <span className="flex text-[12px]">
                    Reset
                    <GrPowerReset className="text-[12px] mt-1 ml-1" />
                  </span>
                </div> */}
            </div>

            <div>
              <SettingComponent openTab={openTab} setOpenTab={setOpenTab} />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Settings;
