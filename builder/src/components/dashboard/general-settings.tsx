import React, { FC } from "react";
import { IoMdLink } from "react-icons/io";
import UtilitiesComponent from "components/settings/utilities-component";
import ColorComponent from "components/settings/color-component";
import BgColorComponent from "components/settings/bg-color-component";
import FontSizeComponent from "components/settings/font-size-component";
import MarginComponent from "components/settings/margin-component";
import PaddingComponent from "components/settings/padding-component";
import CombinedComponent from "components/settings/combined-setting";
import ISettings from "interfaces/settings";
import "styles/components.css";

const GeneralSettings: FC<ISettings> = ({ handleChange, selectedItem }) => (
  <>
    <h3 className="ml-[0.5rem]">
      {selectedItem ? (
        <span className="setting-text">{selectedItem.name}</span>
      ) : null}
    </h3>
    <CombinedComponent selectedItem={selectedItem} />
    <div className="flex items-center mx-2 mt-1 w-[13.5rem] text-black">
      {/* <RiText className="text-[18px] mr-3" /> */}
      <textarea
        value={selectedItem?.value}
        onChange={(e) => handleChange(e, "value")}
        className="changeText input-text h-[6rem] pl-[0.5rem] pt-[0.5rem]"
        placeholder="Please write your text here..."
      />
    </div>
    <div className="flex items-center mt-4 mx-2  w-[13.5rem] text-black">
      <div className="link-div px-1 py-1">
        <IoMdLink className="text-[18px]" />
      </div>
      <input
        value={selectedItem?.link}
        onChange={(e) => handleChange(e, "link")}
        className="changeText pl-[2.5rem] py-[0.4rem] input-text"
        type="text"
        placeholder="Link"
      />
    </div>

    <FontSizeComponent selectedItem={selectedItem} />
    <ColorComponent selectedItem={selectedItem} />
    <BgColorComponent selectedItem={selectedItem} />
    <MarginComponent selectedItem={selectedItem} />
    <PaddingComponent selectedItem={selectedItem} />
    <UtilitiesComponent selectedItem={selectedItem} />
  </>
);

export default GeneralSettings;
