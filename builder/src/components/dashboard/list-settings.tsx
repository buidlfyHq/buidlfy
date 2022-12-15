import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'redux/root-state.interface';
import { ISettings, IWorkspaceElement } from 'redux/workspace/workspace.interfaces';
import 'styles/components.css';

const ListSettings: FC<ISettings> = ({ handleSettingChange }) => {
  const selectedElement: IWorkspaceElement = useSelector((state: IRootState) => state.workspace.selectedElement);

  return (
    <>
      <h3 className="ml-[0.5rem] mt-[1.5rem]">{selectedElement ? <span className="setting-text">{selectedElement.name}</span> : null}</h3>

      <div className="flex items-center mx-2 mt-1 w-[13.5rem] text-black">
        <textarea
          value={selectedElement.placeholder}
          onChange={e => handleSettingChange(e, 'placeholder')}
          className="changeText input-text h-[6rem] pl-[0.5rem] pt-[0.5rem]"
          placeholder="Please write your text here..."
        />
      </div>
    </>
  );
};

export default ListSettings;
