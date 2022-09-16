import React, { FC } from "react";
import { useSelector } from "react-redux";
import { IoMdLink } from "react-icons/io";
import ColorComponent from "components/settings/color-component";
import BgColorComponent from "components/settings/bg-color-component";
import FontSizeComponent from "components/settings/font-size-component";
import MarginComponent from "components/settings/margin-component";
import PaddingComponent from "components/settings/padding-component";
import CombinedComponent from "components/settings/combined-setting";
import { IRootState } from "redux/root-state.interface";
import {
  ISettings,
  IWorkspaceElement,
} from "redux/workspace/workspace.interfaces";
import "styles/components.css";

const GeneralSettings: FC<ISettings> = ({ handleSettingChange }) => {
  const selectedItem: IWorkspaceElement = useSelector(
    (state: IRootState) => state.workspace.selectedElement
  );

  return (
    <>
      <h3 className="ml-[0.5rem]">
        {selectedItem ? (
          <span className="setting-text">{selectedItem.name}</span>
        ) : null}
      </h3>
      <CombinedComponent
        i={selectedItem.i}
        fontWeight={selectedItem.style.fontWeight}
        fontStyle={selectedItem.style.fontStyle}
        textDecoration={selectedItem.style.textDecoration}
        justifyContent={selectedItem.style.justifyContent}
      />
      <div className="flex items-center mx-2 mt-1 w-[13.5rem] text-black">
        {/* <RiText className="text-[18px] mr-3" /> */}
        <textarea
          value={selectedItem.value}
          onChange={(e) => handleSettingChange(e, "value")}
          className="changeText input-text h-[6rem] pl-[0.5rem] pt-[0.5rem]"
          placeholder="Please write your text here..."
        />
      </div>
      <div className="flex items-center mt-4 mx-2  w-[13.5rem] text-black">
        <div className="link-div px-1 py-1">
          <IoMdLink className="text-[18px]" />
        </div>
        <input
          value={selectedItem.link}
          onChange={(e) => handleSettingChange(e, "link")}
          className="changeText pl-[2.5rem] py-[0.4rem] input-text"
          type="text"
          placeholder="Link"
        />
      </div>

      <FontSizeComponent
        i={selectedItem.i}
        fontSize={selectedItem.style.fontSize}
      />
      <ColorComponent i={selectedItem.i} color={selectedItem.style.color} />
      <BgColorComponent
        i={selectedItem.i}
        elementBackgroundColor={selectedItem.style.backgroundColor}
      />
      <MarginComponent i={selectedItem.i} margin={selectedItem.style.margin} />
      <PaddingComponent
        i={selectedItem.i}
        padding={selectedItem.style.padding}
      />
    </>
  );
};

export default GeneralSettings;
