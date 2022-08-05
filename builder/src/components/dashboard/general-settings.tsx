import React, { FC } from "react";
import { RiText } from "react-icons/ri";
import { AiOutlineLink } from "react-icons/ai";
import AlignComponent from "components/settings/align-component";
import FontStyleComponent from "components/settings/font-style-component";
import UtilitiesComponent from "components/settings/utilities-component";
import ColorComponent from "components/settings/color-component";
import BgColorComponent from "components/settings/bg-color-component";
import FontSizeComponent from "components/settings/font-size-component";
import ISettings from "interfaces/settings";
import MarginComponent from "components/settings/margin-component";
import PaddingComponent from "components/settings/padding-component";

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
    <h3 className="mb-3 ml-8">
      Component -
      {selectedItem ? (
        <span className="font-bold">{selectedItem.name}</span>
      ) : null}
    </h3>
    <div className="flex items-center px-3 mt-1 text-black">
      <RiText className="text-[18px] mr-3" />
      <input
        value={textVal}
        onChange={(e) => handleTextChange(e)}
        className="changeText"
        type="text"
        placeholder="Name..."
      />
    </div>
    <div className="flex items-center px-3 mt-2 text-black">
      <AiOutlineLink className="text-[18px] mr-3" />
      <input
        value={linkVal}
        onChange={(e) => handleLinkChange(e)}
        className="changeText"
        type="text"
        placeholder="URL..."
      />
    </div>
    <FontStyleComponent
      bold={bold}
      italic={italic}
      underline={underline}
      setBold={setBold}
      setItalic={setItalic}
      setUnderline={setUnderline}
    />
    <MarginComponent
      setMarginLeft={setMarginLeft}
      setMarginRight={setMarginRight}
      setMarginTop={setMarginTop}
      setMarginBottom={setMarginBottom}
      margin={{ ...margin }}
    />
    <PaddingComponent
      setPaddingLeft={setPaddingLeft}
      setPaddingRight={setPaddingRight}
      setPaddingTop={setPaddingTop}
      setPaddingBottom={setPaddingBottom}
      padding={{ ...padding }}
    />
    <AlignComponent
      justifyContent={justifyContent}
      setLeft={setLeft}
      setRight={setRight}
      setCenter={setCenter}
    />
    <FontSizeComponent fontSize={fontSize} setFontSize={setFontSize} />
    <ColorComponent
      color={color}
      setColor={setColor}
      selectedItem={selectedItem}
    />
    <BgColorComponent color={backgroundColor} setBgColor={setBgColor} />
    <UtilitiesComponent
      deleteComponent={deleteComponent}
      setDeleteComponent={setDeleteComponent}
    />
  </>
);

export default GeneralSettings;
