import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'redux/root-state.interface';
import { IWorkspaceElement } from 'redux/workspace/workspace.interfaces';
import BgColorComponent from 'components/settings/bg-color-component';
import ColorComponent from 'components/settings/color-component';
import CombinedComponent from 'components/settings/combined-setting';
import FontFamilyComponent from 'components/settings/font-family-component';
import FontSizeComponent from 'components/settings/font-size-component';
import FontWeightComponent from 'components/settings/font-weight-component';
import ListOptionsComponent from 'components/settings/list-options-component';
import ListTypeComponent from 'components/settings/list-type';
import MarginComponent from 'components/settings/margin-component';
import PaddingComponent from 'components/settings/padding-component';
import 'styles/components.css';

const ListSettings: FC = () => {
  const selectedElement: IWorkspaceElement = useSelector((state: IRootState) => state.workspace.selectedElement);

  return (
    <>
      <h3 className="ml-[0.5rem] mt-[1.5rem]">{selectedElement ? <span className="setting-text">{selectedElement.name}</span> : null}</h3>
      <CombinedComponent
        i={selectedElement.i}
        fontStyle={selectedElement.style.fontStyle}
        textDecoration={selectedElement.style.textDecoration}
        justifyContent={selectedElement.style.justifyContent}
        color={selectedElement.style.color}
      />
      <ListOptionsComponent i={selectedElement.i} />
      <ListTypeComponent i={selectedElement.i} listType={selectedElement.style.listType} />
      <FontFamilyComponent i={selectedElement.i} fontFamily={selectedElement.style.fontFamily} />
      <FontWeightComponent i={selectedElement.i} fontWeight={selectedElement.style.fontWeight} />
      <FontSizeComponent i={selectedElement.i} fontSize={selectedElement.style.fontSize} />
      <ColorComponent i={selectedElement.i} color={selectedElement.style.color} />
      <BgColorComponent i={selectedElement.i} elementBackgroundColor={selectedElement.style.backgroundColor} />
      <MarginComponent i={selectedElement.i} margin={selectedElement.style.margin} />
      <PaddingComponent i={selectedElement.i} padding={selectedElement.style.padding} />
    </>
  );
};

export default ListSettings;
