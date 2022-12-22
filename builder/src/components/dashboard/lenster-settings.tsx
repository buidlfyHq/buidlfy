import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'redux/root-state.interface';
import { IWorkspaceElement } from 'redux/workspace/workspace.interfaces';
import AddLensterComponent from 'components/settings/add-lenster-component';
import 'styles/components.css';

const LensterSettings: FC = () => {
  const selectedElement: IWorkspaceElement = useSelector((state: IRootState) => state.workspace.selectedElement);
  return (
    <section id={selectedElement.i}>
      <h3 className="ml-[0.5rem] mt-[1.5rem]">{selectedElement ? <span className="setting-text">{selectedElement.name}</span> : null}</h3>
      <AddLensterComponent i={selectedElement.i} />
    </section>
  );
};

export default LensterSettings;
