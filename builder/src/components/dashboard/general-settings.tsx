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

const GeneralSettings: FC<ISettings> = ({
  textVal,
  handleTextChange,
  linkVal,
  handleLinkChange,
  selectedItem,
  setBold,
  bold,
  setItalic,
  italic,
  setUnderline,
  underline,
  setColor,
  color,
  setBgColor,
  backgroundColor,
  setDeleteComponent,
  deleteComponent,
  justifyContent,
  setLeft,
  setCenter,
  setRight,
  fontSize,
  setFontSize,
  margin,
  setMarginLeft,
  setMarginRight,
  setMarginTop,
  setMarginBottom,
  padding,
  setPaddingLeft,
  setPaddingRight,
  setPaddingBottom,
  setPaddingTop,
}) => (
  <>
    <h3 className="ml-[0.5rem]">
      {selectedItem ? (
        <span className="setting-text">{selectedItem.name}</span>
      ) : null}
    </h3>
    <CombinedComponent
      bold={bold}
      italic={italic}
      underline={underline}
      setBold={setBold}
      setItalic={setItalic}
      setUnderline={setUnderline}
      justifyContent={justifyContent}
      setLeft={setLeft}
      setRight={setRight}
      setCenter={setCenter}
    />
    <div className="flex items-center mx-2 mt-1 w-[13.5rem] text-black">
      {/* <RiText className="text-[18px] mr-3" /> */}
      <textarea
        value={textVal}
        onChange={(e) => handleTextChange(e)}
        className="changeText input-text h-[6rem] pl-[0.5rem] pt-[0.5rem]"
        placeholder="Please write your text here..."
      />
    </div>
    <div className="flex items-center mt-4 mx-2  w-[13.5rem] text-black">
      <div className="link-div px-1 py-1">
        <IoMdLink className="text-[18px]" />
      </div>
      <input
        value={linkVal}
        onChange={(e) => handleLinkChange(e)}
        className="changeText pl-[2.5rem] py-[0.4rem] input-text"
        type="text"
        placeholder="Link"
      />
    </div>

    <FontSizeComponent fontSize={fontSize} setFontSize={setFontSize} />
    <ColorComponent
      color={color}
      setColor={setColor}
      selectedItem={selectedItem}
    />
    <BgColorComponent
      color={backgroundColor}
      setBgColor={setBgColor}
      selectedItem={selectedItem}
    />
    <MarginComponent
      setMarginLeft={setMarginLeft}
      setMarginRight={setMarginRight}
      setMarginTop={setMarginTop}
      setMarginBottom={setMarginBottom}
      margin={margin}
    />
    <PaddingComponent
      setPaddingLeft={setPaddingLeft}
      setPaddingRight={setPaddingRight}
      setPaddingTop={setPaddingTop}
      setPaddingBottom={setPaddingBottom}
      padding={padding}
    />
    <UtilitiesComponent
      deleteComponent={deleteComponent}
      setDeleteComponent={setDeleteComponent}
    />
  </>
);

export default GeneralSettings;
