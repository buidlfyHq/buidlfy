import BgColorComponent from 'components/settings/bg-color-component';
import BorderColorComponent from 'components/settings/border-color-component';
import BorderComponent from 'components/settings/border-component';
import BorderRadiusComponent from 'components/settings/border-radius-component';
import ColorComponent from 'components/settings/color-component';
import CombinedComponent from 'components/settings/combined-setting';
import FontFamilyComponent from 'components/settings/font-family-component';
import FontSizeComponent from 'components/settings/font-size-component';
import FontWeightComponent from 'components/settings/font-weight-component';
import MarginComponent from 'components/settings/margin-component';
import PaddingComponent from 'components/settings/padding-component';
import ShadowComponent from 'components/settings/shadow-component';
import React, { FC } from 'react';
import { IoMdLink } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { IRootState } from 'redux/root-state.interface';
import { ISettings, IWorkspaceElement } from 'redux/workspace/workspace.interfaces';
import 'styles/components.css';

const BadgeSettings: FC<ISettings> = ({ handleSettingChange }) => {
  const selectedElement: IWorkspaceElement = useSelector((state: IRootState) => state.workspace.selectedElement);

  return (
    <>
      <h3 className="ml-[0.5rem] mt-[1.5rem]">{selectedElement ? <span className="setting-text ">{selectedElement.name}</span> : null}</h3>
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
      <div className="flex mt-4 items-center mb-2 mx-2 w-[13.5rem] text-black rounded-[6px]">
        <div className="link-div px-1 py-1">
          <IoMdLink className="text-[18px]" />
        </div>
        <input
          value={selectedElement.link}
          onChange={e => handleSettingChange(e, 'link')}
          className={`changeText pl-[2.5rem] py-[0.4rem] rounded-[6px]`}
          type="text"
          placeholder="Link"
        />
      </div>
      <FontFamilyComponent i={selectedElement.i} fontFamily={selectedElement.style.fontFamily} />
      <FontWeightComponent i={selectedElement.i} fontWeight={selectedElement.style.fontWeight} />
      <FontSizeComponent i={selectedElement.i} fontSize={selectedElement.style.fontSize} />
      <BorderRadiusComponent
        i={selectedElement.i}
        borderRadius={selectedElement.style.borderRadius}
        borderColor={selectedElement.style.borderColor}
      />
      <BorderComponent i={selectedElement.i} borderWidth={selectedElement.style.borderWidth} />
      <ColorComponent i={selectedElement.i} color={selectedElement.style.color} />
      <BorderColorComponent i={selectedElement.i} borderColor={selectedElement.style.borderColor} />
      <BgColorComponent i={selectedElement.i} elementBackgroundColor={selectedElement.style.backgroundColor} />
      <MarginComponent i={selectedElement.i} margin={selectedElement.style.margin} />
      <PaddingComponent i={selectedElement.i} padding={selectedElement.style.padding} />
      <ShadowComponent i={selectedElement.i} shadow={selectedElement.style.shadow} />
    </>
  );
};

export default BadgeSettings;
