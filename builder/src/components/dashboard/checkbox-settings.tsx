import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'redux/root-state.interface';
import { ISettings, IWorkspaceElement } from 'redux/workspace/workspace.interfaces';
import BgColorComponent from 'components/settings/bg-color-component';
import ColorComponent from 'components/settings/color-component';
import CombinedComponent from 'components/settings/combined-setting';
import FontFamilyComponent from 'components/settings/font-family-component';
import FontSizeComponent from 'components/settings/font-size-component';
import FontWeightComponent from 'components/settings/font-weight-component';
import MarginComponent from 'components/settings/margin-component';
import PaddingComponent from 'components/settings/padding-component';
import 'styles/components.css';

const CheckboxSettings: FC<ISettings> = ({ handleSettingChange }) => {
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
      <div className="flex items-center mx-2 mt-1 w-[13.5rem] text-black">
        <textarea
          value={selectedElement.value}
          onChange={e => handleSettingChange(e, 'value')}
          className="changeText input-text h-[6rem] pl-[0.5rem] pt-[0.5rem]"
          placeholder="Please write your text here..."
        />
      </div>
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

export default CheckboxSettings;
