import React, { useRef, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import SettingComponent from 'components/utils/render-setting';
import { updateWorkspaceElementStyle } from 'redux/workspace/workspace.reducers';
import { IRootState } from 'redux/root-state.interface';
import { ISettings, IWorkspaceElement } from 'redux/workspace/workspace.interfaces';
import 'styles/components.css';

const Settings: FC<ISettings> = ({ openTab, setOpenTab, setOpenSetting }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const selectedElement: IWorkspaceElement = useSelector((state: IRootState) => state.workspace.selectedElement);

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
