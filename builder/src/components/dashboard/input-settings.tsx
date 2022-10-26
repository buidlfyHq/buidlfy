import React, { FC } from "react";
import { useSelector } from "react-redux";
import ColorComponent from "components/settings/color-component";
import BorderRadiusComponent from "components/settings/border-radius-component";
import ShadowComponent from "components/settings/shadow-component";
import MarginComponent from "components/settings/margin-component";
import PaddingComponent from "components/settings/padding-component";
import { IRootState } from "redux/root-state.interface";
import {
  ISettings,
  IWorkspaceElement,
} from "redux/workspace/workspace.interfaces";
import BorderColorComponent from "components/settings/border-color-component";
import BgColorComponent from "components/settings/bg-color-component";
import "styles/components.css";

const InputSettings: FC<ISettings> = ({ handleSettingChange }) => {
  const selectedElement: IWorkspaceElement = useSelector(
    (state: IRootState) => state.workspace.selectedElement
  );

  return (
    <>
      <h3 className="ml-[0.5rem] mt-[1.5rem]">
        {selectedElement ? (
          <span className="setting-text">{selectedElement.name}</span>
        ) : null}
      </h3>

      <div className="flex items-center mx-2 mt-1 w-[13.5rem] text-black">
        {/* <RiText className="text-[18px] mr-3" /> */}
        <textarea
          value={selectedElement.placeholder}
          onChange={(e) => handleSettingChange(e, "placeholder")}
          className="changeText input-text h-[6rem] pl-[0.5rem] pt-[0.5rem]"
          placeholder="Please write your text here..."
        />
      </div>

      <BorderRadiusComponent
        i={selectedElement.i}
        borderRadius={selectedElement.style.borderRadius}
        borderColor={selectedElement.style.borderColor}
      />
      <MarginComponent
        i={selectedElement.i}
        margin={selectedElement.style.margin}
      />
      <PaddingComponent
        i={selectedElement.i}
        padding={selectedElement.style.padding}
      />
      <ColorComponent
        i={selectedElement.i}
        color={selectedElement.style.color}
        name={selectedElement.name}
      />
      <BorderColorComponent
        i={selectedElement.i}
        borderColor={selectedElement.style.borderColor}
      />
      <BgColorComponent
        i={selectedElement.i}
        elementBackgroundColor={selectedElement.style.backgroundColor}
      />
      <ShadowComponent
        i={selectedElement.i}
        shadow={selectedElement.style.shadow}
      />
    </>
  );
};

export default InputSettings;
