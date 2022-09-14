import React, { FC } from "react";
import { useSelector } from "react-redux";
import UtilitiesComponent from "components/settings/utilities-component";
import ColorComponent from "components/settings/color-component";
import BorderRadiusComponent from "components/settings/border-radius-component";
import ShadowComponent from "components/settings/shadow-component";
import MarginComponent from "components/settings/margin-component";
import { containerCheck } from "utils/container-check";
import {
  ISettings,
  IWorkspaceElements,
} from "redux/workspace/workspace.interfaces";
import "styles/components.css";

const InputSettings: FC<ISettings> = ({ handleChange }) => {
  const selectedItem: IWorkspaceElements = useSelector(
    (state: any) => state.workspace.selectedElement
  );

  return (
    <>
      <h3 className="ml-[1rem]">
        {selectedItem ? (
          <span className="setting-text">{selectedItem.name}</span>
        ) : null}
      </h3>

      <div className="flex items-center mx-2 mt-1 w-[13.5rem] text-black">
        {/* <RiText className="text-[18px] mr-3" /> */}
        <textarea
          value={selectedItem.placeholder}
          onChange={(e) => handleChange(e, "placeholder")}
          className="changeText input-text h-[6rem] pl-[0.5rem] pt-[0.5rem]"
          placeholder="Please write your text here..."
        />
      </div>

      <BorderRadiusComponent
        i={selectedItem.i}
        borderRadius={selectedItem.style.borderRadius}
      />
      <MarginComponent i={selectedItem.i} margin={selectedItem.style.margin} />
      <ColorComponent
        i={selectedItem.i}
        color={selectedItem.style.color}
        isContainer={containerCheck(selectedItem)}
      />
      <ShadowComponent i={selectedItem.i} shadow={selectedItem.style.shadow} />
      <UtilitiesComponent i={selectedItem.i} />
    </>
  );
};

export default InputSettings;
