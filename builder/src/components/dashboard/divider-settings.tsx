import BorderColorComponent from 'components/settings/border-color-component';
import BorderComponent from 'components/settings/border-component';
import BorderRadiusComponent from 'components/settings/border-radius-component';
import MarginComponent from 'components/settings/margin-component';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'redux/root-state.interface';
import { IWorkspaceElement } from 'redux/workspace/workspace.interfaces';
import 'styles/components.css';

const DividerSettings: FC = () => {
  const selectedElement: IWorkspaceElement = useSelector((state: IRootState) => state.workspace.selectedElement);
  return (
    <>
      <h3 className="ml-[0.5rem] mt-[1.5rem]">{selectedElement ? <span className="setting-text">{selectedElement.name}</span> : null}</h3>
      <MarginComponent i={selectedElement.i} margin={selectedElement.style.margin} />
      <BorderColorComponent i={selectedElement.i} borderColor={selectedElement.style.borderColor} name={selectedElement.name} />
      <BorderComponent i={selectedElement.i} borderWidth={selectedElement.style.borderWidth} />
      <BorderRadiusComponent
        i={selectedElement.i}
        borderRadius={selectedElement.style.borderRadius}
        borderColor={selectedElement.style.borderColor}
      />
    </>
  );
};

export default DividerSettings;
