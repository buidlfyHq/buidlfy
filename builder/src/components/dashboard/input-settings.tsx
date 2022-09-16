import React, { FC } from "react";
import { useSelector } from "react-redux";
import UtilitiesComponent from "components/settings/utilities-component";
import ColorComponent from "components/settings/color-component";
import BorderRadiusComponent from "components/settings/border-radius-component";
import ShadowComponent from "components/settings/shadow-component";
import MarginComponent from "components/settings/margin-component";
import ISettings from "interfaces/settings";
import IWorkspace from "interfaces/workspace";
import "styles/components.css";

const InputSettings: FC<ISettings> = ({ handlePlaceholderChange }) => {
  const selectedItem: IWorkspace = useSelector(
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
          value={selectedItem?.placeholder}
          onChange={(e) => handlePlaceholderChange(e)}
          className="changeText input-text h-[6rem] pl-[0.5rem] pt-[0.5rem]"
          placeholder="Please write your text here..."
        />
      </div>

      <BorderRadiusComponent selectedItem={selectedItem} />
      <MarginComponent selectedItem={selectedItem} />
      <ColorComponent selectedItem={selectedItem} />
      <ShadowComponent selectedItem={selectedItem} />
      <UtilitiesComponent selectedItem={selectedItem} />
    </>
  );
};

export default InputSettings;
